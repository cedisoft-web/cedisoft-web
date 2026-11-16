import type { Metadata } from 'next';
import Link from 'next/link';

import { Hero } from '@/components/home/hero';
import { SectorExplorer } from '@/components/home/sector-explorer';
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { content } from '@/content/source';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: { absolute: 'Cedi Soft — Software che semplifica. Tecnologia che evolve.' },
  description: 'Software house italiana dal 1989: gestionali per autosaloni, carrozzerie, periti, autonoleggi e attività commerciali.',
  alternates: { canonical: '/' },
};

// Contenuti della Home verificati sul prototipo approvato (fonti: cedisoft.it, datgroup.com). Da riconfermare.
const customSteps = [
  { icon: 'messages-square', title: 'Ascolto', text: 'Partiamo dalle esigenze operative e dai processi da semplificare.' },
  { icon: 'pencil-ruler', title: 'Progettazione', text: 'Definiamo con te funzioni e priorità prima di scrivere codice.' },
  { icon: 'code-xml', title: 'Sviluppo e integrazione', text: 'Realizziamo il software e lo colleghiamo ai sistemi già in uso.' },
  { icon: 'life-buoy', title: 'Assistenza ed evoluzione', text: 'Ti accompagniamo dopo il rilascio con supporto e aggiornamenti.' },
];

const parkPoints = [
  { icon: 'car-front', text: 'Vendita di veicoli nuovi e usati' },
  { icon: 'key-round', text: 'Gestioni separate per noleggio e pratiche auto' },
  { icon: 'scan-search', text: 'Interrogazione targhe con anagrafica Eurotax' },
];

const trust = [
  { icon: 'badge-check', title: 'Infocar · Quattroruote', text: 'Tra i distributori ufficiali della Banca Dati Infocar-Quattroruote.', source: 'Fonte: cedisoft.it' },
  { icon: 'handshake', title: 'DAT Italia', text: 'Partnership del 2020 per la valutazione dell’usato in Gest Park.', source: 'Fonte: datgroup.com' },
  { icon: 'scan-search', title: 'Eurotax', text: 'Interrogazione targhe collegata all’anagrafica Eurotax.', source: 'Fonte: cedisoft.it' },
  { icon: 'workflow', title: 'Seasoft e Zucchetti', text: 'Integrazioni per contabilità, fatture e importazione dati.', source: 'Fonte: cedisoft.it' },
];

const bento = ['gest-park', 'gest-crash-carw', 'gest', 'videoperizia'] as const;

