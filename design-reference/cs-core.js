// Cedi Soft website prototype — shared content model, routes, support-chat store, UI helpers.
// Everything is demonstrative: no real backend, AI, ticketing or authentication.
// In production: content from Cedi Platform APIs, chat via a messaging/support API.
(function () {
  if (window.CS) return;

  // Verified from www.cedisoft.it (footer "Contatti"). Re-confirm before publishing.
  const config = {
    contacts: {
      company: 'Cedi Soft srl',
      address: 'Piazza Rotelli 4, 04028 Scauri (LT), Italia',
      phones: ['0771 681680', '0771 680866'],
      phoneHrefs: ['tel:+390771681680', 'tel:+390771680866'],
      email: 'cedi@cedisoft.it',
      vat: 'P. IVA 02307450599',
      source: 'Fonte: cedisoft.it · da riconfermare prima della pubblicazione'
    }
  };

  const routes = {
    home: 'Home.dc.html',
    azienda: 'Azienda.dc.html',
    contatti: 'Azienda.dc.html#contatti',
    software: 'Software.dc.html',
    servizi: 'Servizi.dc.html',
    assistenza: 'Assistenza.dc.html',
    lab: 'Cedi Soft UI Lab.dc.html'
  };
  const productHref = (id) => 'Prodotto.dc.html?p=' + id;

  const sectors = [
    { id: 'all', label: 'Tutti' },
    { id: 'automotive', label: 'Automotive', icon: 'car-front' },
    { id: 'carrozzerie', label: 'Carrozzerie', icon: 'wrench' },
    { id: 'periti', label: 'Periti', icon: 'clipboard-check' },
    { id: 'autonoleggio', label: 'Autonoleggio', icon: 'key-round' },
    { id: 'amministrazione', label: 'Amministrazione e contabilità', icon: 'calculator' },
    { id: 'altre', label: 'Altre attività', icon: 'shapes' }
  ];

  // Descriptions paraphrase the current public site. `status` only where known.
  const products = [
    { id: 'gest-park', name: 'Gest Park', category: 'Autosaloni', sectors: ['automotive'], icon: 'car-front', featured: true, detail: true,
      desc: 'Gestionale per autosaloni, per gestire in modo completo la vendita di veicoli nuovi e usati.' },
    { id: 'gest-park-web', name: 'Gest Park Web', category: 'Autosaloni', sectors: ['automotive'], icon: 'globe', status: 'Beta', statusNote: 'In fase di test',
      desc: 'La versione web di Gest Park, attualmente in fase di test.' },
    { id: 'gest-crash-carw', name: 'Gest Crash CARW', category: 'Carrozzerie e officine', sectors: ['carrozzerie', 'automotive'], icon: 'wrench', featured: true,
      desc: 'Software per carrozzerie e officine: dal calcolo dei preventivi alla gestione della contabilità.' },
    { id: 'gest-crash-cpew', name: 'Gest Crash CPEW', category: 'Periti assicurativi', sectors: ['periti'], icon: 'clipboard-check',
      desc: 'Software per periti assicurativi.' },
    { id: 'gest-crash-cpa', name: 'Gest Crash CPA', category: 'Periti di parte', sectors: ['periti'], icon: 'scale',
      desc: 'Gestionale per periti di parte: dalla ricezione degli incarichi agli appuntamenti, fino allo sviluppo della perizia.' },
    { id: 'gest-rent', name: 'Gest Rent', category: 'Noleggio veicoli', sectors: ['autonoleggio', 'automotive'], icon: 'key-round',
      desc: 'Software per la gestione del noleggio di veicoli.' },
    { id: 'gest', name: 'GEST', category: 'Contabilità e magazzino', sectors: ['amministrazione'], icon: 'calculator', featured: true,
      desc: 'Contabilità, vendita al banco e gestione del magazzino per attività commerciali e professionali.' },
    { id: 'eseboll', name: 'ESEBOLL', category: 'Esenzione bollo', sectors: ['automotive'], icon: 'file-check-2', moduleOf: 'gest-park',
      desc: 'Gestione dei veicoli in esenzione bollo con trasmissione telematica dei dati. Modulo di Gest Park.' },
    { id: 'stiltocco', name: 'Stiltocco', category: 'Personalizzazione', sectors: ['altre'], icon: 'shirt',
      desc: 'Per chi personalizza abbigliamento, gadget e oggettistica: il cliente sceglie capo e grafica da un monitor touch in negozio.' },
    { id: 'videoperizia', name: 'Videoperizia Online', category: 'Perizie a distanza', sectors: ['periti', 'automotive'], icon: 'video',
      desc: 'Permette ai periti di svolgere perizie a distanza, senza spostarsi dall’ufficio.' }
  ].map(p => Object.assign({ href: productHref(p.id), sectorLabels: p.sectors.map(s => (sectors.find(x => x.id === s) || {}).label) }, p));

  const services = [
    { id: 'fatturazione', icon: 'receipt-text', name: 'Fatturazione elettronica', verified: true,
      desc: 'Compilazione, firma digitale e trasmissione delle fatture verso PA e B2B, anche per il ciclo passivo.',
      benefits: ['Firma digitale e trasmissione', 'Gestione di notifiche e ricevute del Sistema di Interscambio', 'Conservazione sostitutiva di fatture e ricevute', 'Disponibile anche per chi usa altri gestionali'] },
    { id: 'backup', icon: 'database-backup', name: 'Backup', verified: false,
      desc: 'Copie di sicurezza dei dati gestionali, per proteggere il lavoro quotidiano da guasti ed errori.',
      benefits: ['[Modalità di backup — da confermare]', '[Frequenza e conservazione — da confermare]', 'Supporto nel ripristino dei dati'] },
    { id: 'sicurezza', icon: 'shield-check', name: 'Antivirus e sicurezza informatica', verified: false,
      desc: 'Protezione delle postazioni di lavoro e consulenza sulle buone pratiche di sicurezza.',
      benefits: ['[Soluzioni antivirus proposte — da confermare]', 'Configurazione sulle postazioni', 'Consulenza sulle buone pratiche'] },
    { id: 'assistenza', icon: 'headset', name: 'Assistenza tecnica', verified: true,
      desc: 'Supporto sui software Cedi Soft da parte di chi li sviluppa, anche da remoto.',
      benefits: ['Supporto diretto sui prodotti', 'Bacheca aggiornamenti nei software', 'Intervento da remoto, se verificato'] },
    { id: 'sviluppo', icon: 'code-xml', name: 'Sviluppo software personalizzato e integrazioni', verified: true,
      desc: 'Software progettato attorno ai processi della tua azienda e integrazione con i sistemi già in uso.',
      benefits: ['Analisi delle esigenze operative', 'Sviluppo di applicazioni desktop e web', 'Integrazione con gestionali e servizi esterni'] }
  ];

  // ---------- Toast ----------
  function toast(text, kind) {
    let host = document.getElementById('cs-toasts');
    if (!host) { host = document.createElement('div'); host.id = 'cs-toasts'; host.setAttribute('role', 'status'); host.setAttribute('aria-live', 'polite'); host.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:9999;display:flex;flex-direction:column;gap:8px;align-items:center;pointer-events:none'; document.body.appendChild(host); }
    const el = document.createElement('div');
    const c = kind === 'error' ? ['#FDEEEF', '#A82A33', 'circle-alert'] : kind === 'success' ? ['#EEF8EE', '#236F28', 'circle-check'] : ['#192C58', '#FFFFFF', 'info'];
    el.style.cssText = 'display:flex;align-items:center;gap:10px;max-width:min(92vw,520px);padding:12px 16px;border-radius:14px;background:' + c[0] + ';color:' + c[1] + ';font:500 14px/1.45 Geist,Inter,system-ui,sans-serif;box-shadow:0 18px 40px -18px rgba(25,44,88,.5);transition:opacity 320ms,transform 320ms;opacity:0;transform:translateY(10px)';
    el.innerHTML = '<cs-icon name="' + c[2] + '" size="17"></cs-icon><span></span>';
    el.querySelector('span').textContent = text;
    host.appendChild(el);
    requestAnimationFrame(() => { el.style.opacity = '1'; el.style.transform = 'none'; });
    setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(6px)'; setTimeout(() => el.remove(), 340); }, 3600);
  }
  const soon = (label) => (e) => { if (e && e.preventDefault) e.preventDefault(); toast('«' + label + '» non è ancora disponibile in questo prototipo.'); };

  // ---------- Support chat store (AI assistant + Live Chat, one shell) ----------
  const AKEY = 'cs.assist.v2';
  const now = () => { const d = new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };
  let uid = Date.now();
  const mid = () => 'm' + (uid++);
  const fresh = () => ({ open: false, view: 'home', unread: 1, status: 'available',
    ai: { messages: [], typing: false },
    live: { phase: 'idle', messages: [], typing: false, queue: 0, carried: 0 } });
  let A;
  try { A = Object.assign(fresh(), JSON.parse(sessionStorage.getItem(AKEY) || '{}')); } catch (e) { A = fresh(); }
  A.ai.typing = false; A.live.typing = false;
  if (A.live.phase === 'connecting' || A.live.phase === 'queue') A.live.phase = 'idle';
  const subs = new Set();
  let timers = [];
  const emit = () => { try { sessionStorage.setItem(AKEY, JSON.stringify(A)); } catch (e) {} subs.forEach(f => f(A)); };
  const set = (p) => { A = Object.assign({}, A, p); emit(); };
  const setAI = (p) => set({ ai: Object.assign({}, A.ai, p) });
  const setLive = (p) => set({ live: Object.assign({}, A.live, p) });
  const pushAI = (m) => setAI({ messages: A.ai.messages.concat([Object.assign({ id: mid(), time: now() }, m)]) });
  const pushLive = (m) => setLive({ messages: A.live.messages.concat([Object.assign({ id: mid(), time: now() }, m)]) });
  const later = (fn, ms) => { timers.push(setTimeout(fn, ms)); };

  const PROMPTS = ['Come funziona Gest Park?', 'Dove posso scaricare gli aggiornamenti?', 'Ho bisogno di assistenza.', 'Quali software offre Cedi Soft?', 'Come posso richiedere una demo?'];
  const STATUS = {
    available: { label: 'Disponibile', text: 'Un operatore è disponibile.', dot: '#34A63B' },
    busy: { label: 'Occupato', text: 'Tutti gli operatori sono momentaneamente occupati.', dot: '#E0A030' },
    offline: { label: 'Non disponibile', text: 'Il supporto non è disponibile in questo momento.', dot: '#8D99AF' }
  };

  function intent(t) {
    const s = t.toLowerCase();
    if (/errore di rete|simula errore/.test(s)) return 'error';
    if (/operatore|persona|umano|parlare con|tecnico/.test(s)) return 'human';
    if (/demo|dimostrazion/.test(s)) return 'demo';
    if (/aggiornament|scaric|download/.test(s)) return 'updates';
    if (/gest ?park/.test(s)) return 'gestpark';
    if (/quali software|prodotti|catalogo|offre|soluzioni/.test(s)) return 'catalog';
    if (/assistenza|problema|aiuto|non funziona|supporto/.test(s)) return 'help';
    if (/prezz|cost|listino|abbonament|preventiv/.test(s)) return 'pricing';
    if (/contatt|telefono|email|sede|indirizzo/.test(s)) return 'contacts';
    return 'unknown';
  }
  const R = {
    gestpark: { text: 'Gest Park è il gestionale Cedi Soft per autosaloni: supporta la vendita di veicoli nuovi e usati e prevede gestioni separate per noleggio e pratiche auto. Nella pagina prodotto trovi panoramica, funzionalità e integrazioni.', links: [{ label: 'Pagina Gest Park', href: productHref('gest-park'), icon: 'arrow-up-right' }, { label: 'Richiedi una demo', href: routes.contatti, icon: 'calendar-check' }] },
    updates: { text: 'Gli strumenti e le risorse di supporto sono raccolti nella pagina Assistenza. Nel prototipo i collegamenti di download non sono ancora attivi: gli indirizzi reali verranno pubblicati da Cedi Soft.', links: [{ label: 'Vai ai download', href: routes.assistenza + '#download', icon: 'download' }] },
    help: { text: 'Posso indicarti guide e risorse, ma per un problema specifico sul tuo software è meglio parlare con il team di assistenza.', links: [{ label: 'Parla con un operatore', act: 'handoff', icon: 'headset' }, { label: 'Centro assistenza', href: routes.assistenza, icon: 'life-buoy' }] },
    catalog: { text: 'Cedi Soft sviluppa software per più settori: autosaloni (Gest Park, ESEBOLL), carrozzerie (Gest Crash CARW), periti (Gest Crash CPEW e CPA, Videoperizia Online), noleggio (Gest Rent), contabilità e magazzino (GEST) e personalizzazione (Stiltocco).', links: [{ label: 'Catalogo software', href: routes.software, icon: 'layout-grid' }] },
    demo: { text: 'Puoi richiedere una demo dal modulo di contatto: seleziona «Richiesta demo» come oggetto e indica il software che ti interessa.', links: [{ label: 'Apri il modulo', href: routes.contatti, icon: 'calendar-check' }] },
    pricing: { text: 'Non ho informazioni sui prezzi: le condizioni vengono definite su richiesta in base alle tue esigenze.', links: [{ label: 'Richiedi un preventivo', href: routes.contatti, icon: 'mail' }] },
    contacts: { text: 'Trovi indirizzo, telefono ed email nella sezione Contatti della pagina Azienda.', links: [{ label: 'Contatti', href: routes.contatti, icon: 'arrow-up-right' }] },
    human: { text: 'Certo. Ti porto alla chat con il supporto: lì vedi se un operatore è disponibile.', links: [{ label: 'Parla con un operatore', act: 'handoff', icon: 'headset' }] },
    unknown: { text: 'Non ho informazioni verificate su questo argomento. Preferisco non darti una risposta imprecisa: prova una delle domande suggerite o parla con un operatore.', links: [{ label: 'Parla con un operatore', act: 'handoff', icon: 'headset' }], suggest: true }
  };

  const assist = {
    get: () => A,
    subscribe(fn) { subs.add(fn); return () => subs.delete(fn); },
    prompts: PROMPTS, STATUS,
    toggle() { set({ open: !A.open, unread: 0 }); },
    open(view) { set({ open: true, unread: 0, view: view || A.view }); if (view === 'live') assist.startLive(); if (view === 'ai') assist.startAI(); },
    close() { set({ open: false }); },
    go(view) { set({ view }); },
    startAI() { set({ view: 'ai' }); },
    sendAI(text) {
      const t = (text || '').trim(); if (!t || A.ai.typing) return;
      set({ view: 'ai' });
      pushAI({ from: 'user', text: t });
      setAI({ typing: true });
      const k = intent(t);
      later(() => {
        setAI({ typing: false });
        if (k === 'error') { pushAI({ from: 'ai', error: true, retry: t, text: 'Non è stato possibile ottenere una risposta. Controlla la connessione e riprova.' }); return; }
        pushAI(Object.assign({ from: 'ai', simulated: true }, R[k]));
      }, 1000 + Math.random() * 700);
    },
    retry(m) { setAI({ messages: A.ai.messages.filter(x => x.id !== m.id) }); assist.sendAI(m.retry); },
    resetAI() { timers.forEach(clearTimeout); timers = []; setAI({ messages: [], typing: false }); },
    handoff() {
      const carried = A.ai.messages.filter(m => m.from === 'user').length;
      set({ view: 'live' });
      if (A.live.phase === 'idle' || A.live.phase === 'ended' || A.live.phase === 'sent') {
        setLive({ messages: [], carried });
        if (carried) pushLive({ from: 'system', text: 'Contesto della chat con l’assistente virtuale allegato alla richiesta (' + carried + (carried === 1 ? ' domanda' : ' domande') + ') · anteprima del prototipo' });
        assist.startLive(true);
      }
    },
    startLive(force) {
      set({ view: 'live' });
      if (!force && A.live.phase !== 'idle' && A.live.phase !== 'ended' && A.live.phase !== 'sent') return;
      if (A.live.phase === 'ended' || A.live.phase === 'sent') setLive({ messages: [], carried: 0 });
      if (A.status === 'offline') { setLive({ phase: 'form' }); return; }
      if (A.status === 'busy') { setLive({ phase: 'queue', queue: 3 }); return; }
      assist._connect();
    },
    _connect() {
      setLive({ phase: 'connecting' });
      later(() => {
        if (A.live.phase !== 'connecting') return;
        setLive({ phase: 'connected' });
        pushLive({ from: 'system', text: 'Chat con il supporto avviata · operatore dimostrativo' });
        setLive({ typing: true });
        later(() => { setLive({ typing: false }); pushLive({ from: 'agent', simulated: true, text: 'Buongiorno, sono del team di assistenza Cedi Soft. Come posso aiutarti?' }); }, 1500);
      }, 1800);
    },
    waitQueue() {
      const tick = () => {
        if (A.live.phase !== 'queue') return;
        if (A.live.queue > 1) { setLive({ queue: A.live.queue - 1 }); later(tick, 2000); return; }
        assist._connect();
      };
      setLive({ waiting: true }); later(tick, 2000);
    },
    sendLive(text, file) {
      const t = (text || '').trim(); if ((!t && !file) || A.live.phase !== 'connected') return;
      pushLive({ from: 'user', text: t, file: file || null });
      setLive({ typing: true });
      later(() => { setLive({ typing: false }); pushLive({ from: 'agent', simulated: true, text: 'Grazie, ho preso nota. Verifico e ti aggiorno a breve.' }); }, 2000);
    },
    leaveMessage() { setLive({ phase: 'form' }); },
    submitForm(form) {
      setLive({ phase: 'sending' });
      later(() => {
        if (/errore/i.test(form.subject || '')) { setLive({ phase: 'form', formError: 'Invio non riuscito. Riprova tra qualche istante.' }); return; }
        setLive({ phase: 'sent', formError: null, sentTo: form.email });
      }, 1300);
    },
    endLive() { timers.forEach(clearTimeout); timers = []; setLive({ phase: 'ended', typing: false }); pushLive({ from: 'system', text: 'Conversazione terminata' }); },
    setStatus(s) {
      set({ status: s });
      const p = A.live.phase;
      if (A.view === 'live' && (p === 'queue' || p === 'form' || p === 'connecting')) { timers.forEach(clearTimeout); timers = []; setLive({ phase: 'idle', waiting: false }); assist.startLive(); }
    },
    resetAll() { timers.forEach(clearTimeout); timers = []; const o = A.open, s = A.status; A = fresh(); A.open = o; A.status = s; A.unread = 0; emit(); }
  };

  // ---------- Reveal on scroll ([data-reveal] = delay ms) ----------
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const io = !reduce && 'IntersectionObserver' in window ? new IntersectionObserver((es) => {
    es.forEach(e => { if (e.isIntersecting) { const el = e.target; el.style.opacity = '1'; el.style.transform = 'none'; if (el.hasAttribute('data-reveal-img')) el.style.clipPath = 'inset(0 0 0 0 round 0px)'; io.unobserve(el); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }) : null;
  function scan() {
    if (!io) return;
    document.querySelectorAll('[data-reveal]:not([data-rv])').forEach(el => {
      el.setAttribute('data-rv', '');
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92) return;
      const d = parseInt(el.getAttribute('data-reveal') || '0', 10) || 0;
      el.style.opacity = '0'; el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity 640ms cubic-bezier(.22,1,.36,1) ' + d + 'ms, transform 640ms cubic-bezier(.22,1,.36,1) ' + d + 'ms';
      io.observe(el);
    });
    document.querySelectorAll('[data-reveal-img]:not([data-rv])').forEach(el => {
      el.setAttribute('data-rv', '');
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92) return;
      const d = parseInt(el.getAttribute('data-reveal-img') || '0', 10) || 0;
      el.style.opacity = '0.001'; el.style.transform = 'scale(1.04)'; el.style.clipPath = 'inset(6% 6% 6% 6% round 28px)';
      el.style.transition = 'opacity 500ms ease ' + d + 'ms, transform 1100ms cubic-bezier(.22,1,.36,1) ' + d + 'ms, clip-path 1000ms cubic-bezier(.22,1,.36,1) ' + d + 'ms';
      io.observe(el);
    });
  }

  // ---------- Page transitions: fade in on load, fade out on internal navigation ----------
  function pageFx() {
    if (reduce) return;
    const b = document.body;
    b.style.opacity = '0'; b.style.transition = 'opacity 420ms cubic-bezier(.22,1,.36,1)';
    requestAnimationFrame(() => requestAnimationFrame(() => { b.style.opacity = '1'; }));
    setTimeout(() => { b.style.opacity = '1'; }, 80);
    document.addEventListener('click', (e) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a || a.target === '_blank') return;
      const href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#' || /^(mailto|tel|https?):/.test(href) || !/\.dc\.html/.test(href)) return;
      const u = new URL(a.href, location.href);
      if (u.pathname === location.pathname && u.search === location.search) return;
      e.preventDefault();
      b.style.transition = 'opacity 200ms ease'; b.style.opacity = '0';
      setTimeout(() => { location.href = a.href; }, 190);
    });
    window.addEventListener('pageshow', (ev) => { if (ev.persisted) b.style.opacity = '1'; });
  }
  // Scroll to hash after DCs render.
  function hashScroll() {
    if (!location.hash) return;
    let n = 0;
    const t = setInterval(() => {
      const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (el) { clearInterval(t); setTimeout(() => window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96 }), 120); }
      if (++n > 40) clearInterval(t);
    }, 100);
  }
  const boot = () => {
    scan(); new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
    pageFx(); hashScroll();
  };
  if (document.body) boot(); else document.addEventListener('DOMContentLoaded', boot);

  // Soft cursor-follow glow with lerp smoothing; writes straight to the element (no React re-render).
  function glow(area, el, opts) {
    if (!area || !el || reduce || !window.matchMedia('(pointer:fine)').matches) return () => {};
    let tx = 0.5, ty = 0.35, x = tx, y = ty, on = 0, ton = 0, raf = 0;
    const tick = () => {
      x += (tx - x) * 0.08; y += (ty - y) * 0.08; on += (ton - on) * 0.06;
      const r = area.getBoundingClientRect();
      el.style.transform = 'translate3d(' + (x * r.width) + 'px,' + (y * r.height) + 'px,0) translate(-50%,-50%)';
      el.style.opacity = String(on * ((opts && opts.max) || 1));
      if (Math.abs(tx - x) + Math.abs(ty - y) + Math.abs(ton - on) > 0.001) raf = requestAnimationFrame(tick); else raf = 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const mv = (e) => { const r = area.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width; ty = (e.clientY - r.top) / r.height; ton = 1; kick(); };
    const lv = () => { ton = 0; kick(); };
    area.addEventListener('pointermove', mv, { passive: true }); area.addEventListener('pointerleave', lv);
    return () => { area.removeEventListener('pointermove', mv); area.removeEventListener('pointerleave', lv); cancelAnimationFrame(raf); };
  }

  const param = (k) => { try { return new URLSearchParams(location.search).get(k); } catch (e) { return null; } };
  const product = (id) => products.find(p => p.id === id);

  window.CS = { config, routes, productHref, products, product, sectors, services, assist, toast, soon, param, glow, reduceMotion: reduce };
  window.dispatchEvent(new CustomEvent('cs:ready'));
})();
