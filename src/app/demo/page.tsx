import type { Metadata } from 'next';

import { ContactForm } from '@/components/ui/contact-form';
import { PageHero, SectionHeading } from '@/components/ui/section';
import { content } from '@/content/source';

export const metadata: Metadata = {
  title: 'Richiedi una demo',
  description: 'Richiedi una dimostrazione dei software Cedi Soft sui casi del tuo lavoro.',
  alternates: { canonical: '/demo' },
};

type SearchParams = Promise<{ prodotto?: string | string[] }>;

export default async function DemoPage({ searchParams }: { searchParams: SearchParams }) {
  const [contacts, products] = await Promise.all([content.getContacts(), content.getProducts()]);
  const names = products.map((p) => p.name);
  const wanted = (await searchParams).prodotto;
  const defaultProduct = typeof wanted === 'string' && names.includes(wanted) ? wanted : '';
  return (
    <>
      <PageHero eyebrow="Demo" title="Vedi il software al lavoro." lead="Indicaci quale software ti interessa: ti mostreremo una dimostrazione sui casi del tuo lavoro."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Richiedi una demo' }]} />
      <section className="px-6 pb-24 pt-4">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1fr_1.1fr]">
          <SectionHeading eyebrow="Richiesta di demo" title="Ti contattiamo per concordarla."
            lead="Compila il modulo: ti risponderemo per fissare una dimostrazione, in sede o a distanza." />
          <div className="rounded-[28px] border border-border-subtle bg-white p-8 shadow-sm">
            <ContactForm type="DEMO" toEmail={contacts.email} phones={contacts.phones} productOptions={names} defaultProduct={defaultProduct} />
          </div>
        </div>
      </section>
    </>
  );
}
