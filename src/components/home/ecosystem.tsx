import Image from 'next/image';
import Link from 'next/link';

import { Layer, ParallaxStage } from '@/components/home/parallax-stage';
import { Icon } from '@/components/ui/icon';
import { Reveal } from '@/components/ui/reveal';
import { SoftwareIcon } from '@/components/ui/software-icon';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { productHref } from '@/content/links';
import type { Product } from '@/content/types';
import { cn } from '@/lib/cn';

/** Sfondo tinto per le card dei software: alone del colore del prodotto + filigrana dell'icona. */
function tint(color: string) {
  return { background: `radial-gradient(90% 80% at 100% 0%, color-mix(in srgb, ${color} 22%, transparent), transparent 62%), radial-gradient(70% 60% at 0% 100%, color-mix(in srgb, ${color} 10%, transparent), transparent 60%), #fff` };
}

function Chip({ children }: Readonly<{ children: React.ReactNode }>) {
  return <span className="rounded-full bg-white/80 px-3 py-1.5 text-[12px] font-medium text-ink-2 ring-1 ring-border-subtle">{children}</span>;
}

/** Ecosistema: Gest Park Web in primo piano, poi Gest Park, Gest Crash (CPA + CARW) e GEST. */
export function Ecosystem({ products }: Readonly<{ products: Product[] }>) {
  const get = (slug: string) => products.find((p) => p.slug === slug);
  const park = get('gest-park'); const gest = get('gest'); const cpa = get('gest-crash-cpa'); const carw = get('gest-crash-carw');
  const href = productHref;

  return (
    <div className="grid gap-4 min-[980px]:grid-cols-5">
      {/* Gest Park Web: in grande. Testo in alto, dashboard sotto: niente si sovrappone al testo. */}
      <Reveal className="min-[980px]:col-span-3 min-[980px]:row-span-2">
        <ParallaxStage className="bg-gpw-dark relative isolate flex h-full flex-col overflow-hidden rounded-[28px] text-white shadow-lg">
          <span aria-hidden className="cs-orb -z-10" style={{ right: '-10%', top: '-20%', width: 460, height: 460, background: 'radial-gradient(circle, rgba(61,168,74,.45), transparent 68%)', ['--d' as string]: '28s' }} />
          <div className="relative z-10 flex flex-col gap-4 p-8 pb-4 md:p-10 md:pb-4">
            <div className="flex items-center gap-4">
              <Image src="/brand/gpw-icon.png" alt="" width={64} height={64} className="drop-shadow-xl" />
              <Image src="/brand/gpw-wordmark-white.png" alt="Gest Park Web" width={260} height={46} />
            </div>
            <span className="inline-flex w-fit items-center rounded-full bg-white/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[.06em] text-[#BFEFDD] ring-1 ring-white/20">La nuova piattaforma</span>
            <p className="max-w-[520px] text-[17px] leading-relaxed text-[#D5EFE6]">CRM e sito web in un unico ambiente: richieste, trattative, veicoli online e sito dell’autosalone sempre allineati.</p>
            <Link href="/software/gest-park#gest-park-web" className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0B3F34] transition-transform hover:-translate-y-0.5">
              Scopri Gest Park Web <Icon name="arrow-right" size={16} />
            </Link>
          </div>

          {/* Palco: dashboard a filo bordo, widget grandi che escono dal pannello */}
          <div className="relative mt-4 min-h-[300px] flex-1 sm:min-h-[400px]">
            <Layer depth={-12} className="pointer-events-none absolute inset-x-4 bottom-[-12%] sm:inset-x-10">
              <Image src="/gpw/gpw-web-panoramica.webp" alt="Pannello Gest Park Web: panoramica del sito" width={1800} height={1157} sizes="(min-width: 980px) 640px, 90vw" className="h-auto w-full drop-shadow-2xl" />
            </Layer>
            <Layer depth={26} className="cs-float pointer-events-none absolute bottom-4 left-3 w-[56%] max-w-[330px] sm:left-6" style={{ ['--delay' as string]: '-2s' }}>
              <Image src="/gpw/widget-lead-caldo.webp" alt="Notifica: lead caldo" width={900} height={527} className="h-auto w-full drop-shadow-2xl" />
            </Layer>
            <Layer depth={34} className="cs-float pointer-events-none absolute right-3 top-0 w-[46%] max-w-[270px] sm:right-6" style={{ ['--delay' as string]: '-1s' }}>
              <Image src="/gpw/widget-nuova-richiesta.webp" alt="Notifica: nuova richiesta" width={900} height={408} className="h-auto w-full drop-shadow-2xl" />
            </Layer>
            <Layer depth={18} className="cs-float pointer-events-none absolute bottom-2 right-3 hidden w-[34%] max-w-[210px] sm:block sm:right-6" style={{ ['--delay' as string]: '-3.5s' }}>
              <Image src="/gpw/widget-kpi-veicoli.webp" alt="Widget: veicoli online" width={900} height={505} className="h-auto w-full drop-shadow-2xl" />
            </Layer>
          </div>
        </ParallaxStage>
      </Reveal>

      {/* Gest Park */}
      {park && (
        <Reveal delay={0.07} className="min-[980px]:col-span-2">
          <SpotlightCard className="h-full overflow-hidden" style={tint('#34A63B')}>
            <Link href={href(park)} className="group relative flex h-full min-h-[270px] flex-col justify-between gap-6 rounded-[inherit] p-7">
              <Icon name="car-front" size={190} className="pointer-events-none absolute -bottom-10 -right-8 text-[#34A63B]/[.09] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105" />
              <span className="relative flex items-start justify-between">
                <SoftwareIcon slug="gest-park" size={64} className="shadow-[0_14px_30px_-10px_rgba(52,166,59,.7)]" />
                <span className="rounded-full bg-green-100 px-3 py-1 font-mono text-[11px] uppercase tracking-[.06em] text-green-700">Cloud o locale</span>
              </span>
              <span className="relative flex flex-col gap-3">
                <span className="text-[26px] font-semibold tracking-[-0.03em] text-ink">Gest Park</span>
                <span className="text-[15px] leading-relaxed text-ink-2">Il gestionale per autosaloni, in locale o in cloud: vendita di veicoli nuovi e usati, noleggio e pratiche auto.</span>
                <span className="flex flex-wrap gap-2"><Chip>Veicoli nuovi e usati</Chip><Chip>Noleggio</Chip><Chip>Pratiche auto</Chip></span>
              </span>
            </Link>
          </SpotlightCard>
        </Reveal>
      )}

      {/* Gest Crash: CPA + CARW */}
      <Reveal delay={0.14} className="min-[980px]:col-span-2">
        <SpotlightCard className="h-full overflow-hidden" style={tint('#F0187A')}>
          <div className="relative flex h-full min-h-[270px] flex-col justify-between gap-6 rounded-[inherit] p-7">
            <Icon name="wrench" size={190} className="pointer-events-none absolute -bottom-10 -right-8 text-[#F0187A]/[.08]" />
            <span className="relative flex flex-col gap-2">
              <span className="text-[26px] font-semibold tracking-[-0.03em] text-ink">Gest Crash</span>
              <span className="text-[15px] leading-relaxed text-ink-2">Due software, una sola famiglia: per i periti e per le carrozzerie.</span>
            </span>
            <span className="relative grid grid-cols-2 gap-3">
              {[{ p: cpa, slug: 'gest-crash-cpa', label: 'CPA', sub: 'Periti' }, { p: carw, slug: 'gest-crash-carw', label: 'CARW', sub: 'Carrozzerie' }].map((x) => (
                <Link key={x.slug} href={x.p ? href(x.p) : '/software'} className="group flex items-center gap-3 rounded-2xl bg-white/85 p-3 ring-1 ring-border-subtle transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md">
                  <SoftwareIcon slug={x.slug} size={52} className="transition-transform duration-300 group-hover:scale-110" />
                  <span className="flex flex-col"><span className="text-[16px] font-semibold text-ink">{x.label}</span><span className="text-[12px] text-ink-muted">{x.sub}</span></span>
                </Link>
              ))}
            </span>
          </div>
        </SpotlightCard>
      </Reveal>

      {/* GEST: terzo software in vetrina */}
      {gest && (
        <Reveal delay={0.2} className="min-[980px]:col-span-5">
          <SpotlightCard className={cn('overflow-hidden')} style={tint('#A4A332')}>
            <Link href={href(gest)} className="group relative flex flex-col items-start gap-5 rounded-[inherit] p-7 sm:flex-row sm:items-center">
              <Icon name="calculator" size={170} className="pointer-events-none absolute -right-6 -top-8 text-[#A4A332]/[.10] transition-transform duration-500 group-hover:rotate-6" />
              <SoftwareIcon slug="gest" size={72} className="relative shadow-[0_14px_30px_-10px_rgba(164,163,50,.8)]" />
              <span className="relative flex flex-1 flex-col gap-1.5">
                <span className="text-[26px] font-semibold tracking-[-0.03em] text-ink">GEST</span>
                <span className="max-w-2xl text-[15px] leading-relaxed text-ink-2">Il gestionale per le attività: contabilità, vendita al banco e magazzino per aziende e professionisti.</span>
              </span>
              <span className="relative inline-flex items-center gap-2 text-sm font-medium text-blue-700">Scopri GEST <Icon name="arrow-right" size={16} className="transition-transform group-hover:translate-x-1" /></span>
            </Link>
          </SpotlightCard>
        </Reveal>
      )}
    </div>
  );
}
