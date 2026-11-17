/** true solo nel deployment di produzione (su Vercel: VERCEL_ENV=production; altrove: NODE_ENV=production). */
export const isIndexable = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === 'production'
  : process.env.NODE_ENV === 'production';

/** Unico punto di lettura delle variabili d'ambiente pubbliche. Nessun segreto in questo progetto. */
const stripSlash = (v: string) => v.replace(/\/+$/, '');

export const env = {
  siteUrl: stripSlash(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3010'),
  platformUrl: stripSlash(process.env.NEXT_PUBLIC_PLATFORM_URL ?? (process.env.NODE_ENV === 'production' ? 'https://platform.cedisoft.it' : 'http://localhost:3000')),
  /** Simulazioni di Cedi Assist (IA/operatori finti): solo sviluppo/anteprima, mai in produzione. */
  assistDemo: process.env.NEXT_PUBLIC_ASSIST_DEMO === '1',
} as const;

/**
 * Integrazione con le API pubbliche di Cedi Platform. Tutte le variabili sono PUBBLICHE (NEXT_PUBLIC_*):
 * finiscono nel bundle del browser, quindi qui non va mai alcun segreto. Vuote = integrazione spenta
 * (il sito resta pienamente utilizzabile: moduli con recapiti alternativi, news/changelog nascosti, nessuna chat).
 *
 * - NEXT_PUBLIC_PLATFORM_API_URL — origine dell'API Cedi Platform (solo origine, es. https://api.example.it).
 *   Usata dal browser per `POST /api/public/site/requests` (serve CORS: la Platform risponde solo alle origini
 *   in `CediPlatform:PublicSite:AllowedOrigins`) e dal server del sito per news/changelog (nessun CORS necessario).
 * - NEXT_PUBLIC_CHAT_SITE_KEY — identificativo del sito registrato nella Live Chat (`chat.chat_sites`). Non è un segreto:
 *   la Platform decide chi può incorniciare il widget con `frame-ancestors`.
 * - NEXT_PUBLIC_CHAT_URL — origine che serve il widget (di norma la stessa dell'API; la Live Chat può avere un host proprio).
 *   Se vuota si usa NEXT_PUBLIC_PLATFORM_API_URL.
 */
const platformApiUrl = stripSlash(process.env.NEXT_PUBLIC_PLATFORM_API_URL ?? '');
const chatSiteKey = (process.env.NEXT_PUBLIC_CHAT_SITE_KEY ?? '').trim();
const chatUrl = stripSlash(process.env.NEXT_PUBLIC_CHAT_URL ?? '') || platformApiUrl;

export const integrations = {
  platformApiUrl,
  /** Moduli di richiesta (contatto, demo, assistenza). */
  requestsEnabled: platformApiUrl !== '',
  /** News e changelog letti dall'API pubblica. */
  siteContentEnabled: platformApiUrl !== '',
  chatSiteKey,
  chatUrl,
  chatEnabled: chatSiteKey !== '' && chatUrl !== '',
} as const;
