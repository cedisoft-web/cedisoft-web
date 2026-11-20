'use client';

import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/cn';

export interface Screen { id: string; title: string; caption: string; src: string; width: number; height: number }

/** Galleria delle schermate del software: elenco di voci a sinistra, schermata grande a destra (pattern WAI-ARIA tabs). */
export function ScreenGallery({ screens }: Readonly<{ screens: Screen[] }>) {
  const [i, setI] = useState(0);
  const cur = screens[i];

  function onKey(e: React.KeyboardEvent) {
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(e.key)) return;
    e.preventDefault();
    const step = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1;
    const next = (i + step + screens.length) % screens.length;
    setI(next);
    document.getElementById(`sg-tab-${next}`)?.focus();
  }

  if (!cur) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-[210px_1fr] lg:items-start">
      <div role="tablist" aria-label="Schermate di Gest Park" onKeyDown={onKey}
        className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0">
        {screens.map((s, k) => {
          const on = k === i;
          return (
            <button key={s.id} id={`sg-tab-${k}`} role="tab" type="button" aria-selected={on} aria-controls="sg-panel" tabIndex={on ? 0 : -1} onClick={() => setI(k)}
              className={cn('flex-none cursor-pointer rounded-[12px] border px-3.5 py-2 text-left transition-[background,border-color,box-shadow] duration-200 lg:flex-auto',
                on ? 'border-sky-500/45 bg-white shadow-[0_16px_32px_-24px_rgba(25,44,88,.45)]' : 'border-transparent hover:bg-white/70')}>
              <span className={cn('block whitespace-nowrap text-[14px] font-semibold lg:whitespace-normal', on ? 'text-ink' : 'text-ink-2')}>{s.title}</span>
            </button>
          );
        })}
      </div>

      <div id="sg-panel" role="tabpanel" aria-labelledby={`sg-tab-${i}`} className="flex flex-col gap-3">
        <figure key={cur.id} className="overflow-hidden rounded-[16px] border border-border-subtle bg-white shadow-[0_30px_70px_-34px_rgba(25,44,88,.45)] motion-safe:animate-[ft-in_320ms_var(--ease-out)]">
          <Image src={cur.src} alt={`Gest Park: ${cur.title}`} width={cur.width} height={cur.height} sizes="(min-width: 1024px) 840px, 92vw" className="h-auto w-full" />
        </figure>
        <p className="text-[14px] leading-relaxed text-ink-2">{cur.caption}</p>
      </div>
    </div>
  );
}
