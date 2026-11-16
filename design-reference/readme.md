# Cedi Soft — Design System (Digital Experience 2026)

Software house italiana multi-settore, dal 1989. Prodotti: Gest Park, Gest Park Web (beta), Gest Crash CARW / CPEW / CPA, Gest Rent, GEST, ESEBOLL, Stiltocco, Videoperizia Online. Sito attuale (da non replicare): https://www.cedisoft.it/
Target: Next.js + TypeScript + Tailwind su Vercel; contenuti da Cedi Platform via API.

## Files
- `Cedi Soft UI Lab.dc.html` — UI Lab interattivo (14 sezioni). Fonte di verità visiva.
- `styles.css` → `tokens/tokens.css` — token CSS (colori, tipo, spazi, raggi, ombre, vetro, motion).
- `assets/` — cedisoft-logo.png (originale), cedisoft-wordmark.png (ritaglio senza tagline, da approvare), cedisoft-symbol.png, favicon.ico.
- `cs-icons.js` — `<cs-icon name="…">` wrapper per Lucide (CDN 0.460.0).

## Content fundamentals
Italiano, tono professionale e diretto, "tu" verso il cliente, "noi" per l'azienda. Frasi brevi, verbi concreti (Progettiamo, Sviluppiamo, Scopri). Sentence case nei titoli; GEST e ESEBOLL in maiuscolo come nome prodotto. Niente emoji, niente statistiche non verificate, niente testimonianze inventate: si usano segnaposto tra parentesi quadre.

## Visual foundations
- Minimal Tech Premium, tema chiaro. 70–80% neutri, 15–20% blu, 5–10% verde.
- Tipo: Geist (display 600, tracking −0.03/−0.045em), Geist Mono per metadati/label tecniche uppercase. Inter come fallback.
- Fondi: bianco, #F7F9FD, #EEF4FC; gradiente Ambient a macchie radiali, animato molto lentamente (24–36s).
- Card: bianco, bordo 1px rgba(25,44,88,.08), raggio 20–24px, ombra minima a riposo; hover: lift 4px, ombra md, bagliore radiale che segue il cursore, prospettiva ≤ 7°.
- Vetro: 3 livelli (78/58/36% + blur 10/18/28 + saturate 160%), bordo bianco 70% e highlight interno. Solo su fondi con colore.
- Pulsanti a pillola; hover = colore più scuro + freccia che avanza (gap +4px); active scale .98; focus ring sky 3px.
- Motion: solo transform/opacity; ease-out cubic-bezier(.22,1,.36,1); niente bounce; reduced-motion rispettato.
- Verde #34A63B non per testo piccolo su bianco: usare #236F28.

## Iconography
Lucide (stroke 1.75). Icone prodotto temporanee in tile Digital Blue finché non arrivano i loghi prodotto ufficiali. Nessuna emoji, nessun SVG disegnato a mano.

## Component inventory → React
- Button, IconButton, Input, Select, Textarea, Checkbox, Tabs, Accordion, Dialog, Tooltip, Toast, Pagination, DropdownMenu, NavigationMenu (mega menu) → **shadcn/ui** (Radix) restyled con i token.
- Navbar flottante compatta, reveal, stagger, tabs indicator, accordion height, hero parallax → **Motion for React**.
- Marquee loghi, shimmer border (card in evidenza), animated gradient → adattati da **Magic UI**.
- Bento grid, spotlight card, card hover 3D → adattati da **Aceternity UI**.
- Testo animato headline (eventuale) → **React Bits** (solo se approvato).
- ProductCard, ProductSpotlight, SectorSelector, CatalogFilter, ChangelogTimeline, Announcement, NewsCard, PricingCard, Footer → **custom**, alimentati da Cedi Platform.
Verificare le licenze prima della produzione.

## Caveats
- Nessun SVG del logo e nessuna versione negativa: necessari per fondi scuri e nitidezza.
- Screenshot reali dei prodotti, loghi prodotto, testimonianze, dati legali e social: da fornire.
