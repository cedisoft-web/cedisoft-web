import Image from 'next/image';

import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';

/** Icone originali dei software (public/brand). Gli slug senza file usano una tessera colorata di ripiego. */
const files: Record<string, string> = {
  'gest-park-web': '/brand/gpw-icon.png',
  gest: '/brand/software/gest.png',
  'gest-rent': '/brand/software/gest-rent.png',
  'gest-crash-carw': '/brand/software/gest-crash-carw.png',
  'gest-crash-cpew': '/brand/software/gest-crash-cpew.png',
  // Per CPA non c'è ancora un'icona dedicata: provvisoriamente quella del perito (CPEW).
  'gest-crash-cpa': '/brand/software/gest-crash-cpew.png',
  eseboll: '/brand/software/eseboll.png',
};

const fallback: Record<string, { color: string; icon: string }> = {
  'gest-park': { color: '#34A63B', icon: 'car-front' },
};

export function SoftwareIcon({ slug, size = 56, className }: Readonly<{ slug: string; size?: number; className?: string }>) {
  const src = files[slug];
  if (src) return <Image src={src} alt="" width={size} height={size} className={cn('flex-none', className)} />;
  const m = fallback[slug] ?? { color: '#274798', icon: 'shapes' };
  return (
    <span aria-hidden className={cn('flex flex-none items-center justify-center text-white shadow-sm', className)}
      style={{ width: size, height: size, borderRadius: size * 0.24, background: `linear-gradient(145deg, ${m.color}, color-mix(in srgb, ${m.color} 72%, black))` }}>
      <Icon name={m.icon} size={Math.round(size * 0.5)} />
    </span>
  );
}
