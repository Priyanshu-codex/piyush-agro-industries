/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dnjcgjmpfgfilnbsdekz.supabase.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/product/:slug',
        destination: '/products/:slug',
        permanent: true,
      },
      // 301 Permanent Redirects for legacy short slugs to canonical SEO slugs
      {
        source: '/products/ht-trolley',
        destination: '/products/hydraulic-tractor-trolley',
        permanent: true,
      },
      {
        source: '/products/tt-tipping',
        destination: '/products/tractor-tipping-trailer',
        permanent: true,
      },
      {
        source: '/products/tt-2ton',
        destination: '/products/2-ton-tractor-trailer',
        permanent: true,
      },
      {
        source: '/products/water-tanker',
        destination: '/products/water-tanker-trailer',
        permanent: true,
      },
      {
        source: '/products/tt-nontipping',
        destination: '/products/non-tipping-tractor-trailer',
        permanent: true,
      },
      {
        source: '/products/gen-trolley',
        destination: '/products/generator-trolley',
        permanent: true,
      },
      {
        source: '/products/commercial-body',
        destination: '/products/commercial-vehicle-body-fabrication',
        permanent: true,
      },
      {
        source: '/products/tanker-fab',
        destination: '/products/tanker-trailer-fabrication',
        permanent: true,
      },
      {
        source: '/products/laser-fab',
        destination: '/products/precision-sheet-metal-laser-fabrication',
        permanent: true,
      },
      {
        source: '/products/chassis-rep',
        destination: '/products/chassis-straightening-repair',
        permanent: true,
      },
      {
        source: '/products/hyd-repair',
        destination: '/products/hydraulic-cylinder-jack-repair',
        permanent: true,
      },
      {
        source: '/products/body-paint',
        destination: '/products/commercial-body-denting-painting',
        permanent: true,
      },
      {
        source: '/products/axle-susp',
        destination: '/products/heavy-axle-suspension-overhaul',
        permanent: true,
      },
      {
        source: '/products/custom-mod',
        destination: '/products/custom-vehicle-modification',
        permanent: true,
      },
      {
        source: '/products/muck-spreader',
        destination: '/products/hydraulic-muck-manure-spreader',
        permanent: true,
      },
      {
        source: '/products/cane-loader',
        destination: '/products/tractor-mounted-sugarcane-loader',
        permanent: true,
      },
      {
        source: '/products/dozer-blade',
        destination: '/products/heavy-duty-tractor-front-dozer-blade',
        permanent: true,
      },
      {
        source: '/products/post-hole',
        destination: '/products/hydraulic-tractor-post-hole-digger',
        permanent: true,
      },
      {
        source: '/products/silage-wagon',
        destination: '/products/hydraulic-forage-silage-trailer',
        permanent: true,
      },
      {
        source: '/products/orchard-sprayer',
        destination: '/products/tractor-trailed-orchard-mist-sprayer',
        permanent: true,
      },
      {
        source: '/products/tipping-dumper',
        destination: '/products/tractor-towed-hydraulic-tipping-dumper',
        permanent: true,
      },
      {
        source: '/products/lowbed-trailer',
        destination: '/products/heavy-machinery-lowbed-tractor-trailer',
        permanent: true,
      },
      {
        source: '/products/flatbed-trailer',
        destination: '/products/industrial-heavy-duty-flatbed-trailer',
        permanent: true,
      },
      {
        source: '/products/custom-cage',
        destination: '/products/removable-mesh-cage-bulk-crop-trolley',
        permanent: true,
      },
      {
        source: '/products/side-tipping',
        destination: '/products/dual-side-hydraulic-tipping-trailer',
        permanent: true,
      },
      {
        source: '/products/fuel-bowser',
        destination: '/products/mobile-diesel-fuel-dispenser-bowser',
        permanent: true,
      },
      {
        source: '/products/tipper-subframe',
        destination: '/products/heavy-truck-tipper-body-subframe',
        permanent: true,
      },
      {
        source: '/products/container-carrier',
        destination: '/products/tractor-skeletal-container-chassis',
        permanent: true,
      },
      {
        source: '/products/semi-trailer',
        destination: '/products/custom-multi-axle-semi-trailer-chassis',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },
  turbopack: {
    root: process.cwd(),
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
