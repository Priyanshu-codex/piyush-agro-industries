import type { Metadata } from 'next';
import HomeClient from './HomeClient';
import { CommercialVehicleServiceJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: {
    absolute: 'Piyush Agro Industries | Tractor Trolley & SML Mahindra Commercial Vehicle Service',
  },
  description:
    'Piyush Agro Industries is a premier manufacturer of tractor trolleys, hydraulic trolleys, agricultural equipment, and provider of commercial vehicle servicing in association with SML Mahindra Limited in Rajnandgaon, Chhattisgarh.',
  keywords: [
    'Piyush Agro Industries',
    'Tractor Trolley Manufacturer',
    'SML Mahindra Commercial Vehicle Service',
    'SML Mahindra Truck Servicing Rajnandgaon',
    'SML Bus Service Chhattisgarh',
    'Commercial Vehicle Servicing Rajnandgaon',
    'Hydraulic Trolley Manufacturer Chhattisgarh',
    'Thelkadih Rajnandgaon'
  ],
  alternates: {
    canonical: 'https://www.piyushagroindustries.in',
  },
  openGraph: {
    title: 'Piyush Agro Industries | Tractor Trolley & SML Mahindra Commercial Vehicle Service',
    description:
      'Piyush Agro Industries is a manufacturer of tractor trolleys, hydraulic equipment, and provider of commercial vehicle servicing in association with SML Mahindra Limited in Rajnandgaon, Chhattisgarh.',
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
    title: 'Piyush Agro Industries | Tractor Trolley & SML Mahindra Commercial Vehicle Service',
    description:
      'Piyush Agro Industries is a manufacturer of tractor trolleys, hydraulic equipment, and provider of commercial vehicle servicing in association with SML Mahindra Limited in Rajnandgaon, Chhattisgarh.',
    images: ['https://www.piyushagroindustries.in/images/products/tractor-trolley.png'],
  },
};

export default function HomePage() {
  return (
    <>
      <CommercialVehicleServiceJsonLd />
      <HomeClient />
    </>
  );
}
