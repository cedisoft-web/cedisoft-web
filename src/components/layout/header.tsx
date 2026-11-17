'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';
import type { MegaGroup, NavLink, Product } from '@/content/types';
import type { ClientAreaLink } from '@/lib/platform';
import { productHref } from '@/content/links';

interface HeaderProps {
  links: NavLink[];
  soonLinks: NavLink[];
  megaGroups: MegaGroup[];
  products: Product[];
  /** URL del login Cedi Platform (variabile d'ambiente). */
  loginUrl: string;
  /** Voci del pannello che si apre in hover su "Area Clienti". */
  accountLinks: ClientAreaLink[];
}

const pill =
  'inline-flex items-center rounded-[10px] px-3 h-[38px] text-sm font-medium text-n-700 transition-colors hover:bg-blue-600/[.06] hover:text-ink';

/** Navbar flottante in vetro: si compatta oltre 24px di scroll. Mega menu Software, menu mobile < 1080px. */
export function Header({ links, soonLinks, megaGroups, products, loginUrl, accountLinks }: Readonly<HeaderProps>) {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [mobileSoftware, setMobileSoftware] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  const closeAll = useCallback(() => { setMega(false); setMobile(false); }, []);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeAll(); };
    const onDown = (e: MouseEvent) => { if (root.current && !root.current.contains(e.target as Node)) closeAll(); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [closeAll]);

  useEffect(() => { closeAll(); }, [pathname, closeAll]);

  const bySlug = (slug: string) => products.find((p) => p.slug === slug);
  
  const active = (href: string) => !href.includes('#') && (pathname === href || pathname.startsWith(`${href}/`));
  const softwareActive = pathname === '/software' || pathname.startsWith('/software/');

  const underline = <span className="absolute inset-x-3 bottom-1 h-0.5 rounded-sm bg-gradient-to-r from-blue-600 to-sky-500" />;

  return (
    <div
      ref={root}
      onMouseLeave={() => setMega(false)}
      className={cn(
        'fixed left-1/2 z-50 -translate-x-1/2 transition-[top,width] duration-[420ms] ease-out',
        compact ? 'top-2.5' : 'top-4',
        'w-[calc(100%-20px)] min-[1080px]:w-[min(1260px,calc(100%-32px))]',
        compact && 'min-[1080px]:w-[min(1160px,calc(100%-32px))]',
      )}
    >
      <nav
        aria-label="Principale"
        className={cn(
          'flex items-center gap-2 rounded-[18px] border border-white/80 pl-[18px] pr-2 backdrop-blur-[18px] backdrop-saturate-[1.6] transition-[height,background,box-shadow] duration-300',
          'shadow-[inset_0_1px_0_rgba(255,255,255,.9),0_0_0_1px_rgba(25,44,88,.07),var(--nav-shadow)]',
          compact ? 'h-[58px] bg-white/[.86] [--nav-shadow:0_14px_34px_-16px_rgba(25,44,88,.32)]' : 'h-[66px] bg-white/70 [--nav-shadow:0_8px_24px_-18px_rgba(25,44,88,.2)]',
        )}
      >
        <Link href="/" aria-label="Cedi Soft — Home" className="mr-2 flex flex-none items-center">
          <Image
            src="/brand/cedisoft-wordmark.png" alt="Cedi Soft" width={300} height={75} priority
            className={cn('w-auto transition-[height] duration-[420ms] ease-out', compact ? 'h-[22px]' : 'h-[25px]')}
          />
        </Link>

        <div className="mx-auto hidden items-center gap-0.5 min-[1080px]:flex">
          <button
            type="button" aria-expanded={mega} aria-controls="cs-mega"
            onClick={() => setMega((v) => !v)} onMouseEnter={() => setMega(true)}
            className={cn(pill, 'relative gap-1 cursor-pointer', (mega || softwareActive) && 'bg-blue-600/[.06] text-ink')}
          >
            Software
            <Icon name="chevron-down" size={14} className={cn('opacity-60 transition-transform duration-[240ms]', mega && 'rotate-180')} />
            {softwareActive && underline}
          </button>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onMouseEnter={() => setMega(false)}
              aria-current={active(l.href) ? 'page' : undefined}
              className={cn(pill, 'relative', active(l.href) && 'text-ink font-semibold')}>
              {l.label}
              {active(l.href) && underline}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-1.5 min-[1080px]:flex">
          {/* Area Clienti: il click porta al login Platform; in hover/focus si apre il pannello con gli altri accessi */}
          <div className="group relative" onMouseEnter={() => setMega(false)}>
            <a href={loginUrl} aria-haspopup="true"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-blue-900/[.12] bg-white/80 pl-3 pr-3 text-sm font-medium text-ink transition-all duration-[220ms] ease-out hover:border-sky-500 hover:bg-white hover:text-blue-600 group-focus-within:border-sky-500 group-focus-within:bg-white">
              <Icon name="circle-user-round" />Area Clienti
              <Icon name="chevron-down" size={14} className="opacity-60 transition-transform duration-[240ms] group-hover:rotate-180 group-focus-within:rotate-180" />
            </a>
            <div className="invisible absolute right-0 top-full z-10 w-[320px] translate-y-1 pt-2.5 opacity-0 transition-[opacity,transform,visibility] duration-200 ease-out group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="flex flex-col gap-0.5 rounded-[20px] border border-border-subtle bg-white/[.97] p-2 shadow-[0_30px_60px_-28px_rgba(25,44,88,.4)] backdrop-blur-[20px]">
                {accountLinks.map((l) => (
                  <a key={l.href} href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-ink transition-colors hover:bg-n-50">
                    <span className="flex size-[36px] flex-none items-center justify-center rounded-[10px] bg-sky-50 text-blue-600"><Icon name={l.icon} size={18} /></span>
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="text-sm font-semibold leading-tight">{l.label}</span>
                      <span className="text-xs leading-snug text-ink-muted">{l.description}</span>
                    </span>
                    {l.external && <Icon name="arrow-up-right" size={14} className="flex-none text-n-400" />}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <Link href="/azienda#contatti"
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-blue-600 px-4 text-sm font-medium text-white transition-[background,gap] duration-[220ms] hover:gap-2.5 hover:bg-blue-700">
            Richiedi una demo<Icon name="arrow-right" size={15} />
          </Link>
        </div>

        <button type="button" onClick={() => setMobile((v) => !v)} aria-expanded={mobile} aria-controls="cs-mobile"
          aria-label={mobile ? 'Chiudi il menu' : 'Apri il menu'}
          className="ml-auto flex size-11 cursor-pointer items-center justify-center rounded-xl bg-n-50 text-ink min-[1080px]:hidden">
          <Icon name={mobile ? 'x' : 'menu'} size={20} />
        </button>
      </nav>

      {/* Mega menu */}
      <div id="cs-mega" onMouseEnter={() => setMega(true)} inert={!mega}
        className={cn('absolute inset-x-0 top-[calc(100%+10px)] hidden transition-[opacity,transform,visibility] duration-300 ease-out min-[1080px]:block',
          mega ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1.5 opacity-0')}>
        <div className="grid grid-cols-[1fr_1fr_1fr_.9fr] gap-1.5 rounded-[22px] border border-border-subtle bg-white/[.96] p-2.5 shadow-[0_30px_60px_-28px_rgba(25,44,88,.4)] backdrop-blur-[20px] backdrop-saturate-[1.6]">
          {megaGroups.map((g) => (
            <div key={g.label} className="flex flex-col gap-0.5 px-1.5 py-3">
              <span className="eyebrow mx-2.5 mb-2.5">{g.label}</span>
              {g.productSlugs.map(bySlug).filter((p): p is Product => Boolean(p)).map((p) => (
                <Link key={p.slug} href={productHref(p)} className="flex gap-3 rounded-xl px-2.5 py-[9px] text-ink transition-colors hover:bg-n-50">
                  <span className="flex size-[34px] flex-none items-center justify-center rounded-[10px] bg-sky-50 text-blue-600"><Icon name={p.icon} size={17} /></span>
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="flex items-center gap-1.5 text-sm font-semibold leading-tight">
                      {p.name}
                      {p.status && <span className="h-[18px] rounded-full bg-[var(--warning-bg)] px-1.5 text-[10px] font-semibold leading-[18px] text-[var(--warning-fg)]">{p.status.label}</span>}
                    </span>
                    <span className="text-xs leading-snug text-ink-muted">{p.category}</span>
                  </span>
                </Link>
              ))}
            </div>
          ))}
          <div className="flex flex-col justify-between gap-4 rounded-2xl bg-[linear-gradient(150deg,#EEF4FC_0%,#F1F8EF_100%)] p-[22px]">
            <div className="flex flex-col gap-2">
              <span className="eyebrow !text-sky-600">Su misura</span>
              <span className="text-lg font-semibold leading-tight tracking-[-0.015em] text-ink">Software progettato attorno ai tuoi processi</span>
              <span className="text-[13px] leading-normal text-ink-2">Sviluppo personalizzato e integrazione con i sistemi che usi già.</span>
            </div>
            <Link href="/servizi#sviluppo" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-[gap] duration-[240ms] hover:gap-2.5">
              Scopri i servizi<Icon name="arrow-right" size={15} />
            </Link>
          </div>
          <div className="col-span-full flex flex-wrap items-center gap-1.5 rounded-[14px] bg-n-25 p-1.5">
            <Link href="/software" className="inline-flex h-[38px] items-center gap-2 rounded-[10px] px-3 text-[13px] font-semibold text-blue-600 hover:bg-white">
              Catalogo completo<Icon name="arrow-right" size={14} />
            </Link>
            <span className="flex-1" />
            {soonLinks.map((s) => (
              <span key={s.label} className="inline-flex h-[38px] items-center gap-2 rounded-[10px] px-3 text-[13px] font-medium text-ink-2">
                {s.icon && <Icon name={s.icon} size={15} />}{s.label}
                <span className="h-[18px] rounded-full bg-[#EEF1F6] px-1.5 font-mono text-[10px] leading-[18px] tracking-[.04em]">PRESTO</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div id="cs-mobile" inert={!mobile}
        className={cn('absolute inset-x-0 top-[calc(100%+8px)] flex max-h-[calc(100dvh-96px)] flex-col overflow-y-auto rounded-[20px] border border-border-subtle bg-white/[.98] p-2.5 shadow-[0_30px_60px_-30px_rgba(25,44,88,.45)] transition-[opacity,transform,visibility] duration-300 ease-out min-[1080px]:hidden',
          mobile ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1.5 opacity-0')}>
        <button type="button" aria-expanded={mobileSoftware} onClick={() => setMobileSoftware((v) => !v)}
          className="flex min-h-[52px] cursor-pointer items-center justify-between rounded-xl px-3 text-[17px] font-medium text-ink">
          Software
          <Icon name="chevron-down" size={18} className={cn('text-n-400 transition-transform duration-[240ms]', mobileSoftware && 'rotate-180')} />
        </button>
        {mobileSoftware && (
          <div className="flex flex-col gap-0.5 px-1 pb-2">
            {products.map((p) => (
              <Link key={p.slug} href={productHref(p)} className="flex min-h-12 items-center gap-3 rounded-xl px-2.5 py-1.5 text-[15px] font-medium text-ink hover:bg-n-50">
                <span className="flex size-8 flex-none items-center justify-center rounded-[9px] bg-sky-50 text-blue-600"><Icon name={p.icon} size={16} /></span>
                {p.name}
              </Link>
            ))}
            <Link href="/software" className="flex min-h-11 items-center gap-2 px-2.5 text-sm font-semibold text-blue-600">Catalogo completo<Icon name="arrow-right" size={15} /></Link>
          </div>
        )}
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="flex min-h-[52px] items-center justify-between rounded-xl border-t border-blue-900/5 px-3 text-[17px] font-medium text-ink hover:bg-n-50">
            {l.label}<Icon name="chevron-right" size={18} className="text-n-400" />
          </Link>
        ))}
        {soonLinks.map((s) => (
          <span key={s.label} className="flex min-h-12 items-center justify-between border-t border-blue-900/5 px-3 text-[15px] font-medium text-ink-2">
            {s.label}<span className="h-5 rounded-full bg-[#EEF1F6] px-[7px] font-mono text-[10px] leading-5">PRESTO</span>
          </span>
        ))}
        <div className="mt-1.5 flex flex-col gap-2 border-t border-border-subtle px-0.5 pt-3">
          <Link href="/azienda#contatti" className="flex h-[52px] items-center justify-center gap-2 rounded-[14px] bg-blue-600 text-base font-medium text-white">Richiedi una demo<Icon name="arrow-right" size={17} /></Link>
          <a href={loginUrl} className="flex h-[52px] items-center justify-center gap-2 rounded-[14px] border border-blue-900/[.12] text-base font-medium text-ink"><Icon name="circle-user-round" />Area Clienti</a>
          {accountLinks.slice(1).map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center gap-2 rounded-[14px] bg-n-50 text-[15px] font-medium text-ink">
              <Icon name={l.icon} size={17} />{l.label}<Icon name="arrow-up-right" size={14} className="text-n-400" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
