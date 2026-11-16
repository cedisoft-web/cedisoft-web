import type { ProductDetail } from '../types';

/**
 * Schede estese. Fonte: prototipo Claude Design + cedisoft.it, da riconfermare.
 * Le frasi segnate "da confermare" nel prototipo NON sono qui: si aggiungono quando Cedi Soft le approva.
 */
export const productDetails: Record<string, ProductDetail> = {
  'gest-park': {
    value: 'Il gestionale per autosaloni che segue la vendita di veicoli nuovi e usati, il noleggio e le pratiche auto in un unico software.',
    chips: [
      { icon: 'cloud', title: 'Disponibile in cloud', subtitle: 'Tutte le funzionalità, ovunque' },
      { icon: 'scan-search', title: 'Interrogazione targhe' },
    ],
    overview: {
      title: 'Pensato per concessionarie e rivendite di auto, dalle più piccole alle più grandi.',
      text: 'Gest Park è sviluppato sulle esigenze pratiche di chi lavora in autosalone. Riunisce in un solo strumento la gestione del parco veicoli, delle vendite e delle attività collegate, e può essere utilizzato anche su piattaforma cloud.',
      points: [
        'Vendite di nuovo e usato in un unico flusso',
        'Noleggio e pratiche auto gestiti separatamente',
        'Accesso al software anche fuori dall’ufficio',
      ],
    },
    features: [
      {
        icon: 'car-front', title: 'Vendita veicoli', summary: 'Nuovo e usato, dalla scheda al contratto.',
        body: 'Gest Park nasce per la gestione completa della vendita di veicoli nuovi e usati.',
        items: [
          { title: 'Parco veicoli', text: 'Gestione del parco veicoli in vendita, nuovi e usati.' },
          { title: 'Valutazione dell’usato', text: 'Grazie alla partnership con DAT Italia, il gestionale si collega a base dati e valutazione dell’usato per creare schede veicolo complete.' },
        ],
      },
      {
        icon: 'key-round', title: 'Noleggio e pratiche auto', summary: 'Gestioni separate nello stesso software.',
        body: 'Con Gest Park puoi gestire anche l’attività di noleggio o di pratiche auto, attraverso gestioni separate presenti all’interno del software.',
        items: [],
      },
      {
        icon: 'cloud', title: 'Utilizzo in cloud', summary: 'L’intero software, non una app ridotta.',
        body: 'Gest Park può essere installato su piattaforma cloud per utilizzarlo ovunque, con tutte le sue funzionalità.',
        items: [
          { title: 'Nessun PC performante richiesto', text: 'Il software lavora in cloud, quindi non servono postazioni particolarmente potenti.' },
          { title: 'Account', text: 'Se il software non viene usato in contemporanea da più utenti non è necessario acquistare nuovi account.' },
          { title: 'Accesso riservato', text: 'Non essendo installato sul PC, il software è accessibile solo dal gestore.' },
        ],
      },
      {
        icon: 'file-check-2', title: 'Esenzione bollo', summary: 'Modulo ESEBOLL integrato.',
        body: 'ESEBOLL è il modulo di Gest Park per la gestione dei veicoli in esenzione bollo, con trasmissione telematica dei dati.',
        items: [{ title: 'Trasmissione telematica', text: 'Trasmissione dei dati semplificata e a norma di legge.' }],
      },
    ],
    integrations: [
      { name: 'Eurotax', text: 'Interrogazione targhe collegata direttamente con l’anagrafica Eurotax.' },
      { name: 'DAT Italia', text: 'Base dati e valutazione dell’usato, dalla partnership siglata nel 2020.' },
      { name: 'Seasoft', text: 'Trasferimento delle operazioni contabili direttamente sul software per la fatturazione.' },
      { name: 'Zucchetti', text: 'Gestione delle fatture e importazione dei dati.' },
    ],
    faq: [
      { question: 'Gest Park si può usare in cloud?', answer: 'Sì. Gest Park può essere installato su piattaforma cloud e utilizzato ovunque con tutte le sue funzionalità.' },
      { question: 'Gest Park gestisce anche noleggio e pratiche auto?', answer: 'Sì, attraverso gestioni separate presenti all’interno del software.' },
      { question: 'Come posso richiedere una demo?', answer: 'Scrivici dalla pagina Contatti indicando Gest Park come software di interesse.' },
    ],
    relatedSlugs: ['gest-park-web', 'eseboll'],
  },
};
