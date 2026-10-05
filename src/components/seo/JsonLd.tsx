import React from 'react';

export const BASE_URL = 'https://www.piyushagroindustries.in';

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Piyush Agro Industries',
    legalName: 'Piyush Agro Industries',
    url: BASE_URL,
    logo: `${BASE_URL}/branding/logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Khairagarh Road, Thelkadih',
      addressLocality: 'Rajnandgaon',
      addressRegion: 'Chhattisgarh',
      postalCode: '491441',
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-9425245291',
        contactType: 'sales',
        areaServed: ['IN-CT', 'IN'],
        availableLanguage: ['en', 'hi'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+91-9479244691',
        contactType: 'customer support',
        areaServed: ['IN-CT', 'IN'],
        availableLanguage: ['en', 'hi'],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#localbusiness`,
    name: 'Piyush Agro Industries',
    image: `${BASE_URL}/images/products/tractor-trolley.png`,
    telephone: '+91-9425245291',
    url: BASE_URL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Khairagarh Road, Thelkadih',
      addressLocality: 'Rajnandgaon',
      addressRegion: 'Chhattisgarh',
      postalCode: '491441',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 21.236625,
      longitude: 81.030618,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Chhattisgarh' },
      { '@type': 'Country', name: 'India' },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'Piyush Agro Industries',
    description: 'Manufacturer of Tractor Trolleys, Hydraulic Trolleys, Agricultural Equipment, and Custom Fabrication in Rajnandgaon, Chhattisgarh.',
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url.startsWith('/') ? item.url : `/${item.url}`}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductJsonLd({
  name,
  description,
  images = [],
  sku,
  category,
}: {
  name: string;
  description: string;
  images?: string[];
  sku?: string;
  category?: string;
}) {
  const formattedImages = images.map((img) => (img.startsWith('http') ? img : `${BASE_URL}${img}`));

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: formattedImages.length > 0 ? formattedImages : [`${BASE_URL}/images/products/tractor-trolley.png`],
    brand: {
      '@type': 'Brand',
      name: 'Piyush Agro Industries',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Piyush Agro Industries',
    },
  };

  if (sku) {
    schema.sku = sku;
  }

  if (category) {
    schema.category = category;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQPageJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
