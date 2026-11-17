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
