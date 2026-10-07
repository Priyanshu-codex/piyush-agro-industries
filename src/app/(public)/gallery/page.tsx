import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: {
    absolute: 'Agricultural Trolley & Fabrication Gallery | Piyush Agro Industries',
  },
  description:
    'Browse our project gallery of tractor trolleys, hydraulic trailers, water tankers, and custom metal fabrication manufactured in Rajnandgaon, Chhattisgarh.',
  alternates: {
    canonical: 'https://www.piyushagroindustries.in/gallery',
  },
  openGraph: {
    title: 'Agricultural Trolley & Fabrication Gallery | Piyush Agro Industries',
    description:
      'View real workshop photos of tractor trolleys, hydraulic tippers, water tankers, and agricultural implements manufactured in Rajnandgaon, Chhattisgarh.',
    url: 'https://www.piyushagroindustries.in/gallery',
    type: 'website',
    images: [
      {
        url: 'https://www.piyushagroindustries.in/images/products/tractor-trolley.png',
        width: 1200,
        height: 630,
        alt: 'Piyush Agro Industries Product Gallery Rajnandgaon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agricultural Trolley & Fabrication Gallery | Piyush Agro Industries',
    description:
      'Explore our manufactured tractor trolleys, water tankers, and custom fabrication in Rajnandgaon, Chhattisgarh.',
    images: ['https://www.piyushagroindustries.in/images/products/tractor-trolley.png'],
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
