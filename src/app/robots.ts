import type { MetadataRoute } from 'next';

import { env, isIndexable } from '@/lib/env';

export default function robots(): MetadataRoute.Robots {
  // Anteprime Vercel e sviluppo: mai indicizzate.
  if (!isIndexable) return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/design-kit'] },
    sitemap: `${env.siteUrl}/sitemap.xml`,
  };
}
