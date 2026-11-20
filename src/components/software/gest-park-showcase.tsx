import Image from 'next/image';

import { Layer, ParallaxStage, Tilt } from '@/components/home/parallax-stage';
import { ScreenGallery, type Screen } from '@/components/software/screen-gallery';
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { PartnerMarquee } from '@/components/home/partner-marquee';
import { Reveal } from '@/components/ui/reveal';
import { Breadcrumb, SectionHeading } from '@/components/ui/section';
import { SoftwareIcon } from '@/components/ui/software-icon';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { cn } from '@/lib/cn';
import type { Product } from '@/content/types';

const SHOT = '/gestpark/screens/';
const PHOTO = '/gestpark/photos/';

/** Schermata del software incorniciata: bordo sottile e ombra profonda, nessuna finta barra del browser. */
function ScreenFrame({ name, w, h, alt, className, priority, sizes }: Readonly<{ name: string; w: number; h: number; alt: string; className?: string; priority?: boolean; sizes?: string }>) {
  return (
    <figure className={cn('overflow-hidden rounded-[14px] border border-white/25 bg-white shadow-[0_34px_80px_-34px_rgba(10,24,64,.7)] ring-1 ring-black/5', className)}>
      <Image src={`${SHOT}${name}.webp`} alt={alt} width={w} height={h} priority={priority} sizes={sizes ?? '(min-width: 980px) 600px, 92vw'} className="h-auto w-full" />
    </figure>
  );
}

const chips = [
  { icon: 'cloud', label: 'In locale o in cloud' },
  { icon: 'scan-search', label: 'Interrogazione targhe' },
  { icon: 'file-check-2', label: 'Modulo ESEBOLL' },
];

/** Testata della scheda Gest Park: foto in duotone sullo sfondo, schermate del software in primo piano con parallasse. */
export function GestParkHero({ value }: Readonly<{ value: string }>) {
  return (
    <section className="bg-digital relative isolate overflow-hidden px-6 pb-28 pt-36 text-white">
      <Image src={`${PHOTO}concessionaria-aerea.jpg`} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-[.2] mix-blend-luminosity grayscale" />
      <span aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(18,33,82,.2),rgba(18,33,82,.55))]" />
      <span aria-hidden className="cs-orb -z-10" style={{ right: '-6%', top: '-24%', width: 560, height: 560, background: 'radial-gradient(circle, rgba(255,255,255,.2), transparent 68%)', ['--d' as string]: '30s' }} />

      <div className="mx-auto grid max-w-[1200px] items-center gap-14 min-[980px]:grid-cols-[.9fr_1.1fr]">
        <div className="flex flex-col gap-6">
          <Breadcrumb tone="dark" items={[{ label: 'Home', href: '/' }, { label: 'Software', href: '/software' }, { label: 'Gest Park' }]} />
          <span className="flex items-center gap-4">
            <SoftwareIcon slug="gest-park" size={64} className="shadow-[0_18px_40px_-14px_rgba(0,0,0,.55)]" />
          </span>
          <h1 className="text-[clamp(36px,5vw,62px)] font-semibold leading-[1.04] tracking-[-0.045em] [text-wrap:balance]">Gest Park, il gestionale pensato per l’autosalone.</h1>
          <p className="max-w-xl text-lg leading-relaxed text-[#DCE4F6] [text-wrap:pretty]">{value}</p>
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/demo?prodotto=Gest%20Park" size="lg" arrow className="!bg-white !text-blue-700 hover:!bg-white/90">Richiedi una demo</ButtonLink>
            <ButtonLink href="#dentro" size="lg" className="!bg-transparent border border-white/50 !text-white hover:!bg-white/10">Guarda le schermate</ButtonLink>
          </div>
          <ul className="flex flex-wrap gap-2.5 pt-1">
            {chips.map((c) => (
              <li key={c.label} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-[13px] font-medium text-white ring-1 ring-white/20 backdrop-blur-sm">
                <Icon name={c.icon} size={15} className="text-[#9CC8EC]" />{c.label}
              </li>
            ))}
          </ul>
        </div>

        <ParallaxStage className="relative mx-auto w-full max-w-[660px] pb-12">
          <Tilt max={6} className="relative">
            <Layer depth={-6} z={0}>
              <ScreenFrame name="finestra-modifica-veicolo" w={1600} h={866} alt="Gest Park: gestione del parco auto con la scheda del veicolo" priority sizes="(min-width: 980px) 640px, 92vw" />
            </Layer>
            <Layer depth={28} z={90} className="cs-float absolute -bottom-10 -right-2 w-[50%] sm:-right-8" style={{ ['--delay' as string]: '-2s' }}>
              <ScreenFrame name="veicolo-costi-utile" w={1014} h={761} alt="Gest Park: costi e utile del veicolo" sizes="(min-width: 980px) 320px, 46vw" />
            </Layer>
          </Tilt>
        </ParallaxStage>
      </div>
    </section>
  );
}

