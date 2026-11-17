import type { Metadata } from 'next';
import { Suspense } from 'react';

import { CatalogBrowser } from '@/components/software/catalog-browser';
import { ButtonLink } from '@/components/ui/button';
import { PageHero } from '@/components/ui/section';
import { content } from '@/content/source';

export const metadata: Metadata = {
  title: 'Software',
  description: 'Software verticali Cedi Soft per autosaloni, carrozzerie, periti, autonoleggi e attività commerciali.',
  alternates: { canonical: '/software' },
};

export default async function SoftwarePage() {
  const [products, sectors] = await Promise.all([content.getProducts(), content.getSectors()]);
  return (
    <>
      <PageHero eyebrow="Catalogo" title="Soluzioni software per ogni esigenza professionale."
        lead="Dagli autosaloni alle carrozzerie, dai periti alle attività commerciali: software verticali sviluppati da Cedi Soft per settori diversi, con la stessa attenzione ai processi di lavoro."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Software' }]} />
      <section className="px-6 pb-24 pt-10">
        <div className="mx-auto max-w-[1200px]">
          <Suspense fallback={null}><CatalogBrowser products={products} sectors={sectors} /></Suspense>
        </div>
      </section>
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-[1200px] gap-5 md:grid-cols-2">
          {[
            { eyebrow: 'Su misura', title: 'Non trovi quello che ti serve?', text: 'Sviluppiamo software personalizzati e integrazioni attorno ai tuoi processi.', href: '/servizi#sviluppo', cta: 'Scopri lo sviluppo su misura' },
            { eyebrow: 'Demo', title: 'Vuoi vedere un software in azione?', text: 'Richiedi una dimostrazione: ti mostreremo il software sui casi del tuo lavoro.', href: '/demo', cta: 'Richiedi una demo' },
          ].map((c) => (
            <div key={c.title} className="flex flex-col items-start gap-4 rounded-[24px] border border-border-subtle bg-n-25 p-8">
              <span className="eyebrow !text-sky-600">{c.eyebrow}</span>
              <h2 className="text-2xl font-semibold tracking-[-0.025em] text-ink">{c.title}</h2>
              <p className="text-ink-2">{c.text}</p>
              <ButtonLink href={c.href} variant="ghost" arrow>{c.cta}</ButtonLink>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
