import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES_LIST, findService } from '@/constants/servicesData';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import ServiceDetailClient from './ServiceDetailClient';

const BASE_URL = 'https://www.piyushagroindustries.in';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES_LIST.map((svc) => ({
    slug: svc.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug ? decodeURIComponent(resolvedParams.slug).trim() : '';
  const service = findService(slug);

  if (!service) {
    return {
      title: 'Service Not Found | Piyush Agro Industries',
      description: 'The requested fabrication or repair service could not be found.',
      robots: { index: false, follow: true },
    };
  }

  const titleEn = service.title?.en || 'Fabrication Service';
  const descEn =
    service.shortDesc?.en ||
    `${titleEn} provided by Piyush Agro Industries in Rajnandgaon, Chhattisgarh. Heavy-duty engineering and certified metalwork.`;

  const canonicalUrl = `${BASE_URL}/services/${service.slug}`;
  const pageTitle = `${titleEn} in Rajnandgaon, Chhattisgarh | Piyush Agro Industries`;

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
          url: `${BASE_URL}/images/products/tractor-trolley.png`,
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
      images: [`${BASE_URL}/images/products/tractor-trolley.png`],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug ? decodeURIComponent(resolvedParams.slug).trim() : '';
  const service = findService(slug);

  if (!service) {
    notFound();
  }

  const titleEn = service.title?.en || 'Service';

  // Inject Local Service Schema LD
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: titleEn,
    provider: {
      '@type': 'LocalBusiness',
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
    areaServed: 'Chhattisgarh',
    description: service.shortDesc?.en,
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: titleEn, url: `/services/${service.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServiceDetailClient initialService={service} slug={service.slug} />
    </>
  );
}
