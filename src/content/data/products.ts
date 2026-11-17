import type { Product, Sector } from '../types';

export const sectors: Sector[] = [
  { id: 'automotive', label: 'Automotive', icon: 'car-front' },
  { id: 'carrozzerie', label: 'Carrozzerie', icon: 'wrench' },
  { id: 'periti', label: 'Periti', icon: 'clipboard-check' },
  { id: 'autonoleggio', label: 'Autonoleggio', icon: 'key-round' },
  { id: 'amministrazione', label: 'Amministrazione e contabilità', icon: 'calculator' },
  { id: 'altre', label: 'Altre attività', icon: 'shapes' },
];

// Descrizioni dal prototipo (parafrasi del sito attuale). `status` solo dove noto.
export const products: Product[] = [
  { slug: 'gest-park', name: 'Gest Park', category: 'Autosaloni', sectors: ['automotive'], icon: 'car-front', featured: true, hasDetailPage: true,
    description: 'Il gestionale per autosaloni, in locale o in cloud, per gestire in modo completo la vendita di veicoli nuovi e usati.' },
  { slug: 'gest-park-web', name: 'Gest Park Web', category: 'Autosaloni', sectors: ['automotive'], icon: 'globe', status: { label: 'Beta', note: 'In fase di test' }, hasDetailPage: false,
    description: 'La nuova piattaforma per CRM e creazione del sito web, nello stesso ambiente di Gest Park. Attualmente in fase di test.' },
  { slug: 'gest-crash-carw', name: 'Gest Crash CARW', category: 'Carrozzerie e officine', sectors: ['carrozzerie', 'automotive'], icon: 'wrench', featured: true, hasDetailPage: false,
    description: 'Software per carrozzerie e officine: dal calcolo dei preventivi alla gestione della contabilità.' },
  { slug: 'gest-crash-cpew', name: 'Gest Crash CPEW', category: 'Periti assicurativi', sectors: ['periti'], icon: 'clipboard-check', hasDetailPage: false,
    description: 'Software per periti assicurativi.' },
  { slug: 'gest-crash-cpa', name: 'Gest Crash CPA', category: 'Periti di parte', sectors: ['periti'], icon: 'scale', hasDetailPage: false,
    description: 'Gestionale per periti di parte: dalla ricezione degli incarichi agli appuntamenti, fino allo sviluppo della perizia.' },
  { slug: 'gest-rent', name: 'Gest Rent', category: 'Noleggio veicoli', sectors: ['autonoleggio', 'automotive'], icon: 'key-round', hasDetailPage: false,
    description: 'Software per la gestione del noleggio di veicoli.' },
  { slug: 'gest', name: 'GEST', category: 'Contabilità e magazzino', sectors: ['amministrazione'], icon: 'calculator', featured: true, hasDetailPage: false,
    description: 'Contabilità, vendita al banco e gestione del magazzino per attività commerciali e professionali.' },
  { slug: 'eseboll', name: 'ESEBOLL', category: 'Esenzione bollo', sectors: ['automotive'], icon: 'file-check-2', moduleOf: 'gest-park', hasDetailPage: false,
    description: 'Gestione dei veicoli in esenzione bollo con trasmissione telematica dei dati. Modulo di Gest Park.' },
  { slug: 'stiltocco', name: 'Stiltocco', category: 'Personalizzazione', sectors: ['altre'], icon: 'shirt', hasDetailPage: false,
    description: 'Per chi personalizza abbigliamento, gadget e oggettistica: il cliente sceglie capo e grafica da un monitor touch in negozio.' },
  { slug: 'videoperizia', name: 'Videoperizia Online', category: 'Perizie a distanza', sectors: ['periti', 'automotive'], icon: 'video', hasDetailPage: false,
    description: 'Permette ai periti di svolgere perizie a distanza, senza spostarsi dall’ufficio.' },
];
