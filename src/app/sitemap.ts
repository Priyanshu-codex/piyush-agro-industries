import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.piyushagroindustries.in';

export const CANONICAL_PRODUCT_SLUGS = [
  'tractor-trolley',
  'hydraulic-tractor-trolley',
  'tractor-tipping-trailer',
  '2-ton-tractor-trailer',
  'non-tipping-tractor-trailer',
  'water-tanker-trailer',
  'generator-trolley',
  'custom-fabrication',
  'agricultural-equipment',
  '4-wheel-hydraulic-trolley',
  '2-wheel-hydraulic-trolley',
  'hydraulic-dumper',
  '5-ton-agricultural-tractor-trailer',
  'hydraulic-tractor-trailer',
  'special-tractor-trolley',
  'mini-water-tank-trolley',
  '4-wheel-generator-trolley',
  'generator-set-trolley',
  '2-wheeler-trolley',
  'ugpu-trolley-4-wheel',
  'customize-low-bed-trailer',
  'customize-low-bed-trolley',
  'wheeled-cart',
  'medical-vehicle',
  'garbage-collection-vehicle',
  'cultivators',
  'steel-gates',
  'railings',
  'vehicle-repairing',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Static indexable routes
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
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic canonical product routes
  const productRoutes: MetadataRoute.Sitemap = CANONICAL_PRODUCT_SLUGS.map((slug) => ({
    url: `${BASE_URL}/products/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...productRoutes];
}
