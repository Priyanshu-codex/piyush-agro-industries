import type { Metadata, Viewport } from 'next';
import { Noto_Sans, Rajdhani, Noto_Sans_Devanagari } from 'next/font/google';
import './globals.css';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto',
  display: 'swap',
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hindi',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Piyush Agro Industries | Hydraulic Trolley & Agricultural Equipment Manufacturer in Rajnandgaon',
  description:
    'Piyush Agro Industries is a leading manufacturer of hydraulic trolleys, tractor trolleys, agricultural equipment, water tankers, dumpers, vehicle fabrication and repairing services in Rajnandgaon, Chhattisgarh.',
  keywords: [
    'Piyush Agro Industries',
    'Hydraulic Trolley Manufacturer Rajnandgaon',
    'Tractor Trolley Manufacturer Chhattisgarh',
    'Agricultural Equipment Manufacturer',
    'Hydraulic Dumper Manufacturer',
    'Vehicle Fabrication Rajnandgaon',
    'Water Tanker Manufacturer',
    'Garbage Vehicle Manufacturer',
    'Cultivator Manufacturer',
    'Welding Fabrication Services',
    'Trailer Manufacturer Chhattisgarh',
  ],
  authors: [{ name: 'Piyush Agro Industries' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://piyushagro.com',
    siteName: 'Piyush Agro Industries',
    title: 'Piyush Agro Industries | Hydraulic Trolley & Agricultural Equipment Manufacturer',
    description:
      'Leading manufacturer of hydraulic trolleys, tractor trolleys, agricultural equipment, and vehicle fabrication services in Rajnandgaon, Chhattisgarh.',
  },
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Piyush Agro Industries',
      description:
        'Manufacturer of hydraulic trolleys, agricultural equipment, and vehicle fabrication services',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Khairagarh Road, Thelkadih',
        addressLocality: 'Rajnandgaon',
        addressRegion: 'Chhattisgarh',
        postalCode: '491441',
        addressCountry: 'IN',
      },
      telephone: '+919425245291',
      url: 'https://piyushagro.com',
    }),
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B7A3B',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${notoSans.variable} ${rajdhani.variable} ${devanagari.variable} overflow-x-hidden`}>
      <body className="overflow-x-hidden antialiased">{children}</body>
    </html>
  );
}
