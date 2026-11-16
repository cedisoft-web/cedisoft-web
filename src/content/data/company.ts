import type { CompanyProfile, Contacts } from '../types';

// Verificati su cedisoft.it (footer "Contatti"). Da riconfermare prima della pubblicazione.
export const contacts: Contacts = {
  company: 'Cedi Soft srl',
  address: 'Piazza Rotelli 4, 04028 Scauri (LT), Italia',
  phones: [
    { label: '0771 681680', href: 'tel:+390771681680' },
    { label: '0771 680866', href: 'tel:+390771680866' },
  ],
  email: 'cedi@cedisoft.it',
  vat: 'P. IVA 02307450599',
};

export const tagline =
  'Software house italiana dal 1989. Sviluppiamo soluzioni gestionali e piattaforme digitali per aziende e professionisti.';

// Contenuti dal prototipo approvato. Solo tappe documentate da fonti pubbliche; le fasi senza data verificata lo dichiarano.
export const companyProfile: CompanyProfile = {
  story: [
    { icon: 'calendar', title: 'Dal 1989', text: 'Oltre trent’anni di sviluppo software, con sede a Scauri (LT).' },
    { icon: 'code-xml', title: 'Sviluppo interno', text: 'Progettiamo e sviluppiamo direttamente i nostri software gestionali e le applicazioni web.' },
    { icon: 'layers', title: 'Multi-settore', text: 'Automotive, carrozzerie, periti, autonoleggio, contabilità e personalizzazione.' },
    { icon: 'workflow', title: 'Conoscenza dei processi', text: 'I nostri software nascono dalle esigenze pratiche di chi li usa ogni giorno.' },
    { icon: 'users', title: 'Attenzione al cliente', text: 'Soluzioni che rispondono a bisogni reali e aiutano a lavorare meglio.' },
    { icon: 'cloud', title: 'Evoluzione continua', text: 'Dal desktop al cloud, fino alle nuove applicazioni web come Gest Park Web.' },
  ],
  timeline: [
    { year: '1989', title: 'Nasce Cedi Soft', text: 'Inizia l’attività di sviluppo di software e applicazioni per le imprese.', source: 'Fonte: datgroup.com', verified: true },
    { year: 'Fase', title: 'I software verticali', text: 'Nascono i gestionali per autosaloni, carrozzerie, periti, noleggio e contabilità: Gest Park, Gest Crash, Gest Rent, GEST.', source: 'Data da verificare', verified: false },
    { year: '2017', title: 'Software in cloud e Stiltocco', text: 'I software diventano disponibili anche su piattaforma cloud. Al VisCom 2017 viene presentato in anteprima Stiltocco.', source: 'Fonte: cedisoft.it', verified: true },
    { year: '2020', title: 'Partnership con DAT Italia', text: 'Un accordo per integrare base dati e valutazione dell’usato nel gestionale Gest Park.', source: 'Fonte: datgroup.com', verified: true },
    { year: 'Oggi', title: 'Nuove applicazioni web', text: 'Gest Park Web è in fase di test: la nuova generazione dei software Cedi Soft.', source: 'In corso', verified: true },
  ],
  values: [
    { icon: 'shield-check', title: 'Affidabilità', text: 'Software stabili, su cui contare ogni giorno di lavoro.' },
    { icon: 'lightbulb', title: 'Innovazione', text: 'Nuove tecnologie adottate quando portano un vantaggio concreto.' },
    { icon: 'graduation-cap', title: 'Competenza', text: 'Conoscenza tecnica e dei settori in cui operano i clienti.' },
    { icon: 'handshake', title: 'Vicinanza al cliente', text: 'Ascolto e supporto diretto, da chi sviluppa il software.' },
    { icon: 'trending-up', title: 'Evoluzione tecnologica', text: 'Prodotti che crescono con il mercato e con chi li usa.' },
  ],
  phases: [
    { icon: 'messages-square', title: 'Analisi delle esigenze', text: 'Ascoltiamo come lavori, quali attività vuoi semplificare e quali strumenti usi già.', items: ['Incontro con chi usa il software ogni giorno', 'Raccolta dei requisiti operativi', 'Definizione delle priorità'] },
    { icon: 'code-xml', title: 'Sviluppo', text: 'Realizziamo il software o adattiamo un nostro prodotto, mantenendo il confronto con te.', items: ['Applicazioni desktop e web', 'Integrazione con i sistemi esistenti', 'Verifiche durante lo sviluppo'] },
    { icon: 'rocket', title: 'Avvio', text: 'Accompagniamo l’installazione e l’avvio del software nella tua attività.', items: ['Installazione in locale o in cloud', 'Primo utilizzo guidato', 'Configurazione sui tuoi dati'] },
    { icon: 'refresh-cw', title: 'Assistenza ed evoluzione', text: 'Dopo il rilascio restiamo al tuo fianco con assistenza e aggiornamenti.', items: ['Assistenza tecnica sui prodotti', 'Aggiornamenti pubblicati nel software', 'Nuove funzioni nate dall’uso reale'] },
  ],
};
