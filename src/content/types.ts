/**
 * Contratti dei contenuti del sito. Le componenti visive dipendono SOLO da questi tipi:
 * oggi i dati sono locali (src/content/data), domani un adapter può leggerli da Cedi Platform.
 */
export type IconName = string; // nome Lucide in kebab-case, risolto in components/ui/icon.tsx

export type SectorId = 'automotive' | 'carrozzerie' | 'periti' | 'autonoleggio' | 'amministrazione' | 'altre';

export interface Sector { id: SectorId; label: string; icon: IconName }

export interface Product {
  slug: string;
  name: string;
  category: string;
  sectors: SectorId[];
  icon: IconName;
  description: string;
  featured?: boolean;
  /** Stato noto solo dove verificato (es. Beta). */
  status?: { label: 'Beta'; note?: string };
  moduleOf?: string;
  /** La pagina di dettaglio esiste solo se i contenuti sono approvati. */
  hasDetailPage: boolean;
}

export interface FeatureGroup {
  icon: IconName;
  title: string;
  summary: string;
  body: string;
  items: { title: string; text: string }[];
}

/** Scheda estesa di un prodotto: presente solo quando i contenuti sono approvati. */
export interface ProductDetail {
  value: string;
  chips: { icon: IconName; title: string; subtitle?: string }[];
  overview: { title: string; text: string; points: string[] };
  features: FeatureGroup[];
  integrations: { name: string; text: string }[];
  faq: FaqItem[];
  relatedSlugs: string[];
}

export interface Service {
  slug: string;
  name: string;
  icon: IconName;
  description: string;
  benefits: string[];
  /** false = contenuto ancora da confermare: non va presentato come servizio disponibile. */
  verified: boolean;
}

export interface TimelineEntry { year: string; title: string; text: string; source: string; verified: boolean }
export interface IconItem { icon: IconName; title: string; text: string }
export interface WorkPhase { icon: IconName; title: string; text: string; items: string[] }
export interface CompanyProfile {
  story: IconItem[];
  timeline: TimelineEntry[];
  values: IconItem[];
  phases: WorkPhase[];
}

export interface Contacts {
  company: string;
  address: string;
  phones: { label: string; href: string }[];
  email: string;
  vat: string;
}

export interface FaqItem { question: string; answer: string; topic?: string }
export interface NewsItem { slug: string; title: string; date: string; excerpt: string }
export interface ChangelogEntry { product: string; version: string; date: string; changes: string[] }

export interface NavLink { label: string; href: string; icon?: IconName; soon?: boolean }
export interface MegaGroup { label: string; productSlugs: string[] }
export interface FooterColumn { title: string; links: NavLink[] }

/** Sorgente dati: sostituibile con un adapter verso le API Cedi Platform senza toccare i componenti. */
export interface ContentSource {
  getContacts(): Promise<Contacts>;
  getProducts(): Promise<Product[]>;
  getProduct(slug: string): Promise<Product | null>;
  getProductDetail(slug: string): Promise<ProductDetail | null>;
  getCompanyProfile(): Promise<CompanyProfile>;
  getSectors(): Promise<Sector[]>;
  getServices(): Promise<Service[]>;
  getFaq(): Promise<FaqItem[]>;
  getNews(): Promise<NewsItem[]>;
  getChangelog(): Promise<ChangelogEntry[]>;
}
