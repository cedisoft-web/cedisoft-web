import Image from 'next/image';
import Link from 'next/link';

import { Layer, ParallaxStage } from '@/components/home/parallax-stage';
import { Icon } from '@/components/ui/icon';
import { Reveal } from '@/components/ui/reveal';
import { SoftwareIcon } from '@/components/ui/software-icon';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import type { Product } from '@/content/types';

/** Ecosistema: Gest Park Web in primo piano, poi Gest Park, Gest Crash (CPA + CARW) e GEST. */
export function Ecosystem({ products }: Readonly<{ products: Product[] }>) {
  const get = (slug: string) => products.find((p) => p.slug === slug);
  const park = get('gest-park'); const gest = get('gest'); const cpa = get('gest-crash-cpa'); const carw = get('gest-crash-carw');
  const href = (p: Product) => (p.hasDetailPage ? `/software/${p.slug}` : `/software#${p.slug}`);

  return (
    <div className="grid gap-4 min-[980px]:grid-cols-5">
      {/* Gest Park Web: in grande */}
      <Reveal className="min-[980px]:col-span-3 min-[980px]:row-span-2">
        <ParallaxStage className="bg-gpw-dark relative isolate flex h-full min-h-[460px] flex-col justify-between gap-8 overflow-hidden rounded-[28px] p-8 text-white shadow-lg md:p-10">
          <span aria-hidden className="cs-orb -z-10" style={{ right: '-10%', top: '-20%', width: 460, height: 460, background: 'radial-gradient(circle, rgba(61,168,74,.45), transparent 68%)', ['--d' as string]: '28s' }} />
          <div className="relative z-10 flex max-w-[360px] flex-col gap-4">
            <Image src="/brand/gpw-wordmark-white.png" alt="Gest Park Web" width={280} height={49} priority={false} />
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[.06em] text-[#BFEFDD] ring-1 ring-white/20">La nuova piattaforma</span>
            <p className="text-[17px] leading-relaxed text-[#D5EFE6]">CRM e sito web in un unico ambiente: richieste, trattative, veicoli online e sito dell’autosalone sempre allineati.</p>
            <Link href="/software#gest-park-web" className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0B3F34] transition-transform hover:-translate-y-0.5">
              Scopri Gest Park Web <Icon name="arrow-right" size={16} />
            </Link>
          </div>
          <Layer depth={-14} className="pointer-events-none absolute -bottom-10 -right-24 w-[78%] min-w-[420px] max-w-[760px] max-md:-right-40">
            <Image src="/gpw/gpw-web-panoramica.webp" alt="Pannello Gest Park Web: panoramica del sito" width={1800} height={1157} sizes="(min-width: 980px) 45vw, 90vw" className="h-auto w-full drop-shadow-2xl" />
          </Layer>
          <Layer depth={22} className="cs-float pointer-events-none absolute bottom-6 left-6 hidden w-[230px] md:block" style={{ ['--delay' as string]: '-2s' }}>
            <Image src="/gpw/widget-lead-caldo.webp" alt="Notifica: lead caldo" width={900} height={527} className="h-auto w-full drop-shadow-xl" />
          </Layer>
          <Layer depth={30} className="cs-float pointer-events-none absolute right-6 top-6 hidden w-[190px] lg:block">
            <Image src="/gpw/widget-nuova-richiesta.webp" alt="Notifica: nuova richiesta" width={900} height={408} className="h-auto w-full drop-shadow-xl" />
          </Layer>
        </ParallaxStage>
      </Reveal>

      {/* Gest Park */}
      {park && (
        <Reveal delay={0.07} className="min-[980px]:col-span-2">
          <SpotlightCard className="h-full">
            <Link href={href(park)} className="flex h-full min-h-[220px] flex-col justify-between gap-6 rounded-[inherit] p-7">
              <span className="flex items-start justify-between"><SoftwareIcon slug="gest-park" size={56} />
                <span className="rounded-full bg-green-50 px-3 py-1 font-mono text-[11px] uppercase tracking-[.06em] text-green-700">Cloud o locale</span></span>
              <span className="flex flex-col gap-2">
                <span className="text-[24px] font-semibold tracking-[-0.025em] text-ink">Gest Park</span>
                <span className="text-[15px] leading-relaxed text-ink-2">Il gestionale per autosaloni, installato in locale o in cloud: vendita di veicoli nuovi e usati, noleggio e pratiche auto.</span>
              </span>
            </Link>
          </SpotlightCard>
        </Reveal>
      )}

      {/* Gest Crash: CPA + CARW */}
      <Reveal delay={0.14} className="min-[980px]:col-span-2">
        <SpotlightCard className="h-full">
          <div className="flex h-full min-h-[220px] flex-col justify-between gap-6 rounded-[inherit] p-7">
            <span className="flex flex-col gap-1.5">
              <span className="text-[24px] font-semibold tracking-[-0.025em] text-ink">Gest Crash</span>
              <span className="text-[15px] leading-relaxed text-ink-2">Due software, una sola famiglia: per i periti e per le carrozzerie.</span>
            </span>
            <span className="grid grid-cols-2 gap-3">
              {[{ p: cpa, slug: 'gest-crash-cpa', label: 'CPA', sub: 'Periti' }, { p: carw, slug: 'gest-crash-carw', label: 'CARW', sub: 'Carrozzerie' }].map((x) => (
                <Link key={x.slug} href={x.p ? href(x.p) : '/software'} className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-surface-subtle p-3 transition-colors hover:border-sky-300 hover:bg-white">
                  <SoftwareIcon slug={x.slug} size={44} />
                  <span className="flex flex-col"><span className="text-[15px] font-semibold text-ink">{x.label}</span><span className="text-[12px] text-ink-muted">{x.sub}</span></span>
                </Link>
              ))}
            </span>
          </div>
        </SpotlightCard>
      </Reveal>

      {/* GEST: terzo software in vetrina */}
      {gest && (
        <Reveal delay={0.2} className="min-[980px]:col-span-5">
          <SpotlightCard>
            <Link href={href(gest)} className="flex flex-col items-start gap-5 rounded-[inherit] p-7 sm:flex-row sm:items-center">
              <SoftwareIcon slug="gest" size={64} />
              <span className="flex flex-1 flex-col gap-1.5">
                <span className="text-[24px] font-semibold tracking-[-0.025em] text-ink">GEST</span>
                <span className="text-[15px] leading-relaxed text-ink-2">Il gestionale per le attività: contabilità, vendita al banco e magazzino per aziende e professionisti.</span>
              </span>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-blue-700">Scopri GEST <Icon name="arrow-right" size={16} /></span>
            </Link>
          </SpotlightCard>
        </Reveal>
      )}
    </div>
  );
}
