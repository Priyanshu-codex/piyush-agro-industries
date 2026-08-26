import { MetadataRoute } from 'next';

const BASE_URL = 'https://piyushagro.com';

const PRODUCT_SLUGS = [
  'tractor-trolley',
  '4w-hydraulic',
  '2w-hydraulic',
  'hydraulic-dumper',
  'water-tanker',
  'medical-vehicle',
  'garbage-vehicle',
  'agri-equipment',
  'gates',
  'railings',
  'cultivators',
  'custom-fab',
  'vehicle-repair',
  'tt-hydraulic',
  'tt-tipping',
  'tt-5ton',
  'tt-2ton',
  'tt-nontipping',
  'ht-trolley',
  'ht-special',
  'ht-water',
  'gt-4wheel',
  'gt-set',
  'gt-2wheel',
  'gt-standard',
  'mh-ugpu',
  'mh-lowbed',
  'mh-lowbedtrolley',
  'mh-cart',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic product routes
  const productRoutes: MetadataRoute.Sitemap = PRODUCT_SLUGS.map((slug) => ({
    url: `${BASE_URL}/products/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
