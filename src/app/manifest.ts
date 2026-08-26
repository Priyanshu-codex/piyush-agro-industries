import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Piyush Agro Industries',
    short_name: 'Piyush Agro',
    description: 'Premier manufacturer of heavy-duty hydraulic trolleys, tractor trailers, agricultural machinery, and custom fabrication in Rajnandgaon, Chhattisgarh.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0B7A3B',
    icons: [
      {
        src: '/favicon.png',
        sizes: '192x192 512x512',
        type: 'image/png',
      },
    ],
  };
}
