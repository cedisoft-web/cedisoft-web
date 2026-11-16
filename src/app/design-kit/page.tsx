import { notFound } from 'next/navigation';

import { Accordion } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { ContactForm } from '@/components/ui/contact-form';
import { ProductCard } from '@/components/ui/product-card';
import { Reveal } from '@/components/ui/reveal';
import { PageHero, SectionHeading } from '@/components/ui/section';
import { contacts } from '@/content/data/company';
import { products } from '@/content/data/products';

/** Vetrina interna dei componenti: esiste solo fuori da produzione. */
export const metadata = { title: 'Design kit', robots: { index: false, follow: false } };

export default function DesignKit() {
  if (process.env.VERCEL_ENV === 'production' || (process.env.NODE_ENV === 'production' && !process.env.VERCEL_ENV && process.env.NEXT_PUBLIC_ASSIST_DEMO !== '1')) notFound();
  return (
    <>
      <PageHero eyebrow="Design kit" title="Componenti condivisi" lead="Verifica visiva dei componenti della Fase 2." breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Design kit' }]}>
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href="/" arrow>Primario</ButtonLink>
          <ButtonLink href="/" variant="secondary">Secondario</ButtonLink>
          <ButtonLink href="/" variant="ghost" arrow>Ghost</ButtonLink>
          <Badge tone="warning">Beta</Badge><Badge tone="info" mono>DEMO</Badge>
        </div>
      </PageHero>
      <section className="mx-auto flex max-w-[1200px] flex-col gap-12 px-6 py-20">
        <SectionHeading eyebrow="Software" title="Card prodotto" lead="Bagliore che segue il cursore, sollevamento di 4px." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((p, i) => (<Reveal key={p.slug} delay={i * 0.08}><ProductCard product={p} /></Reveal>))}
        </div>
        <SectionHeading eyebrow="FAQ" title="Accordion" />
        <Accordion items={[{ question: 'Domanda di esempio?', answer: 'Risposta di esempio (contenuto dimostrativo).' }, { question: 'Seconda domanda?', answer: 'Altra risposta di esempio.' }]} />
        <SectionHeading eyebrow="Contatti" title="Modulo" />
        <div className="max-w-xl"><ContactForm toEmail={contacts.email} /></div>
      </section>
    </>
  );
}
