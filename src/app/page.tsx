import type { Metadata } from 'next';

import { CtaBanner } from '@/components/home/cta-banner';
import { Ecosystem } from '@/components/home/ecosystem';
import { GpwSpotlight } from '@/components/home/gpw-spotlight';
import { Hero } from '@/components/home/hero';
import { PartnerMarquee } from '@/components/home/partner-marquee';
import { SectorCards } from '@/components/home/sector-cards';
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section';
import { content } from '@/content/source';

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

export default async function HomePage() {
  const [products, sectors] = await Promise.all([content.getProducts(), content.getSectors()]);
  const showcase = ['gest-park', 'gest-crash-carw', 'gest'].flatMap((s) => products.find((p) => p.slug === s) ?? []);

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
          <Reveal delay={0.1} className="glass-medium grid grid-cols-2 gap-6 rounded-[24px] p-8 shadow-md">
            {[['1989', 'Anno di fondazione'], ['+1000', 'Clienti soddisfatti']].map(([v, l]) => (
              <div key={l} className="flex flex-col gap-2">
                <span className="bg-brand-gradient bg-clip-text text-[clamp(36px,5vw,56px)] font-semibold leading-none tracking-[-0.04em] text-transparent">{v}</span>
                <span className="text-[14px] leading-snug text-ink-2">{l}</span>
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
          <Ecosystem products={products} />
        </div>
      </section>

      {/* Settori */}
      <section className="px-6 py-24">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-10">
          <SectionHeading eyebrow="Settori" title="Scegli il tuo settore." />
          <SectorCards sectors={sectors} products={products} />
        </div>
      </section>

      {/* In evidenza: Gest Park Web + Gest Park */}
      <GpwSpotlight />

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

      {/* Partner e integrazioni */}
      <section className="bg-blue-950 px-6 py-24">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-12">
          <SectionHeading eyebrow="Partner" title="Collegati agli strumenti del tuo settore." tone="dark" />
          <PartnerMarquee />
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
      <CtaBanner />
    </>
  );
}
