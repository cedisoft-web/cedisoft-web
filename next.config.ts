import type { NextConfig } from 'next';

import { redirects } from './src/content/redirects';

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Sempre definita a build-time: così il ramo demo di Cedi Assist viene eliminato dal bundle di produzione.
  env: { NEXT_PUBLIC_ASSIST_DEMO: process.env.NEXT_PUBLIC_ASSIST_DEMO === '1' ? '1' : '0' },
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
      ],
    }];
  },
  async redirects() {
    return redirects;
  },
};

export default config;
