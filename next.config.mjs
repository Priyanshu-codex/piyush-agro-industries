/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dnjcgjmpfgfilnbsdekz.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable Webpack disk caching in development to avoid OneDrive file-locking conflicts
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
