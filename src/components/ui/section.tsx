import Link from 'next/link';

import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';

export function SectionHeading({ eyebrow, title, lead, align = 'left', tone = 'light', className }: Readonly<{
  eyebrow?: string; title: React.ReactNode; lead?: React.ReactNode; align?: 'left' | 'center'; tone?: 'light' | 'dark'; className?: string;
}>) {
  const dark = tone === 'dark';
  return (
    <div className={cn('flex max-w-2xl flex-col gap-3', align === 'center' && 'mx-auto items-center text-center', className)}>
      {eyebrow && <span className={cn('eyebrow', dark && '!text-[#9CC8EC]')}>{eyebrow}</span>}
      <h2 className={cn('text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.08] tracking-[-0.03em] [text-wrap:balance]', dark ? 'text-white' : 'text-ink')}>{title}</h2>
      {lead && <p className={cn('text-[17px] leading-relaxed [text-wrap:pretty]', dark ? 'text-[#C9D6EC]' : 'text-ink-2')}>{lead}</p>}
    </div>
  );
}

export interface Crumb { label: string; href?: string }

export function Breadcrumb({ items, tone = 'light' }: Readonly<{ items: Crumb[]; tone?: 'light' | 'dark' }>) {
  return (
    <nav aria-label="Percorso" className={cn('text-[13px]', tone === 'dark' ? 'text-white/70' : 'text-ink-muted')}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1.5">
            {i > 0 && <Icon name="chevron-right" size={13} />}
            {c.href
              ? <Link href={c.href} className={tone === 'dark' ? 'hover:text-white' : 'hover:text-blue-600'}>{c.label}</Link>
              : <span aria-current="page" className={tone === 'dark' ? 'text-white' : 'text-ink-2'}>{c.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Intestazione di pagina con fondo ambient. Spazio in alto per la navbar flottante. */
export function PageHero({ eyebrow, title, lead, breadcrumb, tone = 'light', children }: Readonly<{
  eyebrow?: string; title: React.ReactNode; lead?: React.ReactNode; breadcrumb?: Crumb[]; tone?: 'light' | 'dark'; children?: React.ReactNode;
}>) {
  const dark = tone === 'dark';
  return (
    <section className={cn('relative isolate overflow-hidden px-6 pb-16 pt-36', dark ? 'bg-digital' : 'bg-ambient')}>
      {dark && <span aria-hidden className="cs-orb -z-10" style={{ right: '-8%', top: '-30%', width: 520, height: 520, background: 'radial-gradient(circle, rgba(255,255,255,.2), transparent 68%)', ['--d' as string]: '30s' }} />}
      <div className="mx-auto flex max-w-[1200px] flex-col gap-5">
        {breadcrumb && <Breadcrumb items={breadcrumb} tone={tone} />}
        {eyebrow && <span className={cn('eyebrow', dark && '!text-[#9CC8EC]')}>{eyebrow}</span>}
        <h1 className={cn('max-w-3xl text-[clamp(36px,5.2vw,64px)] font-semibold leading-[1.04] tracking-[-0.045em] [text-wrap:balance]', dark ? 'text-white' : 'text-ink')}>{title}</h1>
        {lead && <p className={cn('max-w-2xl text-lg leading-relaxed [text-wrap:pretty]', dark ? 'text-[#DCE4F6]' : 'text-ink-2')}>{lead}</p>}
        {children}
      </div>
    </section>
  );
}