const highlights = [
  { icon: 'cloud', title: 'In locale o in cloud', text: 'Tutte le funzionalità, nel modo che preferisci.' },
  { icon: 'car-front', title: 'Nuovo e usato', text: 'Un unico flusso, dalla scheda del veicolo alla vendita.' },
  { icon: 'receipt-text', title: 'Amministrazione integrata', text: 'Fatture, prima nota e bilancio nello stesso software.' },
  { icon: 'link-2', title: 'Un ecosistema collegato', text: 'GestRent, GestCrash e Gest Park Web, sincronizzati.' },
];

export function GestParkHighlights() {
  return (
    <section id="panoramica" className="scroll-mt-32 px-6 pb-8 pt-20">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12">
        <SectionHeading eyebrow="Perché Gest Park" align="center" title="Tutto quello che serve a un autosalone, in un solo posto."
          lead="Dal veicolo che entra nel parco alla fattura di vendita: ogni dato nasce una volta sola e resta allineato in tutto il software." />
        <div className="grid gap-4 sm:grid-cols-2 min-[980px]:grid-cols-4">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.06} className="h-full">
              <SpotlightCard className="flex h-full flex-col gap-3 p-6">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#274798,#459AD5)] text-white shadow-md"><Icon name={h.icon} size={22} /></span>
                <span className="text-lg font-semibold tracking-[-0.015em] text-ink">{h.title}</span>
                <span className="text-sm leading-relaxed text-ink-2">{h.text}</span>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Points({ items, dark }: Readonly<{ items: string[]; dark?: boolean }>) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((t) => (
        <li key={t} className={cn('flex items-start gap-3 text-[15px] leading-snug', dark ? 'text-[#DCE4F6]' : 'text-ink')}>
          <span className={cn('mt-0.5 flex size-6 flex-none items-center justify-center rounded-full', dark ? 'bg-white/15 text-white' : 'bg-[var(--success-bg)] text-[var(--success-fg)]')}><Icon name="check" size={14} /></span>{t}
        </li>
      ))}
    </ul>
  );
}

/** Foto a tutto riquadro con una schermata del software che la sovrasta. */
function PhotoWithScreen({ photo, photoAlt, screen, flip }: Readonly<{ photo: string; photoAlt: string; screen: { name: string; w: number; h: number; alt: string }; flip?: boolean }>) {
  return (
    <div className="relative pb-14">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-lg">
        <Image src={`${PHOTO}${photo}.jpg`} alt={photoAlt} fill sizes="(min-width: 980px) 560px, 92vw" className="object-cover" />
        <span aria-hidden className="absolute inset-0 bg-[linear-gradient(135deg,rgba(39,71,152,.34),transparent_58%)]" />
      </div>
      <ScreenFrame name={screen.name} w={screen.w} h={screen.h} alt={screen.alt} sizes="(min-width: 980px) 420px, 70vw"
        className={cn('absolute bottom-0 w-[72%]', flip ? '-left-3 sm:-left-8' : '-right-3 sm:-right-8')} />
    </div>
  );
}

