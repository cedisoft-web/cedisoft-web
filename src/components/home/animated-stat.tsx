'use client';

import { animate, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

/** Numero che "scorre" fino al valore quando entra in vista, con riflesso sul gradiente. Con movimento ridotto resta statico. */
export function AnimatedStat({ value, from = 0, prefix = '', duration = 1.8 }: Readonly<{ value: number; from?: number; prefix?: string; duration?: number }>) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const [n, setN] = useState(value);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(from, value, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, from, value, duration]);

  return (
    <span ref={ref} className="cs-shimmer-text bg-brand-gradient bg-clip-text tabular-nums text-transparent" aria-label={`${prefix}${value}`}>
      <span aria-hidden>{prefix}{n}</span>
    </span>
  );
}
