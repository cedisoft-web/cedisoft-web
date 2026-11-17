'use client';

import { useRef } from 'react';

import { Icon } from '@/components/ui/icon';
import { SoftwareIcon } from '@/components/ui/software-icon';
import { ButtonLink } from '@/components/ui/button';
import type { Product } from '@/content/types';

const orbs = [
  { left: '-6%', top: '-10%', size: 560, color: 'rgba(69,154,213,.30)', d: 26, delay: 0 },
  { left: '64%', top: '-4%', size: 520, color: 'rgba(39,71,152,.20)', d: 32, delay: -8 },
  { left: '38%', top: '46%', size: 420, color: 'rgba(52,166,59,.12)', d: 36, delay: -14 },
];

/**
 * Hero: orb ambient, bagliore e parallax che seguono il cursore. Il movimento è attivo solo con
 * puntatore preciso, sopra 900px e senza prefers-reduced-motion; altrimenti la composizione è statica.
 */
export function Hero({ showcase }: Readonly<{ showcase: Product[] }>) {
  const root = useRef<HTMLElement>(null);

  function onMove(e: React.PointerEvent<HTMLElement>) {
    const el = root.current;
    if (!el) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 900px) and (prefers-reduced-motion: no-preference)').matches;
    if (!fine) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--hx', `${x * 100}%`);
    el.style.setProperty('--hy', `${y * 100}%`);
    el.style.setProperty('--mx', String((x - 0.5) * 2));
    el.style.setProperty('--my', String((y - 0.5) * 2));
  }
  function onLeave() {
    root.current?.style.setProperty('--mx', '0');
    root.current?.style.setProperty('--my', '0');
  }

  return (
    <section ref={root} onPointerMove={onMove} onPointerLeave={onLeave}
      className="hero bg-ambient relative isolate overflow-hidden px-6 pb-24 pt-40 [--mx:0] [--my:0]">
      {orbs.map((o, i) => (
        <span key={i} aria-hidden className="cs-orb -z-10"
          style={{ left: o.left, top: o.top, width: o.size, height: o.size, background: `radial-gradient(circle, ${o.color}, transparent 68%)`, ['--d' as string]: `${o.d}s`, ['--delay' as string]: `${o.delay}s` }} />
      ))}
      <div aria-hidden className="hero-glow -z-10" />

      <div className="mx-auto grid max-w-[1200px] items-center gap-14 min-[960px]:grid-cols-[1.05fr_.95fr]">
        <div className="flex flex-col gap-6">
          <span className="eyebrow">Software house italiana · dal 1989</span>
          <h1 className="text-[clamp(40px,6vw,72px)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink [text-wrap:balance]">
            Software che semplifica. <span className="bg-brand-gradient bg-clip-text text-transparent">Tecnologia che evolve.</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-ink-2 [text-wrap:pretty]">
            Progettiamo e sviluppiamo soluzioni software per aziende e professionisti, trasformando esigenze complesse in strumenti di lavoro semplici, affidabili e su misura.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/software" size="lg" arrow>Scopri i software</ButtonLink>
            <ButtonLink href="/azienda#contatti" size="lg" variant="secondary">Contattaci</ButtonLink>
          </div>
        </div>

        {/* Showcase: prodotti reali del catalogo (le anteprime UI arriveranno con gli screenshot approvati) */}
        <div className="relative mx-auto h-[360px] w-full max-w-[520px] [perspective:1200px] min-[900px]:h-[440px]" aria-label="Software in evidenza">
          <div className="absolute inset-0 flex flex-col justify-center gap-4 [transform-style:preserve-3d] min-[900px]:[transform:rotateX(calc(8deg-var(--my)*3deg))_rotateY(calc(var(--mx)*4deg))]"
            style={{ transition: 'transform 200ms ease-out' }}>
            {showcase.map((p, i) => (
              <div key={p.slug} className="glass-medium flex items-center gap-4 rounded-[22px] p-4 shadow-md"
                style={{ marginLeft: `${i % 2 === 0 ? 0 : 36}px`, marginRight: `${i % 2 === 0 ? 36 : 0}px`, transform: `translate3d(calc(var(--mx) * ${(i + 1) * 8}px), calc(var(--my) * ${(i + 1) * 5}px), ${(2 - i) * 20}px)` }}>
                <SoftwareIcon slug={p.slug} size={52} />
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="text-[17px] font-semibold tracking-[-0.015em] text-ink">{p.name}</span>
                  <span className="truncate text-[13px] text-ink-2">{p.category}</span>
                </span>
              </div>
            ))}
          </div>
          {/* Loghi dei software: fluttuano e seguono il cursore */}
          {[
            { slug: 'gest-park-web', cls: '-right-4 -top-8 min-[900px]:-right-10', size: 84, depth: 26, rot: 8, delay: -1 },
            { slug: 'gest-rent', cls: '-left-6 top-[38%] min-[900px]:-left-12', size: 64, depth: -20, rot: -9, delay: -3 },
            { slug: 'gest-crash-cpew', cls: '-right-2 bottom-[18%] min-[900px]:-right-8', size: 60, depth: 34, rot: 7, delay: -2 },
          ].map((l) => (
            <span key={l.slug} aria-hidden className={'pointer-events-none absolute ' + l.cls} style={{ transform: `translate3d(calc(var(--mx) * ${l.depth}px), calc(var(--my) * ${l.depth * 0.6}px), 0)`, transition: 'transform 200ms ease-out' }}>
              <span className="cs-float block" style={{ ['--delay' as string]: `${l.delay}s`, rotate: `${l.rot}deg` }}><SoftwareIcon slug={l.slug} size={l.size} className="drop-shadow-xl" /></span>
            </span>
          ))}
          <span className="absolute -bottom-3 left-0" style={{ transform: 'translate3d(calc(var(--mx) * 18px), calc(var(--my) * 10px), 0)', transition: 'transform 200ms ease-out' }}>
            <span className="cs-float glass-light inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-medium text-ink shadow-sm" style={{ ['--delay' as string]: '-2s' }}>
              <Icon name="cloud" size={15} className="text-sky-600" />Cloud e desktop
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
