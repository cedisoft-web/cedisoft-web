import Image from 'next/image';

import { publicAsset } from '@/lib/public-asset';

const partners = [
  { id: 'infocar', name: 'Infocar' },
  { id: 'quattroruote', name: 'Quattroruote' },
  { id: 'dat', name: 'DAT' },
  { id: 'eurotax', name: 'Eurotax' },
  { id: 'seasoft', name: 'Seasoft' },
  { id: 'zucchetti', name: 'Zucchetti' },
];

/** Loghi partner monocolore chiari che scorrono. Se esiste public/partners/<id>.svg|png viene usato (reso bianco), altrimenti il nome in forma di marchio. */
export function PartnerMarquee() {
  const items = partners.map((p) => ({ ...p, src: publicAsset(`partners/${p.id}.svg`) ?? publicAsset(`partners/${p.id}.png`) }));
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex flex-none items-center gap-16 pr-16">
      {items.map((p) => (
        <li key={p.id} className="flex h-12 items-center opacity-70 transition-opacity hover:opacity-100">
          {p.src
            ? <Image src={p.src} alt={hidden ? '' : p.name} width={160} height={48} unoptimized className="h-9 w-auto object-contain brightness-0 invert" />
            : <span className="whitespace-nowrap text-[28px] font-semibold tracking-[-0.04em] text-white">{p.name}</span>}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="cs-marquee-wrap overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]" role="group" aria-label="Partner e integrazioni">
      <div className="cs-marquee flex">{row(false)}{row(true)}</div>
    </div>
  );
}
