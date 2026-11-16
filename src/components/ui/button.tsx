import Link from 'next/link';
import type { ComponentProps } from 'react';

import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-1.5 rounded-full font-medium transition-[background,gap,transform,border-color,color] duration-[220ms] ease-out active:scale-[.98]';
const variants: Record<Variant, string> = {
  primary: 'bg-blue-600 text-white hover:gap-2.5 hover:bg-blue-700',
  secondary: 'border border-blue-900/[.12] bg-white/80 text-ink hover:border-sky-500 hover:bg-white hover:text-blue-600',
  ghost: 'text-blue-600 hover:gap-2.5',
};
const sizes = { md: 'h-11 px-5 text-sm', lg: 'h-[52px] px-6 text-base' } as const;

interface Common {
  variant?: Variant;
  size?: keyof typeof sizes;
  arrow?: boolean;
}

/** Pulsante a pillola come da design system: hover = colore più scuro + freccia che avanza. */
export function ButtonLink({
  variant = 'primary', size = 'md', arrow, className, children, href, ...rest
}: Common & Omit<ComponentProps<'a'>, 'href'> & { href: string }) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {children}
      {arrow && <Icon name="arrow-right" size={size === 'lg' ? 17 : 15} />}
    </>
  );
  // Link esterni (Platform, tel:, mailto:) restano <a>: nessun routing client.
  if (/^(https?:|tel:|mailto:)/.test(href)) {
    return <a href={href} className={classes} {...rest}>{content}</a>;
  }
  return <Link href={href} className={classes} {...rest}>{content}</Link>;
}
