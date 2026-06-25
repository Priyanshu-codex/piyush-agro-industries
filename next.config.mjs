/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable Webpack disk caching in development to avoid OneDrive file-locking conflicts
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
