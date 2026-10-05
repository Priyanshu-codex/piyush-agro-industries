import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: {
    absolute: 'About Piyush Agro Industries | Agricultural Equipment Manufacturer',
  },
  description:
    'About Piyush Agro Industries: Trusted manufacturer of tractor trolleys, hydraulic equipment, agricultural implements, and custom fabrication in Rajnandgaon, Chhattisgarh.',
  alternates: {
    canonical: 'https://www.piyushagroindustries.in/about',
  },
  openGraph: {
    title: 'About Piyush Agro Industries | Agricultural Equipment Manufacturer',
    description:
      'Learn about Piyush Agro Industries, our mission, vision, and manufacturing expertise in agricultural trolleys and fabrication in Rajnandgaon, Chhattisgarh.',
    url: 'https://www.piyushagroindustries.in/about',
    type: 'website',
    images: [
      {
        url: 'https://www.piyushagroindustries.in/images/products/tractor-trolley.png',
        width: 1200,
        height: 630,
        alt: 'About Piyush Agro Industries Rajnandgaon Chhattisgarh',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Piyush Agro Industries | Agricultural Equipment Manufacturer',
    description:
      'Learn about Piyush Agro Industries, a trusted manufacturer of tractor trolleys and agricultural equipment in Chhattisgarh.',
    images: ['https://www.piyushagroindustries.in/images/products/tractor-trolley.png'],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
