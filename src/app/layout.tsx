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
  metadataBase: new URL('https://www.piyushagroindustries.in'),
  title: {
    default: 'Piyush Agro Industries | Tractor Trolley & Agricultural Equipment Manufacturer',
    template: '%s | Piyush Agro Industries',
  },
  description:
    'Piyush Agro Industries is a manufacturer of tractor trolleys, hydraulic trolleys, agricultural equipment, trailers and custom fabrication solutions in Rajnandgaon, Chhattisgarh.',
  keywords: [
    'Piyush Agro Industries',
    'Piyush Agro Industries Rajnandgaon',
    'tractor trolley manufacturer Rajnandgaon',
    'tractor trolley manufacturer Chhattisgarh',
    'hydraulic trolley manufacturer Rajnandgaon',
    'hydraulic trolley manufacturer Chhattisgarh',
    'agricultural equipment manufacturer Rajnandgaon',
    'agricultural equipment manufacturer Chhattisgarh',
    'tractor trailer manufacturer Chhattisgarh',
    'custom fabrication Rajnandgaon',
    'hydraulic dumper manufacturer',
    'water tanker trailer Chhattisgarh',
    'cultivator manufacturer Rajnandgaon',
    'vehicle fabrication Chhattisgarh',
    'vehicle repair workshop Rajnandgaon',
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
    canonical: 'https://www.piyushagroindustries.in/',
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
    url: 'https://www.piyushagroindustries.in',
    siteName: 'Piyush Agro Industries',
    title: 'Piyush Agro Industries | Tractor Trolley & Agricultural Equipment Manufacturer',
    description:
      'Piyush Agro Industries is a manufacturer of tractor trolleys, hydraulic trolleys, agricultural equipment, trailers and custom fabrication solutions in Rajnandgaon, Chhattisgarh.',
    images: [
      {
        url: 'https://www.piyushagroindustries.in/images/products/tractor-trolley.png',
        width: 1200,
        height: 630,
        alt: 'Piyush Agro Industries Tractor Trolley and Agricultural Equipment in Rajnandgaon, Chhattisgarh',
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
