'use client';

import { useState } from 'react';

import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';
import type { WorkPhase } from '@/content/types';

/** Le quattro fasi di lavoro: selettore orizzontale con barra di avanzamento e pannello di dettaglio. */
export function WorkPhases({ phases }: Readonly<{ phases: WorkPhase[] }>) {
  const [i, setI] = useState(0);
  const cur = phases[i];
  return (
    <div className="flex flex-col gap-6">
      <div role="tablist" aria-label="Fasi di lavoro" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {phases.map((p, k) => (
          <button key={p.title} role="tab" type="button" id={`ph-tab-${k}`} aria-selected={k === i} aria-controls="ph-panel" onClick={() => setI(k)}
            className={cn('relative flex cursor-pointer flex-col gap-3 overflow-hidden rounded-[18px] border p-4 text-left transition-colors',
              k === i ? 'border-sky-500/45 bg-white shadow-sm' : 'border-border-subtle bg-transparent hover:bg-white/60')}>
            <span className="flex items-center justify-between">
              <span className={cn('font-mono text-xs', k === i ? 'text-blue-600' : 'text-n-400')}>0{k + 1}</span>
              <Icon name={p.icon} size={18} className={k === i ? 'text-blue-600' : 'text-n-400'} />
            </span>
            <span className="text-[15px] font-semibold text-ink">{p.title}</span>
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-border-subtle"><span className="block h-full bg-brand-gradient transition-[width] duration-500 ease-out" style={{ width: k <= i ? '100%' : '0%' }} /></span>
          </button>
        ))}
      </div>
      {cur && (
        <div id="ph-panel" role="tabpanel" aria-labelledby={`ph-tab-${i}`} key={i} className="flex flex-col gap-5 rounded-[24px] border border-border-subtle bg-white p-8 motion-safe:animate-[ft-in_320ms_var(--ease-out)]">
          <p className="max-w-2xl text-[17px] leading-relaxed text-ink">{cur.text}</p>
          <ul className="grid gap-3 sm:grid-cols-3">
            {cur.items.map((t) => (
              <li key={t} className="flex items-start gap-3 rounded-2xl bg-n-25 p-4 text-sm text-ink-2">
                <Icon name="check" size={16} className="mt-0.5 flex-none text-green-700" />{t}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
