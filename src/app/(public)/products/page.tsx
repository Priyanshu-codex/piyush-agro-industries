import type { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: {
    absolute: 'Agricultural Equipment & Tractor Trolley Products | Piyush Agro Industries',
  },
  description:
    'Explore heavy-duty tractor trolleys, 2-wheel & 4-wheel hydraulic trolleys, agricultural tipping trailers, water tankers, and custom fabrication in Rajnandgaon, Chhattisgarh.',
  alternates: {
    canonical: 'https://www.piyushagroindustries.in/products',
  },
  openGraph: {
    title: 'Agricultural Equipment & Tractor Trolley Products | Piyush Agro Industries',
    description:
      'Explore our complete catalogue of heavy-duty agricultural equipment, tractor trailers, and hydraulic dumpers manufactured in Rajnandgaon, Chhattisgarh.',
    url: 'https://www.piyushagroindustries.in/products',
    type: 'website',
    images: [
      {
        url: 'https://www.piyushagroindustries.in/images/products/tractor-trolley.png',
        width: 1200,
        height: 630,
        alt: 'Piyush Agro Industries Product Catalogue Rajnandgaon Chhattisgarh',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agricultural Equipment & Tractor Trolley Products | Piyush Agro Industries',
    description:
      'Explore durable tractor trolleys, hydraulic trailers, and custom fabrication in Rajnandgaon, Chhattisgarh.',
    images: ['https://www.piyushagroindustries.in/images/products/tractor-trolley.png'],
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
