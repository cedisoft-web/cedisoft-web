'use client';

import type { ComponentProps } from 'react';

import { cn } from '@/lib/cn';

/** Card bianca con bagliore che segue il cursore. Il movimento è in CSS (.spotlight), solo con puntatore preciso. */
export function SpotlightCard({ className, onPointerMove, ...rest }: ComponentProps<'div'>) {
  return (
    <div
      {...rest}
      className={cn('spotlight rounded-[20px] border border-border-subtle bg-white shadow-xs', className)}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
        onPointerMove?.(e);
      }}
    />
  );
}
