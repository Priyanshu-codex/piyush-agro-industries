import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: {
    absolute: 'Piyush Agro Industries | Tractor Trolley & Agricultural Equipment Manufacturer',
  },
  description:
    'Piyush Agro Industries is a manufacturer of tractor trolleys, hydraulic trolleys, agricultural equipment, trailers and custom fabrication solutions in Rajnandgaon, Chhattisgarh.',
  alternates: {
    canonical: 'https://www.piyushagroindustries.in',
  },
  openGraph: {
    title: 'Piyush Agro Industries | Tractor Trolley & Agricultural Equipment Manufacturer',
    description:
      'Piyush Agro Industries is a manufacturer of tractor trolleys, hydraulic trolleys, agricultural equipment, trailers and custom fabrication solutions in Rajnandgaon, Chhattisgarh.',
    url: 'https://www.piyushagroindustries.in',
    siteName: 'Piyush Agro Industries',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://www.piyushagroindustries.in/images/products/tractor-trolley.png',
        width: 1200,
        height: 630,
        alt: 'Piyush Agro Industries - Agricultural Equipment & Tractor Trolley Manufacturer Rajnandgaon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Piyush Agro Industries | Tractor Trolley & Agricultural Equipment Manufacturer',
    description:
      'Piyush Agro Industries is a manufacturer of tractor trolleys, hydraulic trolleys, agricultural equipment, trailers and custom fabrication solutions in Rajnandgaon, Chhattisgarh.',
    images: ['https://www.piyushagroindustries.in/images/products/tractor-trolley.png'],
  },
};

export default function HomePage() {
  return <HomeClient />;
}
