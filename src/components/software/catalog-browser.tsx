'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import { Icon } from '@/components/ui/icon';
import { ProductCard } from '@/components/ui/product-card';
import { ButtonLink } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import type { Product, Sector } from '@/content/types';

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

/** Catalogo filtrabile per settore (sincronizzato con ?settore=) e per testo. Filtri lato client su dati già caricati. */
export function CatalogBrowser({ products, sectors }: Readonly<{ products: Product[]; sectors: Sector[] }>) {
  const router = useRouter();
  const params = useSearchParams();
  const fromUrl = params.get('settore');
  const sector = sectors.some((s) => s.id === fromUrl) ? fromUrl : null;
  const [query, setQuery] = useState('');

  const list = useMemo(() => {
    const q = norm(query.trim());
    return products.filter((p) =>
      (!sector || p.sectors.includes(sector as Sector['id'])) &&
      (!q || norm(`${p.name} ${p.category} ${p.description}`).includes(q)));
  }, [products, sector, query]);

  function pick(id: string | null) {
    router.replace(id ? `/software?settore=${id}` : '/software', { scroll: false });
  }
  const chip = (on: boolean) => cn('inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors',
    on ? 'border-blue-900 bg-blue-900 text-white' : 'border-blue-900/[.12] bg-white text-n-700 hover:border-sky-500');
  const filtered = sector !== null || query.trim() !== '';

  return (
    <div className="flex flex-col gap-8">
      <div className="sticky top-[92px] z-30 flex flex-col gap-3 rounded-[20px] border border-border-subtle bg-white/90 p-3 shadow-sm backdrop-blur-[14px] md:flex-row md:items-center">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtra per settore">
          <button type="button" aria-pressed={sector === null} onClick={() => pick(null)} className={chip(sector === null)}>Tutti</button>
          {sectors.map((s) => (
            <button key={s.id} type="button" aria-pressed={sector === s.id} onClick={() => pick(s.id)} className={chip(sector === s.id)}>
              <Icon name={s.icon} size={15} />{s.label}
            </button>
          ))}
        </div>
        <label className="relative md:ml-auto md:w-64">
          <span className="sr-only">Cerca un software</span>
          <Icon name="search" size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-n-400" />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cerca un software"
            className="h-10 w-full rounded-full border border-border-default bg-white pl-10 pr-4 text-sm text-ink placeholder:text-n-400 focus:border-sky-500" />
        </label>
      </div>

      <div className="flex items-center gap-4" role="status" aria-live="polite">
        <span className="text-sm text-ink-muted">{list.length === 1 ? '1 software' : `${list.length} software`}</span>
        {filtered && (
          <button type="button" className="cursor-pointer text-sm font-medium text-blue-600 hover:underline" onClick={() => { setQuery(''); pick(null); }}>Azzera filtri</button>
        )}
      </div>

      {list.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      ) : (
        <div className="flex flex-col items-start gap-4 rounded-[20px] border border-border-subtle bg-n-25 p-8">
          <span className="text-xl font-semibold text-ink">Nessun software trovato{query.trim() && ` per «${query.trim()}»`}</span>
          <p className="max-w-lg text-ink-2">Prova con un altro termine o un altro settore. Se cerchi una soluzione specifica, possiamo valutare uno sviluppo su misura.</p>
          <ButtonLink href="/azienda#contatti" variant="secondary">Contattaci</ButtonLink>
        </div>
      )}
    </div>
  );
}
