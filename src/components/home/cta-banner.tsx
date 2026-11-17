import { Layer, ParallaxStage } from '@/components/home/parallax-stage';
import { ButtonLink } from '@/components/ui/button';
import { SoftwareIcon } from '@/components/ui/software-icon';

/** Banner finale: testo a sinistra, loghi dei software sovrapposti al bordo con movimento al cursore. */
export function CtaBanner() {
  return (
    <section className="px-6 pb-24">
      <ParallaxStage className="relative mx-auto max-w-[1200px]">
        <div className="relative overflow-hidden rounded-[32px] bg-digital px-8 py-16 md:px-16">
          <span aria-hidden className="cs-orb" style={{ left: '60%', top: '-30%', width: 480, height: 480, background: 'radial-gradient(circle, rgba(255,255,255,.22), transparent 68%)', ['--d' as string]: '30s' }} />
          <span aria-hidden className="cs-orb" style={{ left: '-10%', top: '50%', width: 380, height: 380, background: 'radial-gradient(circle, rgba(52,166,59,.25), transparent 68%)', ['--d' as string]: '34s', ['--delay' as string]: '-10s' }} />
          <div className="relative flex max-w-xl flex-col gap-6">
            <h2 className="text-[clamp(28px,4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] text-white [text-wrap:balance]">Raccontaci come lavori. Troveremo lo strumento giusto.</h2>
            <p className="text-[17px] leading-relaxed text-[#DCE4F6]">Richiedi una demo di un nostro software o parlaci di un progetto su misura.</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/demo" size="lg" className="!bg-white !text-blue-700 hover:!bg-blue-50" arrow>Richiedi una demo</ButtonLink>
              <ButtonLink href="/software" size="lg" className="border border-white/40 text-white hover:bg-white/10">Scopri i software</ButtonLink>
            </div>
          </div>
        </div>
        {/* Loghi sovrapposti al banner: sporgono dal bordo, visibili da tablet in su */}
        <div aria-hidden className="pointer-events-none absolute right-6 top-1/2 hidden h-[340px] w-[380px] -translate-y-1/2 md:block lg:right-14">
          <Layer depth={26} className="cs-float absolute right-2 top-0 rotate-[8deg]" style={{ ['--delay' as string]: '-1s' }}><SoftwareIcon slug="gest-park-web" size={132} className="drop-shadow-2xl" /></Layer>
          <Layer depth={-20} className="cs-float absolute left-0 top-10 -rotate-[10deg]" style={{ ['--delay' as string]: '-3s' }}><SoftwareIcon slug="gest-crash-carw" size={96} className="drop-shadow-2xl" /></Layer>
          <Layer depth={36} className="cs-float absolute bottom-0 left-16 rotate-[6deg]" style={{ ['--delay' as string]: '-2s' }}><SoftwareIcon slug="gest" size={108} className="drop-shadow-2xl" /></Layer>
          <Layer depth={-30} className="cs-float absolute -bottom-6 right-0 -rotate-[8deg]" style={{ ['--delay' as string]: '-4s' }}><SoftwareIcon slug="gest-rent" size={88} className="drop-shadow-2xl" /></Layer>
        </div>
      </ParallaxStage>
    </section>
  );
}
