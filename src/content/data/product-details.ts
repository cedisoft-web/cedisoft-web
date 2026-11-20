import type { ProductDetail } from '../types';

/**
 * Schede estese. Fonte: prototipo Claude Design + cedisoft.it, da riconfermare.
 * Le frasi segnate "da confermare" nel prototipo NON sono qui: si aggiungono quando Cedi Soft le approva.
 */
export const productDetails: Record<string, ProductDetail> = {
  'gest-park': {
    value: 'Il gestionale per autosaloni: parco auto, vendite, preventivi, fatturazione e contabilità in un unico software, in locale o in cloud.',
    chips: [
      { icon: 'cloud', title: 'In locale o in cloud', subtitle: 'Tutte le funzionalità, ovunque' },
      { icon: 'scan-search', title: 'Interrogazione targhe' },
    ],
    overview: {
      title: 'Dal veicolo in ingresso alla fattura di vendita, tutto nello stesso posto.',
      text: 'Gest Park è sviluppato sulle esigenze pratiche di chi lavora in autosalone. Riunisce la gestione del parco veicoli, delle vendite e dell’amministrazione in un solo strumento, sempre allineato, utilizzabile anche in cloud.',
      points: [
        'Veicoli nuovi e usati in un unico flusso',
        'Costi, margine e utile di ogni veicolo in tempo reale',
        'Fatturazione e contabilità senza doppi inserimenti',
      ],
    },
    features: [
      {
        icon: 'car-front', title: 'Parco auto e stock', summary: 'Ogni veicolo, con la sua scheda completa.',
        body: 'Ogni veicolo ha una scheda con dati tecnici, stato, documenti, foto e dati amministrativi. Puoi inserire i veicoli a mano oppure importarli in blocco dall’elenco del fornitore.',
        items: [
          { title: 'Inserimento manuale o multiplo', text: 'Una scheda alla volta, oppure più veicoli insieme da elenco fornitore.' },
          { title: 'Dati tecnici e valutazioni', text: 'Dati tecnici da Infocar, accessori e valutazioni da Eurotax e DAT Italia.' },
          { title: 'Amministrazione del veicolo', text: 'Carico e scarico, fornitore, documenti e centro di costo, con la visualizzazione in tempo reale di costi, utile e dettagli economici.' },
          { title: 'Gestione stock', text: 'Lotti di veicoli con modifiche multiple su fornitore, data di arrivo e riferimenti d’ordine.' },
        ],
      },
      {
        icon: 'handshake', title: 'Vendita e contratti', summary: 'Dal preventivo al contratto.',
        body: 'Prepara preventivi completi e trasformali in contratti, con anagrafiche di clienti e fornitori sempre a portata di mano.',
        items: [
          { title: 'Preventivi', text: 'Veicoli disponibili o fuori parco, voci extra, permuta e piano dei pagamenti.' },
          { title: 'Contratti', text: 'Creazione e gestione del contratto di vendita collegato al veicolo.' },
          { title: 'Anagrafica clienti e fornitori', text: 'Archivio unico con scheda cliente, contratti, ordini e contatti.' },
        ],
      },
      {
        icon: 'receipt-text', title: 'Fatturazione e contabilità', summary: 'Amministrazione integrata nel gestionale.',
        body: 'Fatture attive e passive, prima nota e contabilità nello stesso software che gestisce il parco auto: ogni dato nasce una volta sola.',
        items: [
          { title: 'Fatturazione attiva e passiva', text: 'Con collegamento a un intermediario autorizzato, Tosnet.' },
          { title: 'Prima nota e conti correnti', text: 'Registrazioni, conti correnti e libro giornale.' },
          { title: 'Registri IVA e bilancio', text: 'Registri IVA, liquidazione e bilancio di verifica.' },
        ],
      },
      {
        icon: 'chart-column', title: 'Statistiche', summary: 'Numeri per decidere.',
        body: 'Statistiche su inventario, vendite e acquisti, per capire cosa rende e cosa è fermo.',
        items: [
          { title: 'Inventario e vendite', text: 'Esistenze, vendite e report sulle vendite.' },
          { title: 'Acquisti, finanziamenti e permute', text: 'Acquisti dai fornitori, finanziamenti e permute.' },
        ],
      },
      {
        icon: 'file-check-2', title: 'Esenzione bollo', summary: 'Modulo ESEBOLL integrato.',
        body: 'ESEBOLL è il modulo di Gest Park per la gestione dei veicoli in esenzione bollo, con trasmissione telematica dei dati.',
        items: [{ title: 'Trasmissione telematica', text: 'Trasmissione dei dati semplificata e a norma di legge.' }],
      },
      {
        icon: 'key-round', title: 'Noleggio e carrozzeria', summary: 'Un ecosistema, non un software isolato.',
        body: 'Gest Park si collega agli altri software Cedi Soft: i veicoli restano sincronizzati tra le diverse piattaforme.',
        items: [
          { title: 'GestRent', text: 'Abilita il noleggio con gestione integrata e sincronizzazione dei veicoli tra le due piattaforme.' },
          { title: 'GestCrash', text: 'Collegamento con il software dei carrozzieri, con dati sincronizzati.' },
        ],
      },
      {
        icon: 'cloud', title: 'In locale o in cloud', summary: 'L’intero software, non una app ridotta.',
        body: 'Gest Park può essere installato in locale oppure su piattaforma cloud, per utilizzarlo ovunque con tutte le sue funzionalità.',
        items: [
          { title: 'Nessun PC performante richiesto', text: 'Il software lavora in cloud, quindi non servono postazioni particolarmente potenti.' },
          { title: 'Account', text: 'Se il software non viene usato in contemporanea da più utenti non è necessario acquistare nuovi account.' },
          { title: 'Accesso riservato', text: 'Non essendo installato sul PC, il software è accessibile solo dal gestore.' },
        ],
      },
    ],
    integrations: [
      { name: 'Infocar', text: 'Dati tecnici dei veicoli per compilare le schede.' },
      { name: 'Eurotax', text: 'Interrogazione targhe collegata direttamente con l’anagrafica Eurotax.' },
      { name: 'DAT Italia', text: 'Base dati e valutazione dell’usato, dalla partnership siglata nel 2020.' },
      { name: 'Tosnet', text: 'Intermediario autorizzato per la fatturazione elettronica.' },
      { name: 'Seasoft', text: 'Trasferimento delle operazioni contabili direttamente sul software per la fatturazione.' },
      { name: 'Zucchetti', text: 'Gestione delle fatture e importazione dei dati.' },
    ],
    faq: [
      { question: 'Gest Park si può usare in cloud?', answer: 'Sì. Gest Park può essere installato in locale oppure su piattaforma cloud e utilizzato ovunque con tutte le sue funzionalità.' },
      { question: 'Posso inserire più veicoli insieme?', answer: 'Sì. Oltre all’inserimento manuale di una scheda alla volta, puoi caricare più veicoli dall’elenco del fornitore.' },
      { question: 'Gest Park gestisce anche la fatturazione e la contabilità?', answer: 'Sì: fatture attive e passive, prima nota, conti correnti, libro giornale, registri IVA e bilancio di verifica.' },
      { question: 'Si collega a GestRent e GestCrash?', answer: 'Sì. Con GestRent abiliti il noleggio e sincronizzi i veicoli tra le due piattaforme; con GestCrash ti colleghi al software dei carrozzieri.' },
      { question: 'Come posso richiedere una demo?', answer: 'Dal pulsante “Richiedi una demo” in questa pagina: indicaci Gest Park come software di interesse e ti contatteremo.' },
    ],
    relatedSlugs: ['gest-rent', 'gest-crash-carw', 'eseboll'],
  },
};