export function GestParkBlocks() {
  return (
    <>
      {/* Parco auto */}
      <section id="parco-auto" className="scroll-mt-32 px-6 py-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-16 min-[980px]:grid-cols-2">
          <Reveal><PhotoWithScreen photo="parco-auto-scheda" photoAlt="Consulente e cliente davanti a un veicolo in concessionaria"
            screen={{ name: 'veicolo-costi-utile', w: 1014, h: 761, alt: 'Gest Park: scheda del veicolo con costi e utile' }} /></Reveal>
          <Reveal delay={0.08} className="flex flex-col gap-6">
            <SectionHeading eyebrow="Parco auto" title="Ogni veicolo, con costi e utile sempre sotto controllo."
              lead="La scheda veicolo raccoglie dati tecnici, stato, documenti, foto e dati amministrativi. Inserisci i veicoli a mano o in blocco e vedi in tempo reale quanto costano e quanto rendono." />
            <Points items={[
              'Inserimento manuale o multiplo dall’elenco del fornitore',
              'Dati tecnici da Infocar, accessori e valutazioni da Eurotax e DAT Italia',
              'Costi, utile e dettagli economici visibili in tempo reale',
              'Gestione dello stock, con modifiche su più veicoli insieme',
            ]} />
          </Reveal>
        </div>
      </section>

      {/* Vendita */}
      <section id="vendita" className="bg-n-25 scroll-mt-32 px-6 py-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-16 min-[980px]:grid-cols-2">
          <Reveal className="min-[980px]:order-2"><PhotoWithScreen flip photo="vendita-showroom" photoAlt="Coppia e consulente in uno showroom di auto"
            screen={{ name: 'anagrafica', w: 1600, h: 866, alt: 'Gest Park: anagrafica clienti e fornitori' }} /></Reveal>
          <Reveal delay={0.08} className="flex flex-col gap-6 min-[980px]:order-1">
            <SectionHeading eyebrow="Vendita" title="Preventivi e contratti, senza passaggi inutili."
              lead="Prepara il preventivo con i veicoli del parco, la permuta e il piano dei pagamenti, poi trasformalo in contratto. Clienti e fornitori restano nell’anagrafica, con tutta la loro storia." />
            <Points items={[
              'Preventivi con veicoli disponibili o fuori parco, voci extra e permuta',
              'Piano dei pagamenti e dettaglio degli importi',
              'Creazione e gestione del contratto',
              'Anagrafica clienti e fornitori con scheda cliente',
            ]} />
          </Reveal>
        </div>
      </section>

      {/* Amministrazione */}
      <section id="amministrazione" className="relative isolate scroll-mt-32 overflow-hidden bg-blue-950 px-6 py-24 text-white">
        <span aria-hidden className="cs-orb -z-10" style={{ left: '-8%', top: '-10%', width: 520, height: 520, background: 'radial-gradient(circle, rgba(69,154,213,.4), transparent 68%)', ['--d' as string]: '30s' }} />
        <div className="mx-auto grid max-w-[1200px] items-center gap-16 min-[980px]:grid-cols-[1fr_1.05fr]">
          <Reveal className="flex flex-col gap-6">
            <SectionHeading tone="dark" eyebrow="Amministrazione" title="Fatturazione e contabilità nello stesso gestionale."
              lead="Niente doppi inserimenti: le fatture nascono dalle vendite, la prima nota dalle fatture, il bilancio dalla prima nota." />
            <Points dark items={[
              'Fatturazione attiva e passiva, con collegamento a un intermediario autorizzato (Tosnet)',
              'Prima nota, conti correnti, libro giornale e mastrini',
              'Registri IVA e liquidazione',
              'Bilancio di verifica, centri di costo e piano dei conti',
              'Esenzione bollo con il modulo ESEBOLL',
            ]} />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative pb-16">
              <ScreenFrame name="fatturazione" w={1600} h={866} alt="Gest Park: elenco delle fatture" className="w-[90%]" />
              <ScreenFrame name="libro-giornale" w={1600} h={866} alt="Gest Park: libro giornale" sizes="(min-width: 980px) 460px, 70vw" className="absolute bottom-0 right-0 w-[72%]" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

const screens: Screen[] = [
  { id: 'parco-auto', title: 'Parco auto', caption: 'L’elenco dei veicoli con stato, prezzi, giacenza e chilometri.', src: `${SHOT}parco-auto.webp`, width: 1600, height: 866 },
  { id: 'veicolo', title: 'Scheda veicolo', caption: 'Dati tecnici, stato, prezzo di vendita e foto in una sola scheda.', src: `${SHOT}finestra-modifica-veicolo.webp`, width: 1600, height: 866 },
  { id: 'amministrazione', title: 'Amministrazione del veicolo', caption: 'Carico, scarico, fornitore, documenti e centro di costo.', src: `${SHOT}veicolo-amministrazione.webp`, width: 1014, height: 761 },
  { id: 'costi', title: 'Costi e utile', caption: 'Prezzo d’acquisto, lavorazioni e utile lordo, in tempo reale.', src: `${SHOT}veicolo-costi-utile.webp`, width: 1014, height: 761 },
  { id: 'anagrafica', title: 'Clienti e fornitori', caption: 'L’anagrafica con saldi, contatti e scheda cliente.', src: `${SHOT}anagrafica.webp`, width: 1600, height: 866 },
  { id: 'fatture', title: 'Fatturazione', caption: 'Fatture e documenti per anno e tipo, con stato di stampa e invio.', src: `${SHOT}fatturazione.webp`, width: 1600, height: 866 },
  { id: 'prima-nota', title: 'Prima nota', caption: 'Registrazioni collegate a fatture, fornitori e conti correnti.', src: `${SHOT}prima-nota.webp`, width: 1600, height: 866 },
  { id: 'libro-giornale', title: 'Libro giornale', caption: 'Tutte le registrazioni contabili, filtrabili per mese.', src: `${SHOT}libro-giornale.webp`, width: 1600, height: 866 },
  { id: 'bilancio', title: 'Bilancio', caption: 'Piano dei conti, mastrini, profitti e perdite, stato patrimoniale.', src: `${SHOT}bilancio.webp`, width: 1600, height: 866 },
];

export function GestParkGallery() {
  return (
    <section id="dentro" className="bg-ambient scroll-mt-32 px-6 py-16">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-8">
        <SectionHeading eyebrow="Dentro Gest Park" title="Le schermate del software, al lavoro."
          lead="Le schermate principali, con dati dimostrativi." />
        <ScreenGallery screens={screens} />
      </div>
    </section>
  );
}

/** Chiusura con foto: sostituisce la sezione “Prezzi” generica, mantenendone il messaggio. */
export function GestParkCta({ demoHref }: Readonly<{ demoHref: string }>) {
  return (
    <section id="prezzi" className="scroll-mt-32 px-6 py-24">
      <div className="relative isolate mx-auto max-w-[1200px] overflow-hidden rounded-[32px] px-8 py-16 text-white shadow-lg md:px-14 md:py-20">
        <Image src={`${PHOTO}team-showroom.jpg`} alt="" fill sizes="(min-width: 1200px) 1200px, 100vw" className="-z-20 object-cover" />
        <span aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(18,33,82,.95),rgba(39,71,152,.86)_55%,rgba(39,71,152,.45))]" />
        <div className="flex max-w-xl flex-col gap-5">
          <span className="eyebrow !text-[#9CC8EC]">Prezzi</span>
          <h2 className="text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.08] tracking-[-0.03em] [text-wrap:balance]">Una proposta costruita sulla tua attività.</h2>
          <p className="text-[17px] leading-relaxed text-[#DCE4F6]">Configurazione, numero di postazioni e modalità di utilizzo cambiano da azienda ad azienda: per questo il prezzo è definito su richiesta.</p>
          <div className="flex flex-wrap gap-3 pt-1">
            <ButtonLink href={demoHref} size="lg" arrow className="!bg-white !text-blue-700 hover:!bg-white/90">Richiedi una demo</ButtonLink>
            <ButtonLink href="/azienda#contatti" size="lg" className="!bg-transparent border border-white/50 !text-white hover:!bg-white/10">Richiedi un preventivo</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

const integrations = [
  { id: 'infocar', name: 'Infocar' },
  { id: 'eurotax', name: 'Eurotax' },
  { id: 'dat', name: 'DAT Italia' },
  { id: 'tosnet', name: 'Tosnet' },
  { id: 'seasoft', name: 'Seasoft' },
  { id: 'zucchetti', name: 'Zucchetti' },
];

/** Banda scura con i loghi a scorrimento, come in home. */
export function GestParkIntegrations() {
  return (
    <section id="integrazioni" className="scroll-mt-32 bg-blue-950 px-6 py-20">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10">
        <SectionHeading eyebrow="Integrazioni" tone="dark" title="Collegato ai servizi che usi già." />
        <PartnerMarquee partners={integrations} />
      </div>
    </section>
  );
}

const webPillars = [
  { icon: 'users', title: 'CRM completo e integrato', img: 'gpw-crm-trattative', alt: 'Gest Park Web: trattative nel CRM', w: 1800, h: 1157,
    text: 'Contatti, richieste e trattative in un unico posto, con la prossima azione sempre chiara. Segui ogni cliente e aumenta le vendite chiuse.' },
  { icon: 'globe', title: 'Website builder', img: 'gpw-web-editor', alt: 'Gest Park Web: editor del sito', w: 1800, h: 1157,
    text: 'Crea in modo rapido il sito della tua concessionaria, con il parco auto sempre aggiornato e senza competenze tecniche.' },
  { icon: 'send', title: 'Multipubblicazione', img: 'widget-multipubblicazione', alt: 'Gest Park Web: pubblicazione sui portali', w: 900, h: 762,
    text: 'Pubblica i veicoli del parco auto sulle piattaforme di vendita online in un solo passaggio, senza reinserire i dati.' },
];

/** Gest Park Web: la piattaforma web di Gest Park, presentata nei suoi tre strumenti. */
export function GestParkWeb({ product, demoHref }: Readonly<{ product: Product; demoHref: string }>) {
  return (
    <section id={product.slug} className="bg-gpw-dark relative isolate scroll-mt-32 overflow-hidden px-6 py-24 text-white">
      <span aria-hidden className="cs-orb -z-10" style={{ right: '-8%', top: '-10%', width: 520, height: 520, background: 'radial-gradient(circle, rgba(61,168,74,.4), transparent 68%)', ['--d' as string]: '30s' }} />
      <div className="mx-auto flex max-w-[1200px] flex-col gap-14">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <Image src="/brand/gpw-wordmark-white.png" alt={product.name} width={260} height={46} />
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[.06em] text-[#BFEFDD] ring-1 ring-white/20">
            La piattaforma web di Gest Park{product.status ? ` · ${product.status.label}` : ''}
          </span>
          <h2 className="text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.08] tracking-[-0.03em] [text-wrap:balance]">CRM, sito web e vendita online, nello stesso ambiente del tuo gestionale.</h2>
          <p className="text-[17px] leading-relaxed text-[#D5EFE6]">Gest Park Web usa i dati del parco auto di Gest Park: li trasforma in contatti seguiti, in un sito sempre aggiornato e in annunci sulle piattaforme di vendita.</p>
        </Reveal>

        <div className="grid gap-5 min-[980px]:grid-cols-3">
          {webPillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white/[.07] ring-1 ring-white/15 backdrop-blur-sm">
                <div className="flex aspect-[16/10] items-center justify-center overflow-hidden bg-white/[.05] p-4">
                  <Image src={`/gpw/${p.img}.webp`} alt={p.alt} width={p.w} height={p.h} sizes="(min-width: 980px) 380px, 92vw" className="h-full w-auto max-w-full rounded-lg object-contain object-top shadow-2xl" />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-[#3DA84A]/25 text-[#BFEFDD]"><Icon name={p.icon} size={20} /></span>
                  <h3 className="text-xl font-semibold tracking-[-0.02em]">{p.title}</h3>
                  <p className="text-[15px] leading-relaxed text-[#D5EFE6]">{p.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="flex justify-center">
          <ButtonLink href={demoHref} arrow size="lg" className="!bg-white !text-[#0B3F34] hover:!bg-white/90">Richiedi una demo</ButtonLink>
        </div>
      </div>
    </section>
  );
}
