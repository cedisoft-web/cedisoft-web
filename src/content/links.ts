import type { Product } from './types';

/** Indirizzo della scheda di un prodotto. Un prodotto documentato nella pagina di un altro (es. Gest Park Web dentro Gest Park) punta all'ancora. */
export function productHref(p: Pick<Product, 'slug' | 'hasDetailPage' | 'detailPage'>): string {
  if (p.detailPage) return `/software/${p.detailPage}#${p.slug}`;
  return p.hasDetailPage ? `/software/${p.slug}` : `/software#${p.slug}`;
}
