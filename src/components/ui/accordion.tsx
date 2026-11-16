'use client';

import { useId, useState } from 'react';

import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';
import type { FaqItem } from '@/content/types';

/** Accordion accessibile (pulsante + regione), altezza animata con grid-rows. */
export function Accordion({ items }: Readonly<{ items: FaqItem[] }>) {
  const [open, setOpen] = useState<number | null>(null);
  const uid = useId();
  return (
    <div className="flex flex-col divide-y divide-border-subtle rounded-[20px] border border-border-subtle bg-white">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.question}>
            <h3>
              <button
                type="button" aria-expanded={isOpen} aria-controls={`${uid}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-ink"
              >
                {it.question}
                <Icon name="chevron-down" className={cn('flex-none text-n-400 transition-transform duration-[240ms]', isOpen && 'rotate-180')} />
              </button>
            </h3>
            <div id={`${uid}-${i}`} role="region" aria-label={it.question}
              className={cn('grid transition-[grid-template-rows] duration-300 ease-out', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
              <div className="overflow-hidden"><p className="px-6 pb-5 text-[15px] leading-relaxed text-ink-2">{it.answer}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
