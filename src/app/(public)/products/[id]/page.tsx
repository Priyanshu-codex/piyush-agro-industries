import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ALL_PRODUCTS, findProduct } from '@/utils/productLookup';
import { BreadcrumbJsonLd, ProductJsonLd } from '@/components/seo/JsonLd';
import ProductDetailClient from './ProductDetailClient';

const BASE_URL = 'https://www.piyushagroindustries.in';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({
    id: product.slug || product.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams?.id ? decodeURIComponent(resolvedParams.id).trim() : '';
  const product = findProduct(id);

  if (!product) {
    return {
      title: 'Product Not Found | Piyush Agro Industries',
      description: 'The requested agricultural product or equipment could not be found.',
      robots: { index: false, follow: true },
    };
  }

  const titleEn = product.title?.en || (typeof product.title === 'string' ? product.title : 'Agricultural Equipment');
  const descEn =
    product.seo_desc?.en ||
    product.short_desc?.en ||
    product.desc?.en ||
    `High-durability ${titleEn} manufactured by Piyush Agro Industries in Rajnandgaon, Chhattisgarh. Built with IS 2062 mild steel for agricultural and haulage applications.`;

  const canonicalSlug = product.slug || product.id;
  const canonicalUrl = `${BASE_URL}/products/${canonicalSlug}`;
  const ogImage = product.thumbnail || product.images?.[0] || `${BASE_URL}/images/products/tractor-trolley.png`;
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

  const pageTitle = product.seo_title?.en || `${titleEn} Manufacturer in Rajnandgaon, Chhattisgarh | Piyush Agro Industries`;

  return {
    title: {
      absolute: pageTitle,
    },
    description: descEn,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: descEn,
      url: canonicalUrl,
      siteName: 'Piyush Agro Industries',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${titleEn} - Piyush Agro Industries Rajnandgaon`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: descEn,
      images: [ogImageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const id = resolvedParams?.id ? decodeURIComponent(resolvedParams.id).trim() : '';
  const product = findProduct(id);

  if (!product) {
    notFound();
  }

  const titleEn = product.title?.en || (typeof product.title === 'string' ? product.title : 'Agricultural Equipment');
  const descEn =
    product.short_desc?.en ||
    product.desc?.en ||
    `${titleEn} manufactured by Piyush Agro Industries in Rajnandgaon, Chhattisgarh.`;
  const canonicalSlug = product.slug || product.id;
  const images = product.images && product.images.length > 0
    ? product.images
    : [product.thumbnail || '/images/products/tractor-trolley.png'];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Products', url: '/products' },
          { name: titleEn, url: `/products/${canonicalSlug}` },
        ]}
      />
      <ProductJsonLd
        name={titleEn}
        description={descEn}
        images={images}
        sku={product.id}
        category={product.category || 'Agricultural Equipment'}
      />
      <ProductDetailClient initialProduct={product} slug={canonicalSlug} />
    </>
  );
}
