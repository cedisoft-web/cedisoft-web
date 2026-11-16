# Cedi Soft — Fase 02 · Note di consegna

## Pagine (prototipo navigabile)
| Route futura | File |
|---|---|
| `/` | Home.dc.html |
| `/azienda` (+ `#contatti`) | Azienda.dc.html |
| `/software` (`?settore=`) | Software.dc.html |
| `/software/[slug]` | Prodotto.dc.html?p=gest-park (template per tutti i prodotti) |
| `/servizi` (`#fatturazione` `#backup` `#sicurezza` `#assistenza` `#sviluppo`) | Servizi.dc.html |
| `/assistenza` (`#guide` `#download` `#faq`) | Assistenza.dc.html |

News, Changelog, Area Clienti: voci visibili con badge "PRESTO"; al clic mostrano un avviso "non ancora disponibile nel prototipo".

## Componenti nuovi
- **CediAssist** — launcher unico + pannello condiviso: home di scelta, Assistente AI (demo), Live Chat (disponibile / occupato / offline, coda, form offline, allegati, termina, handoff con contesto).
- **ProductCard** — card prodotto con spotlight al cursore, badge stato (Beta).
- Pattern ricorrenti (inline, da estrarre in React): PageHero, SectionHeading (eyebrow mono + H2), Breadcrumb, Tabs verticali con pannello, Accordion FAQ (grid-rows), ContactForm con stati, Timeline, Bento valori, Sticky filter bar.

## Componenti del Design System riutilizzati
Navbar flottante in vetro (Header, aggiornato: mega menu Software, CTA demo, menu mobile), Footer, pulsanti a pillola, chip/filtri, card bianche bordo 1px, gradienti ambient, badge, toast, reveal on scroll, token colore/tipo (Geist + Geist Mono), icone Lucide via `<cs-icon>`.

## Dati verificati usati (da riconfermare)
- Contatti: Piazza Rotelli 4, 04028 Scauri (LT) · 0771 681680 · 0771 680866 · cedi@cedisoft.it · P. IVA 02307450599 (cedisoft.it).
- Descrizioni prodotto: schede su cedisoft.it; Gest Park: cloud, noleggio/pratiche, Eurotax, Seasoft, Zucchetti; ESEBOLL modulo di Gest Park.
- DAT Italia partnership 2020; Cedi Soft dal 1989 (datgroup.com). Infocar-Quattroruote distributore (cedisoft.it). Cloud e Stiltocco al VisCom 2017.

## Asset e informazioni mancanti
- Screenshot reali di Gest Park, Gest Crash, GEST e degli altri prodotti; loghi prodotto.
- Logo SVG e versione negativa (in CTA si usa il simbolo PNG invertito).
- Loghi partner/integrazioni (con autorizzazione).
- Testimonianze reali autorizzate.
- Dettagli Backup e Antivirus/sicurezza (soluzioni, modalità).
- Descrizioni estese CPEW, Gest Rent, Videoperizia, Gest Park Web (differenze con Gest Park).
- Orari assistenza, email assistenza dedicata, URL download, strumenti di assistenza remota verificati.
- Date delle fasi storiche intermedie, informativa privacy/cookie, note legali.
- Articoli knowledge base e changelog reali.

## Interazioni simulate
- Risposte dell'Assistente (intent per parole chiave; scrivere "simula errore" mostra lo stato di errore).
- Live Chat: collegamento operatore, coda, messaggi operatore, allegati (solo nome file), stato disponibilità (selettore "Simula stato").
- Form offline, form contatti (scrivere "errore" nel messaggio / oggetto per lo stato di errore): nessun dato viene inviato.
- Ricerca knowledge base e catalogo: filtri client-side su dati locali.
- Download: disattivati.

## Arricchimento visivo (fase 02b)
- **Nuovi componenti:** `AppMock` (mockup UI riutilizzabili: park, sheet, crash, gest, video, dash, invoice), `image-slot` (segnaposto immagini con drag-and-drop). `ProductCard` ora include un'anteprima UI.
- **Home:** hero con 5 livelli (Gest Park, Gest Crash, GEST, 2 chip in vetro), griglia, orb ambient animati, gradiente che segue il cursore; Chi siamo con foto + card vetro; ecosistema a bento con anteprime; settori con immagine che cambia + mockup; spotlight Gest Park con due schermate in prospettiva; schema integrazioni; testimonianza con foto; news con thumbnail; anteprima chat; CTA con mockup.
- **Software:** hero split con composizione di 3 mockup, gradiente cursore, chip settore rapidi, filtro più marcato, anteprime nelle card.
- **Prodotto:** hero a due livelli, tab con mockup per funzionalità, nuova galleria a carosello 3D (sezione Interfaccia).
- **Azienda:** banda editoriale con 2 foto + mockup, card mappa stilizzata nei contatti.
- **Servizi:** ogni servizio con foto + pannello UI sovrapposto + bagliore.
- **Assistenza:** hero con card chat flottanti e gradiente cursore, nuova sezione Assistente / Live chat con stati.
- **Motion:** cursor-follow glow (lerp, solo pointer fine, off con reduced-motion), orb lenti 26–36s, image reveal con clip-path (`data-reveal-img`), parallax multi-livello, hover glow su CTA, transizioni di cambio settore/tab/galleria.
- **Segnaposto da sostituire:** tutti gli `AppMock` (badge "Anteprima illustrativa" / "Screenshot da fornire") → screenshot reali; tutti gli `image-slot` (foto settori, team, sede, servizi, news, testimonianza) → immagini approvate; card mappa → mappa reale (es. embed).

## Note per Claude Code
- Next.js App Router + TypeScript + Tailwind; token da `tokens/tokens.css` → `tailwind.config`.
- `cs-core.js` è il modello dati: `products`, `sectors`, `services`, `config.contacts` → tipi TS e fetch da Cedi Platform (ISR / revalidate).
- `Prodotto` → `app/software/[slug]/page.tsx`; sezioni condizionali su dati disponibili (features, integrations, related, faq, changelog).
- CediAssist → client component con store (Zustand) e adapter: `AIProvider` e `LiveChatProvider` (API di messaggistica). Mantenere un solo launcher nel layout root; persistenza in sessionStorage.
- shadcn/ui: Tabs, Accordion, Select, Checkbox, Dialog/Sheet (chat mobile full-screen), Toast. Motion for React per reveal, transizioni pagina, parallax hero (disattivare con `useReducedMotion` e sotto 900px).
- Validazione form con zod + react-hook-form; endpoint reali da definire.
