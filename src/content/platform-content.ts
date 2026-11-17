import { integrations } from '@/lib/env';

import type { ChangelogEntry, NewsDetail, NewsItem } from './types';

/**
 * Lettura di news e changelog dall'API pubblica di Cedi Platform (`/api/public/site/news`, `/news/{slug}`, `/changelog`).
 * Solo lato server (nessun CORS sulle rotte di contenuto). Contratto: rapporto WEB-NEWS (KB 52, doc 49 §5).
 * Ogni errore (rete, timeout, risposta non valida, integrazione spenta) degrada a "nessun contenuto": il sito non si rompe mai.
 * Cache: Next riusa la risposta per `REVALIDATE` secondi; la Platform risponde a sua volta con `max-age=60`.
 */
const REVALIDATE = 120;
const TIMEOUT_MS = 5000;

async function get(path: string): Promise<unknown | null> {
  if (!integrations.siteContentEnabled) return null;
  try {
    const r = await fetch(`${integrations.platformApiUrl}/api/public/site/${path}`, {
      headers: { accept: 'application/json' },
      next: { revalidate: REVALIDATE },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    return r.ok ? await r.json() : null;
  } catch {
    return null;
  }
}

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;
const str = (v: unknown): v is string => typeof v === 'string' && v.length > 0;

function toNewsItem(v: unknown): NewsItem | null {
  if (!isRecord(v) || !str(v.slug) || !str(v.title) || !str(v.date)) return null;
  return { slug: v.slug, title: v.title, date: v.date, excerpt: typeof v.excerpt === 'string' ? v.excerpt : '' };
}

export async function fetchNews(): Promise<NewsItem[]> {
  const j = await get('news?limit=50');
  if (!isRecord(j) || !Array.isArray(j.items)) return [];
  return j.items.map(toNewsItem).filter((x): x is NewsItem => x !== null);
}

export async function fetchNewsItem(slug: string): Promise<NewsDetail | null> {
  if (!/^[a-z0-9-]{1,120}$/.test(slug)) return null;
  const j = await get(`news/${slug}`);
  const base = toNewsItem(j);
  if (!base || !isRecord(j) || !str(j.bodyHtml)) return null;
  return { ...base, bodyHtml: j.bodyHtml };
}

export async function fetchChangelog(): Promise<ChangelogEntry[]> {
  const j = await get('changelog?limit=100');
  if (!isRecord(j) || !Array.isArray(j.items)) return [];
  const out: ChangelogEntry[] = [];
  for (const v of j.items) {
    if (!isRecord(v) || !str(v.version) || !str(v.date) || !Array.isArray(v.changes)) continue;
    const p = isRecord(v.product) ? v.product : null;
    out.push({
      product: p && str(p.name) ? p.name : '',
      ...(p && str(p.id) ? { productId: p.id } : {}),
      version: v.version,
      date: v.date,
      changes: v.changes.filter((c): c is string => typeof c === 'string'),
    });
  }
  return out;
}
