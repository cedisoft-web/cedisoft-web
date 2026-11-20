import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { FeatureTabs } from '@/components/software/feature-tabs';
import { GestParkBlocks, GestParkCta, GestParkGallery, GestParkHero, GestParkHighlights } from '@/components/software/gest-park-showcase';
import { Accordion } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { ProductCard } from '@/components/ui/product-card';
import { Reveal } from '@/components/ui/reveal';
import { PageHero, SectionHeading } from '@/components/ui/section';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { content } from '@/content/source';

type Params = Promise<{ slug: string }>;

// Solo i prodotti con scheda approvata hanno una pagina: gli altri slug restituiscono 404.
export const dynamicParams = false;
export async function generateStaticParams() {
  return (await content.getProducts()).filter((p) => p.hasDetailPage).map((p) => ({ slug: p.slug }));
}

async function load(slug: string) {
  const product = await content.getProduct(slug);
  const detail = product?.hasDetailPage ? await content.getProductDetail(slug) : null;
  return product && detail ? { product, detail } : null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await load((await params).slug);
  if (!data) return {};
  return {
    title: data.product.name,
    description: data.detail.value,
    alternates: { canonical: `/software/${data.product.slug}` },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const data = await load((await params).slug);
  if (!data) notFound();
  const { product: p, detail: d } = data;
  const related = (await Promise.all(d.relatedSlugs.map((s) => content.getProduct(s)))).flatMap((x) => x ?? []);
  const embedded = (await content.getProducts()).filter((x) => x.detailPage === p.slug);
  const isPark = p.slug === 'gest-park';
  const demoHref = `/demo?prodotto=${encodeURIComponent(p.name)}`;
  const anchors = [
    ['panoramica', 'Panoramica'], ...(isPark ? [['dentro', 'Schermate']] : []), ...embedded.map((e) => [e.slug, e.name] as const), ['funzionalita', 'Funzionalità'],
    ...(d.integrations.length ? [['integrazioni', 'Integrazioni']] : []),
    ['prezzi', 'Prezzi'], ...(related.length ? [['correlati', 'Correlati']] : []), ['faq', 'FAQ'],
  ] as const;

  return (
    <>
      {isPark ? <GestParkHero value={d.value} /> : <PageHero eyebrow={p.category} title={p.name} lead={d.value}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Software', href: '/software' }, { label: p.name }]}>
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href={`/demo?prodotto=${encodeURIComponent(p.name)}`} size="lg" arrow>Richiedi una demo</ButtonLink>
          <ButtonLink href="/azienda#contatti" size="lg" variant="secondary">Richiedi informazioni</ButtonLink>
          {p.status && <Badge tone="warning">{p.status.label}</Badge>}
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          {d.chips.map((c) => (
            <span key={c.title} className="glass-light inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[13px] font-medium text-ink shadow-sm">
              <Icon name={c.icon} size={16} className="text-blue-600" />
              <span>{c.title}{c.subtitle && <span className="font-normal text-ink-2"> · {c.subtitle}</span>}</span>
            </span>
          ))}
        </div>
      </PageHero>}

      <nav aria-label="In questa pagina" className="sticky top-[84px] z-30 hidden px-6 pt-4 md:block">
        <ul className="mx-auto flex w-fit gap-1 rounded-full border border-border-subtle bg-white/90 p-1.5 shadow-sm backdrop-blur-[14px]">
          {anchors.map(([id, label]) => (
            <li key={id}><a href={`#${id}`} className="inline-flex h-9 items-center rounded-full px-4 text-[13px] font-medium text-ink-2 transition-colors hover:bg-blue-600/[.06] hover:text-ink">{label}</a></li>
          ))}
        </ul>
      </nav>

      {isPark ? (<><GestParkHighlights /><GestParkBlocks /><GestParkGallery /></>) : (
      <section id="panoramica" className="scroll-mt-32 px-6 py-24">
        <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[1.2fr_1fr]">
          <Reveal className="flex flex-col gap-5">
            <SectionHeading eyebrow="Panoramica" title={d.overview.title} lead={d.overview.text} />
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="flex flex-col gap-3">
              {d.overview.points.map((t) => (
                <li key={t} className="flex items-start gap-3 rounded-2xl border border-border-subtle bg-white p-4 text-[15px] text-ink">
                  <span className="mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-[var(--success-bg)] text-[var(--success-fg)]"><Icon name="check" size={14} /></span>{t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      )}

      {/* Un'unica pagina per l'ambiente: i prodotti con detailPage === slug (es. Gest Park Web) sono descritti qui */}
      {embedded.map((e) => (
        <section key={e.slug} id={e.slug} className="bg-gpw-dark relative isolate scroll-mt-32 overflow-hidden px-6 py-24 text-white">
          <span aria-hidden className="cs-orb -z-10" style={{ right: '-8%', top: '-10%', width: 520, height: 520, background: 'radial-gradient(circle, rgba(61,168,74,.4), transparent 68%)', ['--d' as string]: '30s' }} />
          <div className="mx-auto grid max-w-[1200px] items-center gap-12 min-[980px]:grid-cols-[.9fr_1.1fr]">
            <Reveal className="flex flex-col gap-5">
              <Image src="/brand/gpw-wordmark-white.png" alt={e.name} width={260} height={46} />
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[.06em] text-[#BFEFDD] ring-1 ring-white/20">
                Nello stesso ambiente di {p.name}{e.status ? ` · ${e.status.label}` : ''}
              </span>
              <h2 className="text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.08] tracking-[-0.03em] [text-wrap:balance]">{p.name} è il gestionale. {e.name} è la nuova piattaforma.</h2>
              <p className="text-[17px] leading-relaxed text-[#D5EFE6]">{e.description} {p.name} resta il gestionale, in cloud o in locale: insieme formano un unico ambiente di lavoro, con CRM e sito web collegati ai dati dell’autosalone.</p>
              <ButtonLink href={`/demo?prodotto=${encodeURIComponent(p.name)}`} arrow className="self-start !bg-white !text-[#0B3F34] hover:!bg-white/90">Richiedi una demo</ButtonLink>
            </Reveal>
            <Reveal delay={0.1}>
              <Image src="/gpw/gpw-web-panoramica.webp" alt={`${e.name}: pannello di controllo`} width={1800} height={1157} sizes="(min-width: 980px) 600px, 92vw" className="h-auto w-full drop-shadow-2xl" />
            </Reveal>
          </div>
        </section>
      ))}

      <section id="funzionalita" className="scroll-mt-32 bg-n-25 px-6 py-24">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-12">
          <SectionHeading eyebrow="Funzionalità" title="Tutto quello che serve, organizzato per attività." />
          <FeatureTabs groups={d.features} />
        </div>
      </section>

      {d.integrations.length > 0 && (
        <section id="integrazioni" className="scroll-mt-32 px-6 py-24">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-12">
            <SectionHeading eyebrow="Integrazioni" title="Collegato ai servizi che usi già." />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {d.integrations.map((g, i) => (
                <Reveal key={g.name} delay={i * 0.06}>
                  <SpotlightCard className="flex h-full flex-col gap-2 p-6">
                    <span className="text-lg font-semibold tracking-[-0.015em] text-ink">{g.name}</span>
                    <span className="text-sm leading-relaxed text-ink-2">{g.text}</span>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {isPark ? <GestParkCta demoHref={demoHref} /> : (
      <section id="prezzi" className="scroll-mt-32 bg-ambient px-6 py-24">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-6">
          <SectionHeading eyebrow="Prezzi" title="Una proposta costruita sulla tua attività."
            lead="Configurazione, numero di postazioni e modalità di utilizzo cambiano da azienda ad azienda: per questo il prezzo è definito su richiesta." />
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/azienda#contatti" arrow>Richiedi un preventivo</ButtonLink>
            <ButtonLink href={`/demo?prodotto=${encodeURIComponent(p.name)}`} variant="secondary">Richiedi una demo</ButtonLink>
          </div>
        </div>
      </section>
      )}

      {related.length > 0 && (
        <section id="correlati" className="scroll-mt-32 px-6 py-24">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-12">
            <SectionHeading eyebrow="Software correlati" title="Completa il tuo ecosistema" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => <ProductCard key={r.slug} product={r} />)}
            </div>
          </div>
        </section>
      )}

      <section id="faq" className="scroll-mt-32 bg-n-25 px-6 py-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <SectionHeading eyebrow="Domande frequenti" title={`Domande su ${p.name}`} />
          <Accordion items={d.faq} />
        </div>
      </section>
    </>
  );
}
