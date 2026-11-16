import type { Service } from '../types';

/**
 * `verified: false` = contenuto ancora da confermare con Cedi Soft: le pagine pubbliche lo filtrano,
 * così nessun servizio non confermato viene presentato come disponibile.
 */
export const services: Service[] = [
  { slug: 'fatturazione', name: 'Fatturazione elettronica', icon: 'receipt-text', verified: true,
    description: 'Compilazione, firma digitale e trasmissione delle fatture verso PA e B2B, anche per il ciclo passivo.',
    benefits: ['Firma digitale e trasmissione', 'Gestione di notifiche e ricevute del Sistema di Interscambio', 'Conservazione sostitutiva di fatture e ricevute', 'Disponibile anche per chi usa altri gestionali'] },
  { slug: 'backup', name: 'Backup', icon: 'database', verified: false,
    description: 'Copie di sicurezza dei dati gestionali, per proteggere il lavoro quotidiano da guasti ed errori.',
    benefits: ['Supporto nel ripristino dei dati'] },
  { slug: 'sicurezza', name: 'Antivirus e sicurezza informatica', icon: 'shield-check', verified: false,
    description: 'Protezione delle postazioni di lavoro e consulenza sulle buone pratiche di sicurezza.',
    benefits: ['Configurazione sulle postazioni', 'Consulenza sulle buone pratiche'] },
  { slug: 'assistenza', name: 'Assistenza tecnica', icon: 'headset', verified: true,
    description: 'Supporto sui software Cedi Soft da parte di chi li sviluppa.',
    benefits: ['Supporto diretto sui prodotti', 'Bacheca aggiornamenti nei software'] },
  { slug: 'sviluppo', name: 'Sviluppo software personalizzato e integrazioni', icon: 'code-xml', verified: true,
    description: 'Software progettato attorno ai processi della tua azienda e integrazione con i sistemi già in uso.',
    benefits: ['Analisi delle esigenze operative', 'Sviluppo di applicazioni desktop e web', 'Integrazione con gestionali e servizi esterni'] },
];
