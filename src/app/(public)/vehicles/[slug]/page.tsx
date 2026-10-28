import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SML_VEHICLES, findVehicle, getRelatedVehicles } from '@/constants/smlVehiclesData';
import VehicleDetailClient from './VehicleDetailClient';

const BASE_URL = 'https://www.piyushagroindustries.in';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SML_VEHICLES.map((vehicle) => ({
    slug: vehicle.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug ? decodeURIComponent(resolvedParams.slug).trim() : '';
  const vehicle = findVehicle(slug);

  if (!vehicle) {
    return {
      title: 'Commercial Vehicle Not Found | Piyush Agro Industries',
      description: 'The requested commercial vehicle model could not be found.',
      robots: { index: false, follow: true },
    };
  }

  const pageTitle = `${vehicle.nameEn} | SML Mahindra Commercial Vehicles | Piyush Agro Industries`;
  const metaDesc = `${vehicle.nameEn} (${vehicle.fuelType}) - ${vehicle.taglineEn}. Verified specifications: GVW/Capacity ${vehicle.specs.gvwOrCapacity.valueEn}, SLT4 Turbocharged Engine, Dual-Circuit Air Brakes. Authorized servicing & technical support in Rajnandgaon, Chhattisgarh.`;
  const canonicalUrl = `${BASE_URL}/vehicles/${vehicle.id}`;
  const ogImageUrl = `${BASE_URL}${vehicle.primaryImage}`;

  return {
    title: {
      absolute: pageTitle,
    },
    description: metaDesc,
    keywords: [
      vehicle.nameEn,
      vehicle.nameHi,
      'SML Mahindra Commercial Vehicle',
      vehicle.categoryLabelEn,
      'Commercial Vehicle Servicing Rajnandgaon',
      'Piyush Agro Industries',
      'SML Truck Chhattisgarh',
      'SML Bus Chhattisgarh'
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: metaDesc,
      url: canonicalUrl,
      siteName: 'Piyush Agro Industries',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${vehicle.nameEn} Commercial Vehicle`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: metaDesc,
      images: [ogImageUrl],
    },
  };
}

export default async function VehiclePage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug ? decodeURIComponent(resolvedParams.slug).trim() : '';
  const vehicle = findVehicle(slug);

  if (!vehicle) {
    notFound();
  }

  const relatedVehicles = getRelatedVehicles(vehicle.id, 3);

  // JSON-LD structured data for commercial vehicle / product
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: vehicle.nameEn,
    alternateName: vehicle.nameHi,
    description: vehicle.descriptionEn,
    image: `${BASE_URL}${vehicle.primaryImage}`,
    brand: {
      '@type': 'Brand',
      name: 'SML Mahindra',
    },
    category: vehicle.categoryLabelEn,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'AutoDealer',
        name: 'Piyush Agro Industries',
        telephone: '+919425245291',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Khairagarh Road, Thelkadih',
          addressLocality: 'Rajnandgaon',
          addressRegion: 'Chhattisgarh',
          postalCode: '491441',
          addressCountry: 'IN',
        },
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VehicleDetailClient vehicle={vehicle} relatedVehicles={relatedVehicles} />
    </>
  );
}
