'use client';

import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';
import type { Product, Sector } from '@/content/types';

/** Selettore di settore: elenca i software dedicati. Dati dal ContentSource, nessun contenuto proprio. */
export function SectorExplorer({ sectors, products }: Readonly<{ sectors: Sector[]; products: Product[] }>) {
  const [active, setActive] = useState(sectors[0]?.id);
  const sector = sectors.find((s) => s.id === active);
  const list = products.filter((p) => active && p.sectors.includes(active));

  return (
    <div className="flex flex-col gap-8">
      <div role="tablist" aria-label="Settori" className="flex flex-wrap gap-2">
        {sectors.map((s) => {
          const on = s.id === active;
          return (
            <button key={s.id} role="tab" type="button" id={`tab-${s.id}`} aria-selected={on} aria-controls="sector-panel" onClick={() => setActive(s.id)}
              className={cn('inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200',
                on ? 'border-blue-900 bg-blue-900 text-white' : 'border-blue-900/[.12] bg-white text-n-700 hover:border-sky-500')}>
              <Icon name={s.icon} size={16} />{s.label}
            </button>
          );
        })}
      </div>

      <div id="sector-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="grid gap-4 md:grid-cols-3">
        {list.map((p) => (
          <div key={p.slug} className="flex flex-col gap-3 rounded-[20px] border border-border-subtle bg-white p-5 transition-[box-shadow,transform] duration-300 ease-out motion-safe:hover:-translate-y-1 hover:shadow-md">
            <span className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-xl bg-sky-50 text-blue-600"><Icon name={p.icon} size={19} /></span>
              {p.status && <Badge tone="warning">{p.status.label}</Badge>}
            </span>
            <span className="text-lg font-semibold tracking-[-0.015em] text-ink">{p.name}</span>
            <span className="text-sm leading-relaxed text-ink-2">{p.description}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <span className="text-sm text-ink-muted">{list.length === 1 ? '1 software dedicato' : `${list.length} software dedicati`} · {sector?.label}</span>
        <ButtonLink href={`/software?settore=${active}`} variant="ghost" arrow>Vedi nel catalogo</ButtonLink>
      </div>
    </div>
  );
}
