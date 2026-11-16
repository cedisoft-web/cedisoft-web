/**
 * Redirect delle vecchie pagine WordPress di www.cedisoft.it verso le nuove rotte.
 * Elenco ricavato dalla navigazione pubblica del sito attuale (nov 2026): da completare con
 * l'export reale degli URL indicizzati (Search Console / sitemap WordPress) prima del cambio DNS.
 * Next.js normalizza già lo slash finale (/azienda/ → /azienda).
 */
export interface RedirectRule { source: string; destination: string; permanent: boolean }

const platformUrl = (process.env.NEXT_PUBLIC_PLATFORM_URL ?? 'http://localhost:3000').replace(/\/+$/, '');

export const redirects: RedirectRule[] = [
  // Sezioni principali
  { source: '/prodotti', destination: '/software', permanent: true },
  { source: '/contatti', destination: '/azienda#contatti', permanent: true },
  { source: '/smartworking-connessione-remota', destination: '/assistenza', permanent: true },

  // Schede prodotto (portfolio-item): solo Gest Park ha una pagina di dettaglio, gli altri puntano al catalogo
  { source: '/portfolio-item/gest-park-2', destination: '/software/gest-park', permanent: true },
  { source: '/portfolio-item/gest-2-2', destination: '/software#gest', permanent: true },
  { source: '/portfolio-item/cpew1', destination: '/software#gest-crash-cpew', permanent: true },
  { source: '/portfolio-item/gest-crash-carw', destination: '/software#gest-crash-carw', permanent: true },
  { source: '/portfolio-item/gest-crash-cpa', destination: '/software#gest-crash-cpa', permanent: true },
  { source: '/portfolio-item/gest-rent', destination: '/software#gest-rent', permanent: true },
  { source: '/portfolio-item/eseboll', destination: '/software#eseboll', permanent: true },
  { source: '/portfolio-item/stiltocco-2', destination: '/software#stiltocco', permanent: true },
  { source: '/portfolio-item/videoperizia-online', destination: '/software#videoperizia', permanent: true },

  // Servizi
  { source: '/prodotti/sviluppo-e-realizzazione-siti-web', destination: '/servizi#sviluppo', permanent: true },
  { source: '/prodotti/cloud', destination: '/software/gest-park', permanent: true },
  { source: '/prodotti/antivirus', destination: '/servizi', permanent: true },
  { source: '/prodotti/backup', destination: '/servizi', permanent: true },

  // Area riservata → login della Cedi Platform (nessuna autenticazione duplicata)
  { source: '/area-riservata', destination: `${platformUrl}/login`, permanent: true },

  // Pagine non ancora presenti nel nuovo sito: temporanei, da trasformare quando esisteranno
  { source: '/news', destination: '/', permanent: false },
];
