import { companyProfile, contacts } from './data/company';
import { services } from './data/services';
import { productDetails } from './data/product-details';
import { products, sectors } from './data/products';
import type { ContentSource } from './types';

/**
 * Adapter locale (v1.0). Per passare alle API Cedi Platform si implementa `ContentSource`
 * con fetch + revalidate e si cambia solo questa esportazione.
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
  getNews: async () => [],
  getChangelog: async () => [],
};
