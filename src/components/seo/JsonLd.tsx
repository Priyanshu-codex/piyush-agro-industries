import React from 'react';

const BASE_URL = 'https://piyushagro.com';

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Piyush Agro Industries',
    legalName: 'Piyush Agro Industries',
    url: BASE_URL,
    logo: `${BASE_URL}/branding/logo.png`,
    foundingDate: '2012',
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
        areaServed: ['IN', 'IN-CT', 'IN-MP'],
        availableLanguage: ['en', 'hi'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+91-9827113291',
        contactType: 'customer service',
        areaServed: ['IN', 'IN-CT', 'IN-MP'],
        availableLanguage: ['en', 'hi'],
      },
    ],
    sameAs: [],
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
    image: `${BASE_URL}/branding/logo.png`,
    telephone: '+91-9425245291',
    email: 'info@piyushagro.com',
    url: BASE_URL,
    priceRange: '₹₹₹',
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
      latitude: 21.1025,
      longitude: 81.0347,
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
      { '@type': 'AdministrativeArea', name: 'Madhya Pradesh' },
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
    description: 'Manufacturer of Hydraulic Trolleys, Tractor Trolleys, and Agricultural Implements in Rajnandgaon, Chhattisgarh, India.',
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
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
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
  sku: string;
  category?: string;
}) {
  const formattedImages = images.map((img) => (img.startsWith('http') ? img : `${BASE_URL}${img}`));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: formattedImages.length > 0 ? formattedImages : [`${BASE_URL}/images/products/tractor-trolley.jpg`],
    sku,
    category,
    brand: {
      '@type': 'Brand',
      name: 'Piyush Agro Industries',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Piyush Agro Industries',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Piyush Agro Industries',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
