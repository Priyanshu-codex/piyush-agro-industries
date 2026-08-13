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
    short_desc JSONB,
    full_desc JSONB,
    slug TEXT NOT NULL UNIQUE,
    category TEXT,
    icon TEXT,
    gradient TEXT,
    images TEXT[],
    thumbnail TEXT,
    brochure_url TEXT,
    specs JSONB,
    features JSONB,
    applications JSONB,
    seo_title JSONB,
    seo_desc JSONB,
    seo_keywords JSONB,
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

-- PUBLIC ALL ACCESS (To allow Admin Panel to work without auth restrictions for now)
CREATE POLICY "Public all categories"    ON public.categories   FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all products"      ON public.products     FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all gallery"       ON public.gallery      FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all faqs"          ON public.faqs         FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all testimonials"  ON public.testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all settings"      ON public.settings     FOR ALL USING (true) WITH CHECK (true);

-- PUBLIC SUBMISSION (INSERT ONLY)
CREATE POLICY "Public submit inquiries"   ON public.inquiries    FOR INSERT WITH CHECK (true);

----------------------------------------------------------
-- 8. STORAGE
----------------------------------------------------------
-- Ensure the public images bucket exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Ensure the public brochures bucket exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('brochures', 'brochures', true)
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

-- Public all access to product images and brochures (For admin uploads without auth)
CREATE POLICY "Public All Images" ON storage.objects FOR ALL USING (bucket_id = 'product-images') WITH CHECK (bucket_id = 'product-images');
CREATE POLICY "Public All Brochures" ON storage.objects FOR ALL USING (bucket_id = 'brochures') WITH CHECK (bucket_id = 'brochures');

----------------------------------------------------------
-- 9. SEED DATA
----------------------------------------------------------

-- Insert Categories
INSERT INTO public.categories (name, slug, icon, gradient, display_order, status)
VALUES 
  ('{"en": "Tractor Trailers", "hi": "ट्रैक्टर ट्रेलर"}', 'tractor', '🚜', 'from-[#065F2E] to-[#0B7A3B]', 1, 'active'),
  ('{"en": "Hydraulic Tractor Trolley", "hi": "हाइड्रोलिक ट्रैक्टर ट्रॉली"}', 'hydraulic', '🔧', 'from-[#1a2f6f] to-[#243B8F]', 2, 'active'),
  ('{"en": "Water Tanker", "hi": "पानी का टैंकर"}', 'water', '💧', 'from-[#0c4a6e] to-[#0ea5e9]', 3, 'active'),
  ('{"en": "Custom Fabrication", "hi": "कस्टम फेब्रिकेशन"}', 'fabrication', '🔨', 'from-[#4c1d95] to-[#6d28d9]', 4, 'active'),
  ('{"en": "Agricultural Equipment", "hi": "कृषि उपकरण"}', 'agri', '🌾', 'from-[#365314] to-[#4d7c0f]', 5, 'active'),
  ('{"en": "Generator Trolley", "hi": "जेनरेटर ट्रॉली"}', 'generator', '⚡', 'from-[#ea580c] to-[#c2410c]', 6, 'active'),
  ('{"en": "Material Handling Equipment", "hi": "सामग्री प्रबंधन उपकरण"}', 'material-handling', '🏗️', 'from-[#475569] to-[#334155]', 7, 'active')
ON CONFLICT (slug) DO NOTHING;

