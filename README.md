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
| `NEXT_PUBLIC_PLATFORM_API_URL` | Origine dell'API pubblica di Cedi Platform. Vuota = integrazione spenta (moduli con recapiti alternativi, News/Changelog «presto», nessuna chat). Il browser invia le richieste a `<url>/api/public/site/requests`: la Platform deve avere l'origine del sito in `CediPlatform:PublicSite:AllowedOrigins` (CORS). Il server del sito legge news e changelog (`/api/public/site/news`, `/news/{slug}`, `/changelog`, rivalidate ogni 120 s; se l'API non risponde, elenco vuoto). |
| `NEXT_PUBLIC_CHAT_SITE_KEY` | Identificativo del sito registrato nella Live Chat. Vuoto = nessuna chat. Non è un segreto. |
| `NEXT_PUBLIC_CHAT_URL` | Origine che serve il widget chat, se diversa dall'API. |
| `NEXT_PUBLIC_ASSIST_DEMO` | `1` solo in sviluppo/anteprima: abilita le simulazioni di Cedi Assist. **Mai in Production.** |

Nessun segreto in questo progetto: tutte le variabili sono `NEXT_PUBLIC_*` e finiscono nel browser; non copiare variabili da cedi-platform. Sono lette solo in `src/lib/env.ts`.

## Struttura

- `src/app` — rotte: `/`, `/azienda`, `/software`, `/software/[slug]`, `/servizi`, `/assistenza`, `/demo`, `/news`, `/news/[slug]`, `/changelog`, `sitemap`, `robots`.
- `src/content` — contratti (`types.ts`), dati locali (`data/`), adapter (`source.ts`), redirect WordPress (`redirects.ts`).
  News e changelog arrivano da Cedi Platform (`platform-content.ts`, fetch lato server con revalidate); il resto è locale.
- `src/components` — `layout`, `ui`, `home`, `software`, `company`, `assist` (UI separata dalla logica).
- `src/lib/assist` — contratti `AIProvider` / `LiveChatProvider`, provider demo (esclusi dal bundle di produzione).
- `design-reference/` — archivio Claude Design (sola consultazione, escluso dal build).

## Regole di contenuto

- Nessun contenuto segnaposto in produzione: le voci `verified: false` (servizi) e `hasDetailPage: false` (prodotti) non vengono pubblicate come pagine.
- Le anteprime Vercel sono `noindex`; l'indicizzazione si attiva solo con `VERCEL_ENV=production`.

## Deploy Vercel

Nuovo progetto Vercel collegato a questo repository; framework Next.js; impostare le variabili sopra
(`NEXT_PUBLIC_ASSIST_DEMO=1` solo nell'ambiente Preview).

## Integrazione con Cedi Platform

- **Moduli** (`ContactForm`, tipi `CONTACT` in Azienda, `DEMO` in `/demo`, `SUPPORT` in Assistenza): `POST /api/public/site/requests` con honeypot (`website`), `renderedAt`, chiave di idempotenza, consenso con versione e digest dell'informativa letti da `GET …/requests/policy`. Nessun dato personale in log o console.
- **Live Chat**: widget della Platform in `<iframe>` (`/api/public/chat/widget?site=<chiave>`), montato solo quando il visitatore apre «Chatta con un operatore». Nome, email e consenso sono chiesti dal widget; senza operatori online il widget propone il modulo di richiesta (URL configurato sul sito chat nella Platform: `<sito>/assistenza#richiesta`) e il pannello offre comunque il link al modulo.
- Il dominio pubblico dell'API e il CORS sono una decisione di deployment ancora aperta.

## Da completare prima della pubblicazione

Testi legali (privacy, cookie, note legali); **informativa dei moduli: oggi è il testo provvisorio «DA VALIDARE» servito dalla Platform, non va in produzione senza validazione**; screenshot e loghi prodotto,
riconferma dei dati aziendali, elenco completo degli URL WordPress per i redirect.
