import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: {
    absolute: 'Contact Piyush Agro Industries | Rajnandgaon, Chhattisgarh',
  },
  description:
    'Contact Piyush Agro Industries in Rajnandgaon, Chhattisgarh. Inquire about tractor trolleys, hydraulic equipment, agricultural implements, and custom fabrication solutions.',
  alternates: {
    canonical: 'https://www.piyushagroindustries.in/contact',
  },
  openGraph: {
    title: 'Contact Piyush Agro Industries | Rajnandgaon, Chhattisgarh',
    description:
      'Get in touch with Piyush Agro Industries for heavy-duty tractor trolleys, hydraulic equipment, and custom fabrication in Rajnandgaon, Chhattisgarh.',
    url: 'https://www.piyushagroindustries.in/contact',
    type: 'website',
    images: [
      {
        url: 'https://www.piyushagroindustries.in/images/products/tractor-trolley.png',
        width: 1200,
        height: 630,
        alt: 'Contact Piyush Agro Industries Rajnandgaon Chhattisgarh',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Piyush Agro Industries | Rajnandgaon, Chhattisgarh',
    description:
      'Contact Piyush Agro Industries in Rajnandgaon, Chhattisgarh for pricing, custom orders, and fabrication inquiries.',
    images: ['https://www.piyushagroindustries.in/images/products/tractor-trolley.png'],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