-- Insert Products
INSERT INTO public.products (title, slug, category, category_id, short_desc, full_desc, icon, gradient, specs, features, applications, status)
VALUES
  (
    '{"en": "Hydraulic Tractor Trailer", "hi": "हाइड्रोलिक ट्रैक्टर ट्रेलर"}', 
    'hydraulic-tractor-trailer', 
    'Tractor Trailers', 
    (SELECT id FROM public.categories WHERE slug = 'tractor' LIMIT 1), 
    '{"en": "High quality Hydraulic Tractor Trailer for robust usage.", "hi": "मजबूत उपयोग के लिए उच्च गुणवत्ता वाला हाइड्रोलिक ट्रैक्टर ट्रेलर।"}', 
    '{"en": "This is the detailed description. Built with IS 2062 Grade Mild Steel and high durability.", "hi": "यह विस्तृत विवरण है। IS 2062 ग्रेड माइल्ड स्टील के साथ निर्मित।"}', 
    '🚜', 'from-[#065F2E] to-[#0B7A3B]', 
    '{"Material": "IS 2062 Grade Mild Steel", "Durability": "High", "Capacity": "Variable"}', 
    '[{"en": "Anti-corrosive Red Primer", "hi": "एंटी-संक्षारक रेड प्राइमर"}, {"en": "Heavy duty structure", "hi": "हैवी ड्यूटी स्ट्रक्चर"}]', 
    '[{"en": "Agricultural Transportation", "hi": "कृषि परिवहन"}, {"en": "Commercial Hauling", "hi": "वाणिज्यिक ढुलाई"}]', 
    'active'
  ),
  (
    '{"en": "Tractor Tipping Trailer", "hi": "ट्रैक्टर टिपिंग ट्रेलर"}', 
    'tractor-tipping-trailer', 
    'Tractor Trailers', 
    (SELECT id FROM public.categories WHERE slug = 'tractor' LIMIT 1), 
    '{"en": "High quality Tractor Tipping Trailer for robust usage.", "hi": "मजबूत उपयोग के लिए उच्च गुणवत्ता वाला ट्रैक्टर टिपिंग ट्रेलर।"}', 
    '{"en": "This is the detailed description. Built with IS 2062 Grade Mild Steel and high durability.", "hi": "यह विस्तृत विवरण है। IS 2062 ग्रेड माइल्ड स्टील के साथ निर्मित।"}', 
    '🚜', 'from-[#065F2E] to-[#0B7A3B]', 
    '{"Material": "IS 2062 Grade Mild Steel", "Durability": "High", "Capacity": "Variable"}', 
    '[{"en": "Anti-corrosive Red Primer", "hi": "एंटी-संक्षारक रेड प्राइमर"}, {"en": "Heavy duty structure", "hi": "हैवी ड्यूटी स्ट्रक्चर"}]', 
    '[{"en": "Agricultural Transportation", "hi": "कृषि परिवहन"}, {"en": "Commercial Hauling", "hi": "वाणिज्यिक ढुलाई"}]', 
    'active'
  ),
  (
    '{"en": "5 Ton Agricultural Tractor Trailer", "hi": "5 टन कृषि ट्रैक्टर ट्रेलर"}', 
    '5-ton-agricultural-tractor-trailer', 
    'Tractor Trailers', 
    (SELECT id FROM public.categories WHERE slug = 'tractor' LIMIT 1), 
    '{"en": "High quality 5 Ton Agricultural Tractor Trailer for robust usage.", "hi": "मजबूत उपयोग के लिए उच्च गुणवत्ता वाला 5 टन कृषि ट्रैक्टर ट्रेलर।"}', 
    '{"en": "This is the detailed description. Built with IS 2062 Grade Mild Steel and high durability.", "hi": "यह विस्तृत विवरण है। IS 2062 ग्रेड माइल्ड स्टील के साथ निर्मित।"}', 
    '🚜', 'from-[#065F2E] to-[#0B7A3B]', 
    '{"Material": "IS 2062 Grade Mild Steel", "Durability": "High", "Capacity": "5 Ton"}', 
    '[{"en": "Anti-corrosive Red Primer", "hi": "एंटी-संक्षारक रेड प्राइमर"}, {"en": "Heavy duty structure", "hi": "हैवी ड्यूटी स्ट्रक्चर"}]', 
    '[{"en": "Agricultural Transportation", "hi": "कृषि परिवहन"}, {"en": "Commercial Hauling", "hi": "वाणिज्यिक ढुलाई"}]', 
    'active'
  ),
  (
    '{"en": "2 Ton Agriculture Tractor Trailer", "hi": "2 टन कृषि ट्रैक्टर ट्रेलर"}', 
    '2-ton-agriculture-tractor-trailer', 
    'Tractor Trailers', 
    (SELECT id FROM public.categories WHERE slug = 'tractor' LIMIT 1), 
    '{"en": "High quality 2 Ton Agriculture Tractor Trailer for robust usage.", "hi": "मजबूत उपयोग के लिए उच्च गुणवत्ता वाला 2 टन कृषि ट्रैक्टर ट्रेलर।"}', 
    '{"en": "This is the detailed description. Built with IS 2062 Grade Mild Steel and high durability.", "hi": "यह विस्तृत विवरण है। IS 2062 ग्रेड माइल्ड स्टील के साथ निर्मित।"}', 
    '🚜', 'from-[#065F2E] to-[#0B7A3B]', 
    '{"Material": "IS 2062 Grade Mild Steel", "Durability": "High", "Capacity": "2 Ton"}', 
    '[{"en": "Anti-corrosive Red Primer", "hi": "एंटी-संक्षारक रेड प्राइमर"}, {"en": "Heavy duty structure", "hi": "हैवी ड्यूटी स्ट्रक्चर"}]', 
    '[{"en": "Agricultural Transportation", "hi": "कृषि परिवहन"}, {"en": "Commercial Hauling", "hi": "वाणिज्यिक ढुलाई"}]', 
    'active'
  ),
  (
    '{"en": "Non Tipping Tractor Trailer", "hi": "नॉन टिपिंग ट्रैक्टर ट्रेलर"}', 
    'non-tipping-tractor-trailer', 
    'Tractor Trailers', 
    (SELECT id FROM public.categories WHERE slug = 'tractor' LIMIT 1), 
    '{"en": "High quality Non Tipping Tractor Trailer for robust usage.", "hi": "मजबूत उपयोग के लिए उच्च गुणवत्ता वाला नॉन टिपिंग ट्रैक्टर ट्रेलर।"}', 
    '{"en": "This is the detailed description. Built with IS 2062 Grade Mild Steel and high durability.", "hi": "यह विस्तृत विवरण है। IS 2062 ग्रेड माइल्ड स्टील के साथ निर्मित।"}', 
    '🚜', 'from-[#065F2E] to-[#0B7A3B]', 
    '{"Material": "IS 2062 Grade Mild Steel", "Durability": "High", "Capacity": "Variable"}', 
    '[{"en": "Anti-corrosive Red Primer", "hi": "एंटी-संक्षारक रेड प्राइमर"}, {"en": "Heavy duty structure", "hi": "हैवी ड्यूटी स्ट्रक्चर"}]', 
    '[{"en": "Agricultural Transportation", "hi": "कृषि परिवहन"}, {"en": "Commercial Hauling", "hi": "वाणिज्यिक ढुलाई"}]', 
    'active'
  ),
  (
    '{"en": "Hydraulic Tractor Trolley", "hi": "हाइड्रोलिक ट्रैक्टर ट्रॉली"}', 
    'hydraulic-tractor-trolley', 
    'Hydraulic Tractor Trolley', 
    (SELECT id FROM public.categories WHERE slug = 'hydraulic' LIMIT 1), 
    '{"en": "High quality Hydraulic Tractor Trolley for robust usage.", "hi": "मजबूत उपयोग के लिए उच्च गुणवत्ता वाला हाइड्रोलिक ट्रैक्टर ट्रॉली।"}', 
    '{"en": "This is the detailed description. Built with IS 2062 Grade Mild Steel and high durability.", "hi": "यह विस्तृत विवरण है। IS 2062 ग्रेड माइल्ड स्टील के साथ निर्मित।"}', 
    '🔧', 'from-[#1a2f6f] to-[#243B8F]', 
    '{"Material": "IS 2062 Grade Mild Steel", "Durability": "High", "Capacity": "Variable"}', 
    '[{"en": "Anti-corrosive Red Primer", "hi": "एंटी-संक्षारक रेड प्राइमर"}, {"en": "Heavy duty structure", "hi": "हैवी ड्यूटी स्ट्रक्चर"}]', 
    '[{"en": "Agricultural Transportation", "hi": "कृषि परिवहन"}, {"en": "Commercial Hauling", "hi": "वाणिज्यिक ढुलाई"}]', 
    'active'
  ),
  (
    '{"en": "Special Tractor Trolley", "hi": "स्पेशल ट्रैक्टर ट्रॉली"}', 
    'special-tractor-trolley', 
    'Hydraulic Tractor Trolley', 
    (SELECT id FROM public.categories WHERE slug = 'hydraulic' LIMIT 1), 
    '{"en": "High quality Special Tractor Trolley for robust usage.", "hi": "मजबूत उपयोग के लिए उच्च गुणवत्ता वाला स्पेशल ट्रैक्टर ट्रॉली।"}', 
    '{"en": "This is the detailed description. Built with IS 2062 Grade Mild Steel and high durability.", "hi": "यह विस्तृत विवरण है। IS 2062 ग्रेड माइल्ड स्टील के साथ निर्मित।"}', 
    '🔧', 'from-[#1a2f6f] to-[#243B8F]', 
    '{"Material": "IS 2062 Grade Mild Steel", "Durability": "High", "Capacity": "Variable"}', 
    '[{"en": "Anti-corrosive Red Primer", "hi": "एंटी-संक्षारक रेड प्राइमर"}, {"en": "Heavy duty structure", "hi": "हैवी ड्यूटी स्ट्रक्चर"}]', 
    '[{"en": "Agricultural Transportation", "hi": "कृषि परिवहन"}, {"en": "Commercial Hauling", "hi": "वाणिज्यिक ढुलाई"}]', 
    'active'
  ),
  (
    '{"en": "Mini Water Tank Trolley", "hi": "मिनी वाटर टैंक ट्रॉली"}', 
    'mini-water-tank-trolley', 
    'Water Tanker', 
    (SELECT id FROM public.categories WHERE slug = 'water' LIMIT 1), 
    '{"en": "High quality Mini Water Tank Trolley for robust usage.", "hi": "मजबूत उपयोग के लिए उच्च गुणवत्ता वाला मिनी वाटर टैंक ट्रॉली।"}', 
    '{"en": "This is the detailed description. Built with IS 2062 Grade Mild Steel and high durability.", "hi": "यह विस्तृत विवरण है। IS 2062 ग्रेड माइल्ड स्टील के साथ निर्मित।"}', 
    '💧', 'from-[#0c4a6e] to-[#0ea5e9]', 
    '{"Material": "IS 2062 Grade Mild Steel", "Durability": "High", "Capacity": "Variable"}', 
    '[{"en": "Anti-corrosive Red Primer", "hi": "एंटी-संक्षारक रेड प्राइमर"}, {"en": "Heavy duty structure", "hi": "हैवी ड्यूटी स्ट्रक्चर"}]', 
    '[{"en": "Agricultural Transportation", "hi": "कृषि परिवहन"}, {"en": "Commercial Hauling", "hi": "वाणिज्यिक ढुलाई"}]', 
    'active'
  ),
  (
    '{"en": "4 Wheel Generator Trolley", "hi": "4 व्हील जेनरेटर ट्रॉली"}', 
    '4-wheel-generator-trolley', 
    'Generator Trolley', 
    (SELECT id FROM public.categories WHERE slug = 'generator' LIMIT 1), 
    '{"en": "High quality 4 Wheel Generator Trolley for robust usage.", "hi": "मजबूत उपयोग के लिए उच्च गुणवत्ता वाला 4 व्हील जेनरेटर ट्रॉली।"}', 
    '{"en": "This is the detailed description. Built with IS 2062 Grade Mild Steel and high durability.", "hi": "यह विस्तृत विवरण है। IS 2062 ग्रेड माइल्ड स्टील के साथ निर्मित।"}', 
    '⚡', 'from-[#ea580c] to-[#c2410c]', 
    '{"Material": "IS 2062 Grade Mild Steel", "Durability": "High", "Capacity": "Variable"}', 
    '[{"en": "Anti-corrosive Red Primer", "hi": "एंटी-संक्षारक रेड प्राइमर"}, {"en": "Heavy duty structure", "hi": "हैवी ड्यूटी स्ट्रक्चर"}]', 
    '[{"en": "Agricultural Transportation", "hi": "कृषि परिवहन"}, {"en": "Commercial Hauling", "hi": "वाणिज्यिक ढुलाई"}]', 
    'active'
  ),
  (
    '{"en": "Generator Set Trolley", "hi": "जेनरेटर सेट ट्रॉली"}', 
    'generator-set-trolley', 
    'Generator Trolley', 
    (SELECT id FROM public.categories WHERE slug = 'generator' LIMIT 1), 
    '{"en": "High quality Generator Set Trolley for robust usage.", "hi": "मजबूत उपयोग के लिए उच्च गुणवत्ता वाला जेनरेटर सेट ट्रॉली।"}', 
    '{"en": "This is the detailed description. Built with IS 2062 Grade Mild Steel and high durability.", "hi": "यह विस्तृत विवरण है। IS 2062 ग्रेड माइल्ड स्टील के साथ निर्मित।"}', 
    '⚡', 'from-[#ea580c] to-[#c2410c]', 
    '{"Material": "IS 2062 Grade Mild Steel", "Durability": "High", "Capacity": "Variable"}', 
    '[{"en": "Anti-corrosive Red Primer", "hi": "एंटी-संक्षारक रेड प्राइमर"}, {"en": "Heavy duty structure", "hi": "हैवी ड्यूटी स्ट्रक्चर"}]', 
    '[{"en": "Agricultural Transportation", "hi": "कृषि परिवहन"}, {"en": "Commercial Hauling", "hi": "वाणिज्यिक ढुलाई"}]', 
    'active'
  ),
  (
    '{"en": "2 Wheeler Trolley", "hi": "2 व्हीलर ट्रॉली"}', 
    '2-wheeler-trolley', 
    'Generator Trolley', 
    (SELECT id FROM public.categories WHERE slug = 'generator' LIMIT 1), 
    '{"en": "High quality 2 Wheeler Trolley for robust usage.", "hi": "मजबूत उपयोग के लिए उच्च गुणवत्ता वाला 2 व्हीलर ट्रॉली।"}', 
    '{"en": "This is the detailed description. Built with IS 2062 Grade Mild Steel and high durability.", "hi": "यह विस्तृत विवरण है। IS 2062 ग्रेड माइल्ड स्टील के साथ निर्मित।"}', 
    '⚡', 'from-[#ea580c] to-[#c2410c]', 
    '{"Material": "IS 2062 Grade Mild Steel", "Durability": "High", "Capacity": "Variable"}', 
    '[{"en": "Anti-corrosive Red Primer", "hi": "एंटी-संक्षारक रेड प्राइमर"}, {"en": "Heavy duty structure", "hi": "हैवी ड्यूटी स्ट्रक्चर"}]', 
    '[{"en": "Agricultural Transportation", "hi": "कृषि परिवहन"}, {"en": "Commercial Hauling", "hi": "वाणिज्यिक ढुलाई"}]', 
    'active'
  ),
  (
    '{"en": "Generator Trolley", "hi": "जेनरेटर ट्रॉली"}', 
    'generator-trolley', 
    'Generator Trolley', 
    (SELECT id FROM public.categories WHERE slug = 'generator' LIMIT 1), 
    '{"en": "High quality Generator Trolley for robust usage.", "hi": "मजबूत उपयोग के लिए उच्च गुणवत्ता वाला जेनरेटर ट्रॉली।"}', 
    '{"en": "This is the detailed description. Built with IS 2062 Grade Mild Steel and high durability.", "hi": "यह विस्तृत विवरण है। IS 2062 ग्रेड माइल्ड स्टील के साथ निर्मित।"}', 
    '⚡', 'from-[#ea580c] to-[#c2410c]', 
    '{"Material": "IS 2062 Grade Mild Steel", "Durability": "High", "Capacity": "Variable"}', 
    '[{"en": "Anti-corrosive Red Primer", "hi": "एंटी-संक्षारक रेड प्राइमर"}, {"en": "Heavy duty structure", "hi": "हैवी ड्यूटी स्ट्रक्चर"}]', 
    '[{"en": "Agricultural Transportation", "hi": "कृषि परिवहन"}, {"en": "Commercial Hauling", "hi": "वाणिज्यिक ढुलाई"}]', 
    'active'
  ),
  (
    '{"en": "I-JGPU Trolley 4 Wheel", "hi": "I-JGPU ट्रॉली 4 व्हील"}', 
    'i-jgpu-trolley-4-wheel', 
    'Material Handling Equipment', 
    (SELECT id FROM public.categories WHERE slug = 'material-handling' LIMIT 1), 
    '{"en": "High quality I-JGPU Trolley 4 Wheel for robust usage.", "hi": "मजबूत उपयोग के लिए उच्च गुणवत्ता वाला I-JGPU ट्रॉली 4 व्हील।"}', 
    '{"en": "This is the detailed description. Built with IS 2062 Grade Mild Steel and high durability.", "hi": "यह विस्तृत विवरण है। IS 2062 ग्रेड माइल्ड स्टील के साथ निर्मित।"}', 
    '🏗️', 'from-[#475569] to-[#334155]', 
    '{"Material": "IS 2062 Grade Mild Steel", "Durability": "High", "Capacity": "Variable"}', 
    '[{"en": "Anti-corrosive Red Primer", "hi": "एंटी-संक्षारक रेड प्राइमर"}, {"en": "Heavy duty structure", "hi": "हैवी ड्यूटी स्ट्रक्चर"}]', 
    '[{"en": "Agricultural Transportation", "hi": "कृषि परिवहन"}, {"en": "Commercial Hauling", "hi": "वाणिज्यिक ढुलाई"}]', 
    'active'
  ),
  (
    '{"en": "Customize Low Bed Trailer", "hi": "कस्टमाइज़ लो बेड ट्रेलर"}', 
    'customize-low-bed-trailer', 
    'Material Handling Equipment', 
    (SELECT id FROM public.categories WHERE slug = 'material-handling' LIMIT 1), 
    '{"en": "High quality Customize Low Bed Trailer for robust usage.", "hi": "मजबूत उपयोग के लिए उच्च गुणवत्ता वाला कस्टमाइज़ लो बेड ट्रेलर।"}', 
    '{"en": "This is the detailed description. Built with IS 2062 Grade Mild Steel and high durability.", "hi": "यह विस्तृत विवरण है। IS 2062 ग्रेड माइल्ड स्टील के साथ निर्मित।"}', 
    '🏗️', 'from-[#475569] to-[#334155]', 
    '{"Material": "IS 2062 Grade Mild Steel", "Durability": "High", "Capacity": "Variable"}', 
    '[{"en": "Anti-corrosive Red Primer", "hi": "एंटी-संक्षारक रेड प्राइमर"}, {"en": "Heavy duty structure", "hi": "हैवी ड्यूटी स्ट्रक्चर"}]', 
    '[{"en": "Agricultural Transportation", "hi": "कृषि परिवहन"}, {"en": "Commercial Hauling", "hi": "वाणिज्यिक ढुलाई"}]', 
    'active'
  ),
  (
    '{"en": "Customize Low Bed Trolley", "hi": "कस्टमाइज़ लो बेड ट्रॉली"}', 
    'customize-low-bed-trolley', 
    'Material Handling Equipment', 
    (SELECT id FROM public.categories WHERE slug = 'material-handling' LIMIT 1), 
    '{"en": "High quality Customize Low Bed Trolley for robust usage.", "hi": "मजबूत उपयोग के लिए उच्च गुणवत्ता वाला कस्टमाइज़ लो बेड ट्रॉली।"}', 
    '{"en": "This is the detailed description. Built with IS 2062 Grade Mild Steel and high durability.", "hi": "यह विस्तृत विवरण है। IS 2062 ग्रेड माइल्ड स्टील के साथ निर्मित।"}', 
    '🏗️', 'from-[#475569] to-[#334155]', 
    '{"Material": "IS 2062 Grade Mild Steel", "Durability": "High", "Capacity": "Variable"}', 
    '[{"en": "Anti-corrosive Red Primer", "hi": "एंटी-संक्षारक रेड प्राइमर"}, {"en": "Heavy duty structure", "hi": "हैवी ड्यूटी स्ट्रक्चर"}]', 
    '[{"en": "Agricultural Transportation", "hi": "कृषि परिवहन"}, {"en": "Commercial Hauling", "hi": "वाणिज्यिक ढुलाई"}]', 
    'active'
  ),
  (
    '{"en": "Wheeled Cart", "hi": "पहिएदार गाड़ी"}', 
    'wheeled-cart', 
    'Material Handling Equipment', 
    (SELECT id FROM public.categories WHERE slug = 'material-handling' LIMIT 1), 
    '{"en": "High quality Wheeled Cart for robust usage.", "hi": "मजबूत उपयोग के लिए उच्च गुणवत्ता वाला पहिएदार गाड़ी।"}', 
    '{"en": "This is the detailed description. Built with IS 2062 Grade Mild Steel and high durability.", "hi": "यह विस्तृत विवरण है। IS 2062 ग्रेड माइल्ड स्टील के साथ निर्मित।"}', 
    '🏗️', 'from-[#475569] to-[#334155]', 
    '{"Material": "IS 2062 Grade Mild Steel", "Durability": "High", "Capacity": "Variable"}', 
    '[{"en": "Anti-corrosive Red Primer", "hi": "एंटी-संक्षारक रेड प्राइमर"}, {"en": "Heavy duty structure", "hi": "हैवी ड्यूटी स्ट्रक्चर"}]', 
    '[{"en": "Agricultural Transportation", "hi": "कृषि परिवहन"}, {"en": "Commercial Hauling", "hi": "वाणिज्यिक ढुलाई"}]', 
    'active'
  )
ON CONFLICT (slug) DO UPDATE 
SET 
  category_id = EXCLUDED.category_id,
  features = EXCLUDED.features,
  applications = EXCLUDED.applications;
