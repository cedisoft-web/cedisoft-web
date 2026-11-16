import type { Metadata } from 'next';

import { ButtonLink } from '@/components/ui/button';
import { ContactForm } from '@/components/ui/contact-form';
import { Icon } from '@/components/ui/icon';
import { PageHero, SectionHeading } from '@/components/ui/section';
import { content } from '@/content/source';
import { platformLoginUrl } from '@/lib/platform';

export const metadata: Metadata = {
  title: 'Assistenza',
  description: 'Assistenza sui software Cedi Soft da parte di chi li sviluppa: contatta il team per telefono, email o con una richiesta online.',
  alternates: { canonical: '/assistenza' },
};

export default async function SupportPage() {
  const [contacts, services] = await Promise.all([content.getContacts(), content.getServices()]);
  const support = services.find((s) => s.slug === 'assistenza');
  return (
    <>
      <PageHero eyebrow="Assistenza" title="Supporto da chi sviluppa il tuo software."
        lead="Per un problema, una domanda o un aggiornamento puoi contattare direttamente il team Cedi Soft."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Assistenza' }]}>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#richiesta" size="lg" arrow>Invia una richiesta</ButtonLink>
          <ButtonLink href={platformLoginUrl()} size="lg" variant="secondary">Area Clienti</ButtonLink>
        </div>
      </PageHero>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-[1200px] gap-5 md:grid-cols-3">
          <div className="flex flex-col gap-3 rounded-[22px] border border-border-subtle bg-white p-6">
            <span className="flex size-11 items-center justify-center rounded-xl bg-sky-50 text-blue-600"><Icon name="phone" size={20} /></span>
            <span className="eyebrow">Telefono</span>
            <span className="flex flex-col gap-1 text-lg font-semibold text-ink">{contacts.phones.map((p) => <a key={p.href} href={p.href} className="hover:text-blue-600">{p.label}</a>)}</span>
          </div>
          <div className="flex flex-col gap-3 rounded-[22px] border border-border-subtle bg-white p-6">
            <span className="flex size-11 items-center justify-center rounded-xl bg-sky-50 text-blue-600"><Icon name="mail" size={20} /></span>
            <span className="eyebrow">Email</span>
            <a href={`mailto:${contacts.email}`} className="text-lg font-semibold text-ink hover:text-blue-600">{contacts.email}</a>
          </div>
          <div className="flex flex-col gap-3 rounded-[22px] border border-border-subtle bg-white p-6">
            <span className="flex size-11 items-center justify-center rounded-xl bg-sky-50 text-blue-600"><Icon name="circle-user-round" size={20} /></span>
            <span className="eyebrow">Area Clienti</span>
            <span className="text-[15px] leading-relaxed text-ink-2">Accedi con il tuo account Cedi Soft.</span>
            <a href={platformLoginUrl()} className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline">Accedi<Icon name="arrow-up-right" size={15} /></a>
          </div>
        </div>
      </section>

      {support && (
        <section className="bg-n-25 px-6 py-20">
          <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-2 md:items-center">
            <SectionHeading eyebrow="Assistenza tecnica" title={support.name} lead={support.description} />
            <ul className="flex flex-col gap-3">
              {support.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-2xl border border-border-subtle bg-white p-4 text-[15px] text-ink">
                  <span className="mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-[var(--success-bg)] text-[var(--success-fg)]"><Icon name="check" size={14} /></span>{b}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section id="richiesta" className="scroll-mt-28 px-6 py-24">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1fr_1.1fr]">
          <SectionHeading eyebrow="Richiesta di assistenza" title="Scrivi al team di supporto."
            lead="Indica il software che usi e descrivi il problema: ti risponderemo il prima possibile." />
          <div className="rounded-[28px] border border-border-subtle bg-white p-8 shadow-sm">
            <ContactForm toEmail={contacts.email} defaultSubject="Richiesta di assistenza" />
          </div>
        </div>
      </section>
    </>
  );
}
