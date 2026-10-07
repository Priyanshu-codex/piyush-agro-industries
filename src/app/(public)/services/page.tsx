import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: {
    absolute: 'Agricultural & Vehicle Fabrication Services in Rajnandgaon | Piyush Agro Industries',
  },
  description:
    'Professional fabrication, vehicle repairing, hydraulic tipper conversions, and custom engineering services in Rajnandgaon, Chhattisgarh by Piyush Agro Industries.',
  alternates: {
    canonical: 'https://www.piyushagroindustries.in/services',
  },
  openGraph: {
    title: 'Agricultural & Vehicle Fabrication Services in Rajnandgaon | Piyush Agro Industries',
    description:
      'Explore vehicle fabrication, hydraulic repairs, commercial modifications, and custom metalwork in Rajnandgaon, Chhattisgarh by Piyush Agro Industries.',
    url: 'https://www.piyushagroindustries.in/services',
    type: 'website',
    images: [
      {
        url: 'https://www.piyushagroindustries.in/images/products/tractor-trolley.png',
        width: 1200,
        height: 630,
        alt: 'Piyush Agro Industries Fabrication & Repair Services Rajnandgaon Chhattisgarh',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agricultural & Vehicle Fabrication Services | Piyush Agro Industries',
    description:
      'Vehicle fabrication, hydraulic tipping repairs, welding and custom metalwork in Rajnandgaon, Chhattisgarh.',
    images: ['https://www.piyushagroindustries.in/images/products/tractor-trolley.png'],
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
