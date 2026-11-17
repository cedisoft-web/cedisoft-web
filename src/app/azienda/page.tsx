import type { Metadata } from 'next';

import { MapEmbed } from '@/components/company/map-embed';
import { WorkPhases } from '@/components/company/work-phases';
import { ButtonLink } from '@/components/ui/button';
import { ContactForm } from '@/components/ui/contact-form';
import { Icon } from '@/components/ui/icon';
import { Reveal } from '@/components/ui/reveal';
import { PageHero, SectionHeading } from '@/components/ui/section';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { content } from '@/content/source';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Azienda e contatti',
  description: 'Cedi Soft è una software house di Scauri (LT): dal 1989 sviluppa software gestionali e applicazioni web per aziende e professionisti.',
  alternates: { canonical: '/azienda' },
};

// Layout bento dei valori (colonne su 6): 3+3 poi 2+2+2.
const valueSpan = ['md:col-span-3', 'md:col-span-3', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2'];
const valueTone = ['!bg-blue-900 !text-white', '!bg-sky-50', '!bg-n-25', '!bg-[#F1F8EF]', '!bg-n-25'];

export default async function CompanyPage() {
  const [profile, contacts] = await Promise.all([content.getCompanyProfile(), content.getContacts()]);
  return (
    <>
      <PageHero eyebrow="Azienda" title={<>Dal 1989, la tecnologia al servizio delle imprese.</>}
        lead="Cedi Soft è una software house di Scauri, in provincia di Latina. Da oltre trent’anni sviluppa software gestionali e applicazioni web per aziende e professionisti di settori diversi."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Azienda' }]}>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#storia" size="lg" arrow>La nostra storia</ButtonLink>
          <ButtonLink href="#contatti" size="lg" variant="secondary">Contatti</ButtonLink>
        </div>
      </PageHero>

      <section id="storia" className="scroll-mt-28 px-6 py-24">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-12">
          <SectionHeading eyebrow="La nostra storia" title="Software nati dal lavoro quotidiano dei nostri clienti." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profile.story.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.06}>
                <SpotlightCard className="flex h-full flex-col gap-3 p-6">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-sky-50 text-blue-600"><Icon name={s.icon} size={20} /></span>
                  <span className="text-lg font-semibold tracking-[-0.015em] text-ink">{s.title}</span>
                  <span className="text-sm leading-relaxed text-ink-2">{s.text}</span>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-n-25 px-6 py-24">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-12">
          <SectionHeading eyebrow="Percorso" title="Le tappe dell’evoluzione."
            lead="Solo tappe documentate da fonti pubbliche. Le fasi senza data verificata sono indicate come tali." />
          <ol className="relative flex flex-col gap-6 border-l border-border-default pl-8">
            {profile.timeline.map((t) => (
              <li key={t.title} className="relative">
                <span aria-hidden className={cn('absolute -left-[39px] top-1.5 size-3 rounded-full ring-4 ring-n-25', t.verified ? 'bg-sky-500' : 'bg-n-300')} />
                <Reveal className="flex flex-col gap-1.5">
                  <span className="font-mono text-xs font-medium text-sky-600">{t.year}</span>
                  <span className="text-lg font-semibold tracking-[-0.015em] text-ink">{t.title}</span>
                  <span className="max-w-2xl text-[15px] leading-relaxed text-ink-2">{t.text}</span>
                  <span className="font-mono text-[11px] text-ink-muted">{t.source}</span>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-12">
          <SectionHeading eyebrow="Valori" title="Ciò che guida il nostro lavoro." />
          <div className="grid gap-4 md:grid-cols-6">
            {profile.values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 0.06} className={valueSpan[i]}>
                <div className={cn('flex h-full min-h-[190px] flex-col justify-between gap-6 rounded-[22px] border border-border-subtle p-7 text-ink', valueTone[i])}>
                  <span className="flex items-center justify-between">
                    <Icon name={v.icon} size={22} />
                    <span className="font-mono text-xs opacity-60">0{i + 1}</span>
                  </span>
                  <span className="flex flex-col gap-1.5">
                    <span className="text-xl font-semibold tracking-[-0.02em]">{v.title}</span>
                    <span className={cn('text-[15px] leading-relaxed', i === 0 ? 'text-[#C9D6EC]' : 'text-ink-2')}>{v.text}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="metodo" className="scroll-mt-28 bg-ambient px-6 py-24">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-12">
          <SectionHeading eyebrow="Come lavoriamo" title="Dall’esigenza al software, e oltre."
            lead="Ogni progetto segue le fasi naturali dello sviluppo software: capire il lavoro da semplificare, realizzare lo strumento, metterlo in uso e continuare a farlo evolvere." />
          <WorkPhases phases={profile.phases} />
        </div>
      </section>

      <section id="contatti" className="scroll-mt-28 px-6 py-24">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-8">
            <SectionHeading eyebrow="Contatti" title="Parliamo del tuo lavoro."
              lead="Informazioni commerciali, demo, assistenza o collaborazioni: scrivici o chiamaci." />
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-4 rounded-2xl border border-border-subtle bg-white p-5">
                <span className="flex size-10 flex-none items-center justify-center rounded-xl bg-sky-50 text-blue-600"><Icon name="phone" size={18} /></span>
                <span className="flex flex-col gap-1"><span className="eyebrow">Telefono</span>
                  <span className="flex flex-wrap gap-x-4 text-[15px] font-medium text-ink">{contacts.phones.map((p) => <a key={p.href} href={p.href} className="hover:text-blue-600">{p.label}</a>)}</span></span>
              </li>
              <li className="flex items-start gap-4 rounded-2xl border border-border-subtle bg-white p-5">
                <span className="flex size-10 flex-none items-center justify-center rounded-xl bg-sky-50 text-blue-600"><Icon name="mail" size={18} /></span>
                <span className="flex flex-col gap-1"><span className="eyebrow">Email</span>
                  <a href={`mailto:${contacts.email}`} className="text-[15px] font-medium text-ink hover:text-blue-600">{contacts.email}</a></span>
              </li>
              <li className="flex items-start gap-4 rounded-2xl border border-border-subtle bg-white p-5">
                <span className="flex size-10 flex-none items-center justify-center rounded-xl bg-sky-50 text-blue-600"><Icon name="map-pin" size={18} /></span>
                <span className="flex flex-col gap-1"><span className="eyebrow">Sede</span>
                  <address className="text-[15px] font-medium not-italic text-ink">{contacts.address}</address></span>
              </li>
            </ul>
            <p className="font-mono text-[11px] text-ink-muted">{contacts.company} · {contacts.vat} · Fonte: cedisoft.it · da riconfermare prima della pubblicazione</p>
          </div>
          <div className="rounded-[28px] border border-border-subtle bg-white p-8 shadow-sm">
            <ContactForm toEmail={contacts.email} />
          </div>
        </div>
      </section>

      <section aria-label="Dove siamo" className="px-6 pb-24">
        <div className="mx-auto max-w-[1200px]"><MapEmbed address={contacts.address} /></div>
      </section>
    </>
  );
}
