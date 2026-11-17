'use client';

import { useState } from 'react';

import { Icon } from '@/components/ui/icon';

const LAT = 41.2548321;
const LNG = 13.7131244;
const EMBED = `https://www.google.com/maps?q=${LAT},${LNG}&z=16&hl=it&output=embed`;
const OPEN = 'https://maps.app.goo.gl/VBXZBm7DMxFntRAT6';

/**
 * Mappa integrata della sede. Google Maps viene caricato solo dopo il clic: finché non lo richiedi,
 * nessun dato o cookie di terze parti parte dal tuo browser.
 */
export function MapEmbed({ address }: Readonly<{ address: string }>) {
  const [on, setOn] = useState(false);
  return (
    <div className="relative h-[380px] overflow-hidden rounded-[28px] border border-border-subtle bg-n-50 shadow-sm md:h-[440px]">
      {on ? (
        <iframe title="Mappa della sede Cedi Soft" src={EMBED} className="size-full border-0" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <div className="bg-ambient flex size-full flex-col items-center justify-center gap-5 p-8 text-center">
          <span aria-hidden className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(rgba(39,71,152,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(39,71,152,.07) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
          <span className="bg-digital relative flex size-16 items-center justify-center rounded-full text-white shadow-lg"><Icon name="map-pin" size={28} /></span>
          <span className="relative flex flex-col gap-1">
            <span className="text-xl font-semibold tracking-[-0.02em] text-ink">Dove siamo</span>
            <address className="text-[15px] not-italic text-ink-2">{address}</address>
          </span>
          <span className="relative flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => setOn(true)}
              className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-blue-600 px-5 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              Mostra la mappa
            </button>
            <a href={OPEN} target="_blank" rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-blue-900/[.12] bg-white px-5 text-sm font-medium text-ink hover:border-sky-500">
              Apri in Google Maps<Icon name="arrow-up-right" size={15} />
            </a>
          </span>
          <span className="relative max-w-sm text-xs text-ink-muted">La mappa è fornita da Google: viene caricata solo se la richiedi.</span>
        </div>
      )}
    </div>
  );
}
