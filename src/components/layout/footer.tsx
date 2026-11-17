import { productHref } from '@/content/links';
import Image from 'next/image';
import Link from 'next/link';

import { Icon } from '@/components/ui/icon';
import type { Contacts, FooterColumn, Product } from '@/content/types';

const heading = 'eyebrow mb-1 !tracking-[.08em]';
const link = 'text-sm leading-snug text-n-700 transition-colors hover:text-blue-600';

interface FooterProps {
  contacts: Contacts;
  tagline: string;
  products: Product[];
  columns: FooterColumn[];
  legalLabels: string[];
  loginUrl: string;
}

export function Footer({ contacts, tagline, products, columns, legalLabels, loginUrl }: Readonly<FooterProps>) {
  return (
    <footer className="relative border-t border-border-subtle bg-n-25 px-6 pb-8 pt-[72px]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-14">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,170px),1fr))] gap-x-8 gap-y-10">
          <div className="flex min-w-[min(100%,260px)] max-w-[360px] flex-col gap-[18px] sm:col-span-2">
            <Image src="/brand/cedisoft-logo.png" alt="Cedi Soft" width={400} height={120} className="h-auto w-[200px]" />
            <p className="text-[15px] leading-relaxed text-ink-2 [text-wrap:pretty]">{tagline}</p>
            <address className="flex flex-col gap-2 text-sm not-italic text-ink-2">
              <span className="flex items-center gap-2.5"><Icon name="map-pin" size={15} />{contacts.address}</span>
              <span className="flex items-center gap-2.5"><Icon name="phone" size={15} />
                {contacts.phones.map((p, i) => (<span key={p.href}>{i > 0 && ' · '}<a href={p.href} className="hover:text-blue-600">{p.label}</a></span>))}
              </span>
              <span className="flex items-center gap-2.5"><Icon name="mail" size={15} /><a href={`mailto:${contacts.email}`} className="hover:text-blue-600">{contacts.email}</a></span>
            </address>
          </div>

          <nav aria-label="Software" className="flex flex-col gap-3">
            <span className={heading}>Software</span>
            {products.map((p) => (
              <Link key={p.slug} href={productHref(p)} className={link}>{p.name}</Link>
            ))}
          </nav>

          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title} className="flex flex-col gap-3">
              <span className={heading}>{c.title}</span>
              {c.links.map((l) => (<Link key={l.href} href={l.href} className={link}>{l.label}</Link>))}
            </nav>
          ))}

          <div className="flex flex-col gap-3">
            <span className={heading}>Risorse</span>
            <a href={loginUrl} className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-blue-600">
              <Icon name="circle-user-round" size={15} />Area Clienti
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-7 gap-y-4 border-t border-border-subtle pt-6 text-[13px] leading-normal text-ink-muted">
          <span>© 1989–{new Date().getFullYear()} {contacts.company} · {contacts.vat}</span>
          {/* Testi legali da fornire: le voci diventeranno link quando le pagine esisteranno. */}
          <ul className="flex flex-wrap gap-5">{legalLabels.map((l) => (<li key={l}>{l}</li>))}</ul>
        </div>
      </div>
    </footer>
  );
}
