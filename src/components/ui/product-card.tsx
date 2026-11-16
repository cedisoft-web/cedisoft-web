import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import type { Product } from '@/content/types';

/** Card prodotto. L'anteprima UI arriverà con gli screenshot approvati: niente mock finti in produzione. */
export function ProductCard({ product }: Readonly<{ product: Product }>) {
  const href = product.hasDetailPage ? `/software/${product.slug}` : null;
  const body = (
    <>
      <span className="flex items-start justify-between gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-digital text-white"><Icon name={product.icon} size={20} /></span>
        {product.status && <Badge tone="warning">{product.status.label}</Badge>}
      </span>
      <span className="flex flex-col gap-1.5">
        <span className="eyebrow">{product.category}</span>
        <span className="text-xl font-semibold tracking-[-0.02em] text-ink">{product.name}</span>
        <span className="text-sm leading-relaxed text-ink-2">{product.description}</span>
      </span>
      {href && (
        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-[gap] group-hover:gap-2.5">
          Scopri<Icon name="arrow-right" size={15} />
        </span>
      )}
    </>
  );
  return (
    <SpotlightCard id={product.slug} className="group scroll-mt-28">
      {href
        ? <Link href={href} className="flex h-full flex-col gap-5 rounded-[inherit] p-6">{body}</Link>
        : <div className="flex h-full flex-col gap-5 p-6">{body}</div>}
    </SpotlightCard>
  );
}
