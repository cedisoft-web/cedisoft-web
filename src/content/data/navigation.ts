import type { FooterColumn, MegaGroup, NavLink } from '../types';

export const mainLinks: NavLink[] = [
  { label: 'Servizi', href: '/servizi' },
  { label: 'Azienda', href: '/azienda' },
  { label: 'Assistenza', href: '/assistenza' },
  { label: 'Contatti', href: '/azienda#contatti' },
];

export const megaGroups: MegaGroup[] = [
  { label: 'Automotive', productSlugs: ['gest-park', 'gest-park-web', 'eseboll', 'gest-rent'] },
  { label: 'Carrozzerie e periti', productSlugs: ['gest-crash-carw', 'gest-crash-cpew', 'gest-crash-cpa', 'videoperizia'] },
  { label: 'Gestione e altro', productSlugs: ['gest', 'stiltocco'] },
];

/** Voci non ancora pubblicabili: mostrate come "presto", senza link a pagine vuote. */
export const soonLinks: NavLink[] = [
  { label: 'News', href: '/news', icon: 'newspaper', soon: true },
  { label: 'Changelog', href: '/changelog', icon: 'git-commit-horizontal', soon: true },
];

export const footerColumns: FooterColumn[] = [
  { title: 'Servizi', links: [
    { label: 'Fatturazione elettronica', href: '/servizi#fatturazione' },
    { label: 'Assistenza tecnica', href: '/servizi#assistenza' },
    { label: 'Sviluppo su misura', href: '/servizi#sviluppo' },
  ] },
  { title: 'Azienda', links: [
    { label: 'Chi siamo', href: '/azienda' },
    { label: 'La nostra storia', href: '/azienda#storia' },
    { label: 'Metodo di lavoro', href: '/azienda#metodo' },
    { label: 'Contatti', href: '/azienda#contatti' },
  ] },
  { title: 'Assistenza', links: [
    { label: 'Support Center', href: '/assistenza' },
  ] },
];

/** Pagine legali: testi da fornire (privacy, cookie, note legali). Non linkate finché non esistono. */
export const legalLabels = ['Privacy policy', 'Cookie policy', 'Note legali'];