export default async function HomePage() {
  const [products, sectors] = await Promise.all([content.getProducts(), content.getSectors()]);
  const bySlug = (slug: string) => products.find((p) => p.slug === slug);
  const showcase = ['gest-park', 'gest-crash-carw', 'gest'].flatMap((s) => bySlug(s) ?? []);
  const park = bySlug('gest-park');
  const parkWeb = bySlug('gest-park-web');

  return (
    <>
      <Hero showcase={showcase} />

      {/* Chi siamo */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
          <Reveal className="flex flex-col gap-6">
            <SectionHeading eyebrow="Chi siamo" title="Sviluppiamo software per chi lavora ogni giorno."
              lead="Cedi Soft è una software house italiana multi-settore. Conosciamo i processi di autosaloni, carrozzerie, periti, autonoleggi e attività commerciali, e li trasformiamo in software chiari, affidabili e in continua evoluzione." />
            <ButtonLink href="/azienda#storia" variant="ghost" arrow className="self-start">La nostra storia</ButtonLink>
          </Reveal>
          <Reveal delay={0.1} className="glass-medium grid grid-cols-3 gap-4 rounded-[24px] p-6 shadow-md">
            {[['1989', 'Anno di fondazione'], [String(products.length), 'Software a catalogo'], [String(sectors.length), 'Ambiti di attività']].map(([v, l]) => (
              <div key={l} className="flex flex-col gap-1.5">
                <span className="bg-brand-gradient bg-clip-text text-[clamp(28px,4vw,44px)] font-semibold leading-none tracking-[-0.04em] text-transparent">{v}</span>
                <span className="text-[13px] leading-snug text-ink-2">{l}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Ecosistema */}
      <section className="bg-n-25 px-6 py-24">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Ecosistema software" title="Un software per ogni attività. Una sola filosofia." />
            <ButtonLink href="/software" variant="secondary" arrow>Catalogo completo</ButtonLink>
          </div>
          <div className="grid gap-4 min-[980px]:grid-cols-4 min-[980px]:grid-rows-2">
            {bento.map((slug, i) => {
              const p = bySlug(slug);
              if (!p) return null;
              const big = i === 0;
              const href = p.hasDetailPage ? `/software/${p.slug}` : `/software#${p.slug}`;
              return (
                <Reveal key={slug} delay={i * 0.07} className={cn(big && 'min-[980px]:col-span-2 min-[980px]:row-span-2', i === 3 && 'min-[980px]:col-span-2')}>
                  <SpotlightCard className={cn('h-full', big && '!border-blue-900 !bg-blue-900')}>
                    <Link href={href} className="flex h-full min-h-[200px] flex-col justify-between gap-8 rounded-[inherit] p-7">
                      <span className={cn('flex size-12 items-center justify-center rounded-[14px]', big ? 'bg-white/10 text-white ring-1 ring-white/25' : 'bg-sky-50 text-blue-600')}><Icon name={p.icon} size={22} /></span>
                      <span className="flex flex-col gap-2">
                        <span className={cn('eyebrow', big ? '!text-[#9CC8EC]' : '!text-sky-600')}>{p.category}</span>
                        <span className={cn('font-semibold tracking-[-0.025em]', big ? 'text-[34px] text-white' : 'text-[22px] text-ink')}>{p.name}</span>
                        <span className={cn('text-[15px] leading-relaxed', big ? 'text-[#C9D6EC]' : 'text-ink-2')}>{p.description}</span>
                      </span>
                    </Link>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Settori */}
      <section className="px-6 py-24">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-10">
          <SectionHeading eyebrow="Settori" title="Scegli il tuo settore." />
          <SectorExplorer sectors={sectors} products={products} />
        </div>
      </section>

      {/* Spotlight Gest Park */}
      {park && (
        <section className="bg-ambient px-6 py-24">
          <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-2 md:items-center">
            <Reveal className="flex flex-col gap-6">
              <SectionHeading eyebrow="In evidenza · Gest Park" title="L’autosalone, gestito in un unico software."
                lead="Gest Park accompagna la vendita di veicoli nuovi e usati e include gestioni separate per noleggio e pratiche auto. Può essere utilizzato anche su piattaforma cloud, con tutte le sue funzionalità." />
              <ul className="flex flex-col gap-3">
                {parkPoints.map((t) => (
                  <li key={t.text} className="flex items-center gap-3 text-[15px] text-ink">
                    <span className="flex size-9 flex-none items-center justify-center rounded-[10px] bg-white text-blue-600 shadow-xs"><Icon name={t.icon} size={17} /></span>{t.text}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/software/gest-park" arrow>Scopri Gest Park</ButtonLink>
                {parkWeb && <ButtonLink href="/software#gest-park-web" variant="secondary">Gest Park Web · Beta</ButtonLink>}
              </div>
            </Reveal>
            {/* Spazio riservato agli screenshot reali di Gest Park (da fornire): finché mancano, card di prodotto. */}
            <Reveal delay={0.1}>
              <div className="glass-medium flex flex-col gap-4 rounded-[28px] p-8 shadow-lg">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-digital text-white"><Icon name="car-front" size={26} /></span>
                <span className="text-2xl font-semibold tracking-[-0.025em] text-ink">Gest Park</span>
                <span className="text-[15px] leading-relaxed text-ink-2">{park.description}</span>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Sviluppo su misura */}
      <section className="px-6 py-24">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Sviluppo su misura" title="Quando serve qualcosa di specifico, lo costruiamo con te."
              lead="Oltre ai prodotti a catalogo, progettiamo software e integrazioni attorno ai processi reali della tua azienda, partendo dall’ascolto delle esigenze operative." />
            <ButtonLink href="/azienda#contatti" arrow>Parlaci del tuo progetto</ButtonLink>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {customSteps.map((s, i) => (
              <li key={s.title}><Reveal delay={i * 0.06} className="h-full">
                <div className="flex h-full flex-col gap-4 rounded-[20px] border border-border-subtle bg-white p-6">
                  <span className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-sky-50 text-blue-600"><Icon name={s.icon} size={20} /></span>
                    <span className="font-mono text-xs text-ink-muted">0{i + 1}</span>
                  </span>
                  <span className="text-lg font-semibold tracking-[-0.015em] text-ink">{s.title}</span>
                  <span className="text-sm leading-relaxed text-ink-2">{s.text}</span>
                </div>
              </Reveal></li>
            ))}
          </ol>
        </div>
      </section>

      {/* Fiducia / integrazioni */}
      <section className="bg-n-25 px-6 py-24">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-12">
          <SectionHeading eyebrow="Fiducia" title="Collegati agli strumenti del tuo settore." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.06}>
                <SpotlightCard className="flex h-full flex-col gap-3 p-6">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-sky-50 text-blue-600"><Icon name={t.icon} size={20} /></span>
                  <span className="text-lg font-semibold tracking-[-0.015em] text-ink">{t.title}</span>
                  <span className="text-sm leading-relaxed text-ink-2">{t.text}</span>
                  <span className="mt-auto font-mono text-[11px] text-ink-muted">{t.source}</span>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Assistenza */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-[1200px] gap-8 rounded-[28px] border border-border-subtle bg-white p-8 shadow-sm md:grid-cols-[1.3fr_1fr] md:items-center md:p-12">
          <div className="flex flex-col gap-4">
            <SectionHeading eyebrow="Assistenza" title="Supporto da chi sviluppa il tuo software."
              lead="Scrivi al team di assistenza o consulta il centro assistenza: guide, download e domande frequenti." />
          </div>
          <div className="flex flex-col gap-3">
            <ButtonLink href="/assistenza" arrow>Centro assistenza</ButtonLink>
            <ButtonLink href="/azienda#contatti" variant="secondary">Contatti</ButtonLink>
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section className="px-6 pb-24">
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[32px] bg-digital px-8 py-16 text-center md:px-16">
          <span aria-hidden className="cs-orb" style={{ left: '60%', top: '-30%', width: 480, height: 480, background: 'radial-gradient(circle, rgba(255,255,255,.22), transparent 68%)', ['--d' as string]: '30s' }} />
          <span aria-hidden className="cs-orb" style={{ left: '-10%', top: '50%', width: 380, height: 380, background: 'radial-gradient(circle, rgba(52,166,59,.25), transparent 68%)', ['--d' as string]: '34s', ['--delay' as string]: '-10s' }} />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
            <h2 className="text-[clamp(28px,4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] text-white [text-wrap:balance]">Raccontaci come lavori. Troveremo lo strumento giusto.</h2>
            <p className="text-[17px] leading-relaxed text-[#DCE4F6]">Richiedi una demo di un nostro software o parlaci di un progetto su misura.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <ButtonLink href="/azienda#contatti" size="lg" className="!bg-white !text-blue-700 hover:!bg-blue-50" arrow>Richiedi una demo</ButtonLink>
              <ButtonLink href="/software" size="lg" className="border border-white/40 text-white hover:bg-white/10">Scopri i software</ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
