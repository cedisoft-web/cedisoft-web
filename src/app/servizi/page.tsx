import type { Metadata } from 'next';

import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Reveal } from '@/components/ui/reveal';
import { PageHero, SectionHeading } from '@/components/ui/section';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { content } from '@/content/source';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Servizi',
  description: 'Fatturazione elettronica, assistenza tecnica e sviluppo software personalizzato: i servizi che accompagnano i software Cedi Soft.',
  alternates: { canonical: '/servizi' },
};

const why = [
  { icon: 'code-xml', title: 'Sviluppiamo noi i software', text: 'Servizi e assistenza vengono da chi conosce il prodotto dall’interno.' },
  { icon: 'layers', title: 'Esperienza multi-settore', text: 'Dal 1989 lavoriamo con imprese e professionisti di ambiti diversi.' },
  { icon: 'workflow', title: 'Integrazione', text: 'I servizi si collegano ai software Cedi Soft e ai sistemi che usi già.' },
  { icon: 'handshake', title: 'Rapporto diretto', text: 'Un interlocutore unico per software, servizi e supporto.' },
];

export default async function ServicesPage() {
  // Solo servizi confermati: gli altri restano nei dati ma non sono pubblicati.
  const services = (await content.getServices()).filter((s) => s.verified);
  return (
    <>
      <PageHero eyebrow="Servizi" title="Servizi che accompagnano il tuo software."
        lead="Fatturazione elettronica, assistenza e sviluppo su misura: quello che serve per lavorare ogni giorno con tranquillità."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Servizi' }]}>
        <ul className="flex flex-wrap gap-3 pt-2">
          {services.map((s) => (
            <li key={s.slug}>
              <a href={`#${s.slug}`} className="glass-light inline-flex h-11 items-center gap-2.5 rounded-full px-4 text-sm font-medium text-ink shadow-sm transition-colors hover:text-blue-600">
                <Icon name={s.icon} size={16} className="text-blue-600" />{s.name}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {services.map((s, i) => (
        <section key={s.slug} id={s.slug} className={cn('scroll-mt-24 px-6 py-24', i % 2 === 1 && 'bg-n-25')}>
          <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-2 md:items-center">
            <Reveal className={cn('flex flex-col gap-6', i % 2 === 1 && 'md:order-2')}>
              <span className="eyebrow">0{i + 1} · Servizio</span>
              <h2 className="text-[clamp(26px,3.4vw,40px)] font-semibold leading-[1.1] tracking-[-0.03em] text-ink [text-wrap:balance]">{s.name}</h2>
              <p className="text-[17px] leading-relaxed text-ink-2 [text-wrap:pretty]">{s.description}</p>
              <ul className="flex flex-col gap-3">
                {s.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[15px] text-ink">
                    <span className="mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-[var(--success-bg)] text-[var(--success-fg)]"><Icon name="check" size={14} /></span>{b}
                  </li>
                ))}
              </ul>
              <ButtonLink href="/azienda#contatti" variant="ghost" arrow className="self-start">Richiedi informazioni</ButtonLink>
            </Reveal>
            {/* Spazio per foto/illustrazioni approvate. Fino ad allora un pannello di sintesi, senza immagini finte. */}
            <Reveal delay={0.1} className={cn(i % 2 === 1 && 'md:order-1')}>
              <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(150deg,#EEF4FC,#F7F9FD)] p-10 shadow-md">
                <span aria-hidden className="cs-orb" style={{ right: '-10%', top: '-20%', width: 320, height: 320, background: `radial-gradient(circle, ${i % 2 ? 'rgba(52,166,59,.25)' : 'rgba(69,154,213,.35)'}, transparent 68%)` }} />
                <span className="relative flex size-16 items-center justify-center rounded-2xl bg-digital text-white shadow-glow"><Icon name={s.icon} size={30} /></span>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="px-6 py-24">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-12">
          <SectionHeading eyebrow="Perché Cedi Soft" title="Un solo interlocutore, dal software ai servizi." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.06}>
                <SpotlightCard className="flex h-full flex-col gap-3 p-6">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-sky-50 text-blue-600"><Icon name={w.icon} size={20} /></span>
                  <span className="text-lg font-semibold tracking-[-0.015em] text-ink">{w.title}</span>
                  <span className="text-sm leading-relaxed text-ink-2">{w.text}</span>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/azienda#contatti" size="lg" arrow>Richiedi informazioni</ButtonLink>
            <ButtonLink href="/software" size="lg" variant="secondary">Scopri i software</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
