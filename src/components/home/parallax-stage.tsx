'use client';

import { useRef } from 'react';

import { cn } from '@/lib/cn';

/** Contenitore che espone --mx/--my (-1…1) in base al cursore. Attivo solo con puntatore preciso e senza reduced-motion. */
export function ParallaxStage({ children, className }: Readonly<{ children: React.ReactNode; className?: string }>) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className={cn('[--mx:0] [--my:0] [perspective:1200px]', className)}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || !window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 900px) and (prefers-reduced-motion: no-preference)').matches) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', String(((e.clientX - r.left) / r.width - 0.5) * 2));
        el.style.setProperty('--my', String(((e.clientY - r.top) / r.height - 0.5) * 2));
      }}
      onPointerLeave={() => { ref.current?.style.setProperty('--mx', '0'); ref.current?.style.setProperty('--my', '0'); }}>
      {children}
    </div>
  );
}

/** Livello con profondità: si sposta col cursore di `depth` px. */
export function Layer({ depth = 10, z = 0, className, style, children }: Readonly<{ depth?: number; z?: number; className?: string; style?: React.CSSProperties; children: React.ReactNode }>) {
  return (
    <div className={className} style={{ ...style, transform: `translate3d(calc(var(--mx) * ${depth}px), calc(var(--my) * ${depth * 0.6}px), ${z}px)`, transition: 'transform 220ms ease-out' }}>
      {children}
    </div>
  );
}

/** Inclina i figli in 3D seguendo il cursore (rotazione massima `max` gradi). I figli usano <Layer z={...}> per la profondità. */
export function Tilt({ max = 8, className, children }: Readonly<{ max?: number; className?: string; children: React.ReactNode }>) {
  return (
    <div className={cn('[transform-style:preserve-3d]', className)}
      style={{ transform: `rotateX(calc(var(--my) * ${-max * 0.7}deg)) rotateY(calc(var(--mx) * ${max}deg))`, transition: 'transform 220ms ease-out' }}>
      {children}
    </div>
  );
}
