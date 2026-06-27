-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

----------------------------------------------------------
-- 1. UPDATED_AT TRIGGER FUNCTION
----------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

----------------------------------------------------------
-- 2. TABLE DEFINITIONS
----------------------------------------------------------

-- CATEGORIES
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name JSONB NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT,
    icon TEXT,
    gradient TEXT,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PRODUCTS
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    title JSONB NOT NULL,
    "desc" JSONB,
    slug TEXT NOT NULL UNIQUE,
    category TEXT,
    icon TEXT,
    gradient TEXT,
    images TEXT[],
    specs JSONB,
    featured BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- INQUIRIES (public can submit, read is restricted to service)
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    service TEXT,
    message TEXT,
    status TEXT DEFAULT 'new',
    language TEXT,
    source TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- GALLERY
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    image_url TEXT NOT NULL,
    label JSONB,
    category TEXT,
    icon TEXT,
    gradient TEXT,
    display_order INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- FAQS
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question JSONB NOT NULL,
    answer JSONB NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TESTIMONIALS
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name JSONB NOT NULL,
    role JSONB,
    content JSONB NOT NULL,
    rating INTEGER DEFAULT 5,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SETTINGS (key-value store for homepage/contact/general settings)
CREATE TABLE IF NOT EXISTS public.settings (
    id TEXT PRIMARY KEY,
    data JSONB NOT NULL
);

----------------------------------------------------------
-- 3. INDEXES
----------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_gallery_display_order ON public.gallery(display_order);
CREATE INDEX IF NOT EXISTS idx_faqs_display_order ON public.faqs(display_order);

----------------------------------------------------------
-- 4. TRIGGERS
----------------------------------------------------------
DROP TRIGGER IF EXISTS set_updated_at_categories ON public.categories;
CREATE TRIGGER set_updated_at_categories BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_products ON public.products;
CREATE TRIGGER set_updated_at_products BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_gallery ON public.gallery;
CREATE TRIGGER set_updated_at_gallery BEFORE UPDATE ON public.gallery FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_faqs ON public.faqs;
CREATE TRIGGER set_updated_at_faqs BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_testimonials ON public.testimonials;
CREATE TRIGGER set_updated_at_testimonials BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();

----------------------------------------------------------
-- 5. ENABLE ROW LEVEL SECURITY
----------------------------------------------------------
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

----------------------------------------------------------
-- 6. CLEAN EXISTING POLICIES (Idempotency)
----------------------------------------------------------
DO $$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public' LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol.policyname, pol.tablename);
    END LOOP;
END $$;

----------------------------------------------------------
-- 7. ROW LEVEL SECURITY POLICIES
----------------------------------------------------------

-- PUBLIC READ ACCESS
CREATE POLICY "Public read categories"    ON public.categories   FOR SELECT USING (true);
CREATE POLICY "Public read products"      ON public.products     FOR SELECT USING (true);
CREATE POLICY "Public read gallery"       ON public.gallery      FOR SELECT USING (true);
CREATE POLICY "Public read faqs"          ON public.faqs         FOR SELECT USING (true);
CREATE POLICY "Public read testimonials"  ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public read settings"      ON public.settings     FOR SELECT USING (true);

-- PUBLIC SUBMISSION (INSERT ONLY)
CREATE POLICY "Public submit inquiries"   ON public.inquiries    FOR INSERT WITH CHECK (true);

----------------------------------------------------------
-- 8. STORAGE
----------------------------------------------------------
-- Ensure the public images bucket exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop and recreate storage policies
DO $$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON storage.%I', pol.policyname, pol.tablename);
    END LOOP;
END $$;

-- Public read access to product images
CREATE POLICY "Public Read Images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
