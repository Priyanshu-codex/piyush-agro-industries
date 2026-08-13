import type { Metadata, Viewport } from 'next';
import { Noto_Sans, Rajdhani, Noto_Sans_Devanagari } from 'next/font/google';
import '@/styles/globals.css';
import { OrganizationJsonLd, LocalBusinessJsonLd, WebSiteJsonLd } from '@/components/seo/JsonLd';

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
  metadataBase: new URL('https://piyushagro.com'),
  title: {
    default: 'Piyush Agro Industries | Agricultural Equipment & Fabrication Manufacturer',
    template: '%s | Piyush Agro Industries',
  },
  description:
    'Piyush Agro Industries is a leading manufacturer of hydraulic trolleys, tractor trolleys, agricultural implements, water tanker trailers, and custom vehicle fabrication services in Rajnandgaon, Chhattisgarh, serving Central India & Pan-India.',
  keywords: [
    'Piyush Agro Industries',
    'Piyush Agro',
    'Tractor Trolley Manufacturer',
    'Tractor Trolley Manufacturer Chhattisgarh',
    'Tractor Trolley Manufacturer India',
    'Hydraulic Trolley Manufacturer',
    'Hydraulic Dumper Manufacturer',
    'Water Tanker Trailer',
    'Agricultural Equipment Manufacturer',
    'Agricultural Machinery India',
    'Cultivator Manufacturer',
    'Custom Fabrication Chhattisgarh',
    'Steel Gate Fabrication',
    'Vehicle Repairing Workshop',
    'Trailer Manufacturer Chhattisgarh',
  ],
  authors: [{ name: 'Piyush Agro Industries' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: './',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://piyushagro.com',
    siteName: 'Piyush Agro Industries',
    title: 'Piyush Agro Industries | Agricultural Equipment & Fabrication Manufacturer',
    description:
      'Leading manufacturer of hydraulic trolleys, tractor trolleys, agricultural implements, water tankers, and custom fabrication in Rajnandgaon, Chhattisgarh.',
    images: [
      {
        url: '/images/products/tractor-trolley.jpg',
        width: 1200,
        height: 630,
        alt: 'Piyush Agro Industries Tractor Trolley & Agricultural Equipment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Piyush Agro Industries | Agricultural Equipment & Fabrication',
    description:
      'Premier manufacturer of heavy-duty hydraulic trolleys, tractor trailers, agricultural machinery, and metal fabrication services in Chhattisgarh, India.',
    images: ['/images/products/tractor-trolley.jpg'],
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
    <html lang="en" suppressHydrationWarning className={`${notoSans.variable} ${rajdhani.variable} ${devanagari.variable} overflow-x-hidden`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <OrganizationJsonLd />
        <LocalBusinessJsonLd />
        <WebSiteJsonLd />
      </head>
      <body suppressHydrationWarning className="overflow-x-hidden antialiased">{children}</body>
    </html>
  );
}
