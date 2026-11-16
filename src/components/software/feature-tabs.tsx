'use client';

import { useState } from 'react';

import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';
import type { FeatureGroup } from '@/content/types';

/** Tab verticali con pannello. Frecce su/giù spostano la selezione (pattern WAI-ARIA tabs). */
export function FeatureTabs({ groups }: Readonly<{ groups: FeatureGroup[] }>) {
  const [i, setI] = useState(0);
  const current = groups[i];

  function onKey(e: React.KeyboardEvent) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const next = (i + (e.key === 'ArrowDown' ? 1 : -1) + groups.length) % groups.length;
    setI(next);
    document.getElementById(`ft-tab-${next}`)?.focus();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <div role="tablist" aria-orientation="vertical" aria-label="Funzionalità" onKeyDown={onKey} className="flex flex-col gap-2">
        {groups.map((g, k) => {
          const on = k === i;
          return (
            <button key={g.title} id={`ft-tab-${k}`} role="tab" type="button" aria-selected={on} aria-controls="ft-panel" tabIndex={on ? 0 : -1} onClick={() => setI(k)}
              className={cn('flex cursor-pointer items-start gap-3.5 rounded-[18px] border p-4 text-left transition-[background,border-color,box-shadow] duration-200',
                on ? 'border-sky-500/45 bg-white shadow-[0_16px_32px_-24px_rgba(25,44,88,.45)]' : 'border-transparent hover:bg-white/60')}>
              <span className={cn('flex size-10 flex-none items-center justify-center rounded-xl', on ? 'bg-[linear-gradient(135deg,#274798,#459AD5)] text-white' : 'bg-white text-blue-600')}><Icon name={g.icon} size={19} /></span>
              <span className="flex flex-col gap-1">
                <span className="text-[15px] font-semibold text-ink">{g.title}</span>
                <span className="text-[13px] leading-snug text-ink-2">{g.summary}</span>
              </span>
            </button>
          );
        })}
      </div>
      {current && (
        <div id="ft-panel" role="tabpanel" aria-labelledby={`ft-tab-${i}`} key={i}
          className="flex flex-col gap-6 rounded-[24px] border border-border-subtle bg-white p-8 motion-safe:animate-[ft-in_320ms_var(--ease-out)]">
          <h3 className="text-2xl font-semibold tracking-[-0.025em] text-ink">{current.title}</h3>
          <p className="text-[16px] leading-relaxed text-ink-2">{current.body}</p>
          {current.items.length > 0 && (
            <ul className="flex flex-col divide-y divide-border-subtle">
              {current.items.map((it) => (
                <li key={it.title} className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0">
                  <span className="font-semibold text-ink">{it.title}</span>
                  <span className="text-[15px] leading-relaxed text-ink-2">{it.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
