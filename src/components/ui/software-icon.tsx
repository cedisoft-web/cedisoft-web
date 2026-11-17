import Image from 'next/image';

import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';
import { publicAsset } from '@/lib/public-asset';

/** Colori e simboli delle icone di prodotto. Se esiste public/brand/software/<slug>.png viene usata l'icona originale. */
const meta: Record<string, { color: string; icon: string }> = {
  'gest-park-web': { color: '#34A63B', icon: 'globe' },
  'gest-park': { color: '#34A63B', icon: 'car-front' },
  gest: { color: '#A4A332', icon: 'calculator' },
  'gest-crash-carw': { color: '#F0187A', icon: 'wrench' },
  'gest-crash-cpa': { color: '#A3C227', icon: 'circle-user-round' },
  'gest-crash-cpew': { color: '#CCC135', icon: 'clipboard-check' },
  'gest-rent': { color: '#3DD7E4', icon: 'key-round' },
};

export function SoftwareIcon({ slug, size = 56, className }: Readonly<{ slug: string; size?: number; className?: string }>) {
  const m = meta[slug] ?? { color: '#274798', icon: 'shapes' };
  const src = slug === 'gest-park-web' ? '/brand/gpw-icon.png' : publicAsset(`brand/software/${slug}.png`);
  if (src) return <Image src={src} alt="" width={size} height={size} className={cn('flex-none', className)} />;
  return (
    <span aria-hidden className={cn('flex flex-none items-center justify-center text-white shadow-sm', className)}
      style={{ width: size, height: size, borderRadius: size * 0.24, background: `linear-gradient(145deg, ${m.color}, color-mix(in srgb, ${m.color} 72%, black))` }}>
      <Icon name={m.icon} size={Math.round(size * 0.5)} />
    </span>
  );
}
