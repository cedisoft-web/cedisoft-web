# cedisoft-website

Sito istituzionale Cedi Soft (Next.js App Router, React, TypeScript, Tailwind v4, Motion, Lucide).
Applicazione **indipendente** da `cedi-platform`: repository, progetto Vercel, dipendenze, variabili e deploy separati.

## Sviluppo

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3010 se si passa -p 3010
npm run typecheck
npm run build
```

## Variabili d'ambiente

| Variabile | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Origine pubblica del sito (canonical, sitemap, Open Graph). |
| `NEXT_PUBLIC_PLATFORM_URL` | Origine della Cedi Platform: "Area Clienti" porta a `<url>/login`. Nessuna autenticazione duplicata. |
| `NEXT_PUBLIC_ASSIST_DEMO` | `1` solo in sviluppo/anteprima: abilita le simulazioni di Cedi Assist. **Mai in Production.** |

Nessun segreto in questo progetto: non copiare variabili da cedi-platform.

## Struttura

- `src/app` — rotte: `/`, `/azienda`, `/software`, `/software/[slug]`, `/servizi`, `/assistenza`, `sitemap`, `robots`.
- `src/content` — contratti (`types.ts`), dati locali (`data/`), adapter (`source.ts`), redirect WordPress (`redirects.ts`).
  Per passare alle API Cedi Platform si implementa `ContentSource` e si cambia solo `source.ts`.
- `src/components` — `layout`, `ui`, `home`, `software`, `company`, `assist` (UI separata dalla logica).
- `src/lib/assist` — contratti `AIProvider` / `LiveChatProvider`, provider demo (esclusi dal bundle di produzione).
- `design-reference/` — archivio Claude Design (sola consultazione, escluso dal build).

## Regole di contenuto

- Nessun contenuto segnaposto in produzione: le voci `verified: false` (servizi) e `hasDetailPage: false` (prodotti) non vengono pubblicate come pagine.
- Le anteprime Vercel sono `noindex`; l'indicizzazione si attiva solo con `VERCEL_ENV=production`.

## Deploy Vercel

Nuovo progetto Vercel collegato a questo repository; framework Next.js; impostare le variabili sopra
(`NEXT_PUBLIC_ASSIST_DEMO=1` solo nell'ambiente Preview).

## Da completare prima della pubblicazione

Testi legali (privacy, cookie, note legali), informativa nel modulo contatti, screenshot e loghi prodotto,
riconferma dei dati aziendali, elenco completo degli URL WordPress per i redirect.
