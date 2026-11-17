import Image from 'next/image';
import Link from 'next/link';

import { Icon } from '@/components/ui/icon';
import { Reveal } from '@/components/ui/reveal';
import type { Product, Sector } from '@/content/types';
import { publicAsset } from '@/lib/public-asset';

/** Tonalità di ripiego per settore, usate finché non c'è la fotografia in public/sectors/<id>.jpg. */
const tones: Record<string, string> = {
  automotive: 'linear-gradient(135deg,#192C58,#2F6BBA)',
  carrozzerie: 'linear-gradient(135deg,#7A1245,#F0187A)',
  periti: 'linear-gradient(135deg,#5E6A12,#A3C227)',
  autonoleggio: 'linear-gradient(135deg,#0F5A66,#3DD7E4)',
  amministrazione: 'linear-gradient(135deg,#5A5A12,#CCC135)',
  altre: 'linear-gradient(135deg,#1C3168,#459AD5)',
};

/** Una card per settore: fotografia a tutto riquadro (se presente), zoom e bagliore in hover. */
export function SectorCards({ sectors, products }: Readonly<{ sectors: Sector[]; products: Product[] }>) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sectors.map((s, i) => {
        const photo = publicAsset(`sectors/${s.id}.jpg`);
        const count = products.filter((p) => p.sectors.includes(s.id)).length;
        return (
          <li key={s.id}>
            <Reveal delay={i * 0.05} className="h-full">
              <Link href={`/software?settore=${s.id}`} className="group relative isolate flex min-h-[280px] flex-col justify-end overflow-hidden rounded-[24px] p-6 text-white shadow-md outline-offset-4 transition-shadow duration-300 hover:shadow-lg">
                {/* Duotone: fondo a tinta del settore + foto in luminosità sul colore (mix-blend-luminosity) */}
                <span aria-hidden className="absolute inset-0 -z-20" style={{ background: tones[s.id] ?? tones.altre }} />
                {photo && (
                  <Image src={photo} alt="" fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    className="-z-10 object-cover opacity-80 mix-blend-luminosity grayscale transition-transform duration-700 ease-out motion-safe:group-hover:scale-110" />
                )}
                <Icon name={s.icon} size={150} className="absolute -right-6 -top-6 -z-10 text-white/20 transition-transform duration-700 motion-safe:group-hover:rotate-6 motion-safe:group-hover:scale-110" />
                <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent" />
                <span aria-hidden className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(420px circle at 80% 0%, rgba(255,255,255,.22), transparent 60%)' }} />
                <span className="mb-auto flex size-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/30 backdrop-blur"><Icon name={s.icon} size={20} /></span>
                <span className="mt-12 flex items-end justify-between gap-3">
                  <span className="flex flex-col gap-1">
                    <span className="text-[22px] font-semibold tracking-[-0.025em]">{s.label}</span>
                    <span className="text-[13px] text-white/75">{count === 1 ? '1 software' : `${count} software`}</span>
                  </span>
                  <span className="flex size-10 flex-none items-center justify-center rounded-full bg-white text-blue-900 transition-transform duration-300 group-hover:translate-x-1"><Icon name="arrow-right" size={18} /></span>
                </span>
              </Link>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
