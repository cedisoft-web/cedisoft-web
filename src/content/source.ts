import { companyProfile, contacts } from './data/company';
import { services } from './data/services';
import { productDetails } from './data/product-details';
import { products, sectors } from './data/products';
import { fetchChangelog, fetchNews, fetchNewsItem } from './platform-content';
import type { ContentSource } from './types';

/**
 * Adapter: dati locali per prodotti, servizi e profilo aziendale; news e changelog da Cedi Platform (platform-content.ts).
 */
export const content: ContentSource = {
  getContacts: async () => contacts,
  getProducts: async () => products,
  getProduct: async (slug) => products.find((p) => p.slug === slug) ?? null,
  getProductDetail: async (slug) => productDetails[slug] ?? null,
  getCompanyProfile: async () => companyProfile,
  getSectors: async () => sectors,
  getServices: async () => services,
  getFaq: async () => [],
  // News e changelog: API pubblica di Cedi Platform, lista vuota se spenta o non raggiungibile.
  getNews: fetchNews,
  getNewsItem: fetchNewsItem,
  getChangelog: fetchChangelog,
};
