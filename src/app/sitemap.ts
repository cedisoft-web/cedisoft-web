import type { MetadataRoute } from 'next';

import { content } from '@/content/source';
import { env } from '@/lib/env';

/** Solo pagine realmente pubblicate: i dettagli prodotto compaiono quando hanno una scheda approvata. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = (await content.getProducts()).filter((p) => p.hasDetailPage);
  const paths = ['/', '/software', '/servizi', '/azienda', '/assistenza', ...products.map((p) => `/software/${p.slug}`)];
  return paths.map((p) => ({
    url: `${env.siteUrl}${p === '/' ? '' : p}`,
    changeFrequency: p === '/' ? 'weekly' : 'monthly',
    priority: p === '/' ? 1 : p.startsWith('/software/') ? 0.7 : 0.8,
  }));
}
