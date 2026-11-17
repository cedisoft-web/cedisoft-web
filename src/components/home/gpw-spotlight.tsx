import Image from 'next/image';

import { Layer, ParallaxStage } from '@/components/home/parallax-stage';
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section';
import { SoftwareIcon } from '@/components/ui/software-icon';

const points = [
  { icon: 'users', title: 'CRM', text: 'Richieste, lead e trattative del team in un’unica vista.' },
  { icon: 'globe', title: 'Sito web', text: 'Il sito dell’autosalone, con il catalogo veicoli sempre aggiornato.' },
  { icon: 'cloud', title: 'Pubblicazione', text: 'Il catalogo si aggiorna da solo: niente da ripubblicare.' },
];

/** In evidenza: la nuova piattaforma GPW in primo piano; Gest Park resta il gestionale (cloud o locale). */
export function GpwSpotlight() {
  return (
    <section className="bg-ambient relative isolate overflow-hidden px-6 py-24">
      <span aria-hidden className="cs-orb -z-10" style={{ right: '-8%', top: '10%', width: 520, height: 520, background: 'radial-gradient(circle, rgba(43,179,155,.22), transparent 68%)', ['--d' as string]: '30s' }} />
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 min-[980px]:grid-cols-[.9fr_1.1fr]">
        <Reveal className="flex flex-col gap-7">
          <Image src="/brand/gpw-wordmark.png" alt="Gest Park Web" width={240} height={42} />
          <SectionHeading eyebrow="In evidenza · Gest Park Web" title="La nuova piattaforma per CRM e sito web."
            lead="Gest Park Web mette in primo piano clienti, richieste e veicoli online. Gest Park resta il gestionale, in cloud o in locale: non una sola piattaforma, ma un unico ambiente." />
          <ul className="flex flex-col gap-3">
            {points.map((t) => (
              <li key={t.title} className="flex items-start gap-3">
                <span className="bg-gpw flex size-10 flex-none items-center justify-center rounded-xl text-white shadow-sm"><Icon name={t.icon} size={18} /></span>
                <span className="flex flex-col"><span className="text-[15px] font-semibold text-ink">{t.title}</span><span className="text-sm leading-relaxed text-ink-2">{t.text}</span></span>
              </li>
            ))}
          </ul>
          <div className="glass-medium flex flex-wrap items-center gap-4 rounded-2xl p-4">
            <span className="flex items-center gap-3"><SoftwareIcon slug="gest-park" size={40} /><span className="flex flex-col"><span className="text-sm font-semibold text-ink">Gest Park</span><span className="text-xs text-ink-muted">Gestionale · cloud o locale</span></span></span>
            <span aria-hidden className="text-xl text-ink-muted">+</span>
            <span className="flex items-center gap-3"><SoftwareIcon slug="gest-park-web" size={40} /><span className="flex flex-col"><span className="text-sm font-semibold text-ink">Gest Park Web</span><span className="text-xs text-ink-muted">CRM e sito web</span></span></span>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/software#gest-park-web" arrow>Scopri Gest Park Web</ButtonLink>
            <ButtonLink href="/software/gest-park" variant="secondary">Gest Park, il gestionale</ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ParallaxStage className="relative mx-auto aspect-[4/3] w-full max-w-[640px]">
            <Layer depth={-10} className="absolute inset-0">
              <Image src="/gpw/gpw-crm-trattative-inclinato.webp" alt="Gest Park Web: trattative del CRM" fill sizes="(min-width: 980px) 560px, 90vw" className="object-contain drop-shadow-2xl" />
            </Layer>
            <Layer depth={26} className="cs-float absolute -left-3 top-[8%] w-[44%] max-w-[260px]" style={{ ['--delay' as string]: '-1s' }}>
              <Image src="/gpw/widget-lead-caldo.webp" alt="Notifica: lead caldo" width={900} height={527} className="h-auto w-full drop-shadow-xl" />
            </Layer>
            <Layer depth={34} className="cs-float absolute -right-2 top-[34%] w-[34%] max-w-[210px]" style={{ ['--delay' as string]: '-3s' }}>
              <Image src="/gpw/widget-sito-online.webp" alt="Widget: sito online" width={900} height={434} className="h-auto w-full drop-shadow-xl" />
            </Layer>
            <Layer depth={20} className="cs-float absolute -bottom-2 left-[12%] w-[34%] max-w-[210px]" style={{ ['--delay' as string]: '-4s' }}>
              <Image src="/gpw/widget-kpi-veicoli.webp" alt="Widget: veicoli online" width={900} height={505} className="h-auto w-full drop-shadow-xl" />
            </Layer>
          </ParallaxStage>
        </Reveal>
      </div>
    </section>
  );
}
