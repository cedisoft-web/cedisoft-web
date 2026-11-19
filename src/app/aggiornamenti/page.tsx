import type { Metadata } from 'next';

import { Icon } from '@/components/ui/icon';
import { PageHero } from '@/components/ui/section';
import { env } from '@/lib/env';

export const metadata: Metadata = {
  title: 'Aggiornamenti software',
  description: 'Area riservata ai clienti Cedi Soft: accedi per scaricare gli aggiornamenti dei software.',
  alternates: { canonical: '/aggiornamenti' },
  robots: { index: false, follow: true },
};

const field = 'w-full rounded-xl border border-border-default bg-white px-3.5 text-[15px] text-ink placeholder:text-n-400 focus:border-sky-500';

/**
 * Login dell'area aggiornamenti. Il modulo invia le credenziali al login esistente (`login.php`): nessuna
 * password passa o viene salvata da questo sito. Dopo l'accesso il cliente prosegue sulle pagine attuali.
 */
export default function UpdatesPage() {
  return (
    <>
      <PageHero eyebrow="Aggiornamenti software" title="Scarica gli aggiornamenti dei tuoi software."
        lead="Area riservata ai clienti Cedi Soft: accedi con le credenziali che ti abbiamo fornito per scaricare le versioni più recenti."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Aggiornamenti software' }]} />
      <section className="px-6 pb-24 pt-4">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className="rounded-[28px] border border-border-subtle bg-white p-8 shadow-sm">
            <form action={env.updatesLoginUrl} method="post" className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-sky-50 text-blue-600"><Icon name="refresh-cw" size={20} /></span>
                <span className="flex flex-col"><span className="text-lg font-semibold tracking-[-0.015em] text-ink">Area riservata</span>
                  <span className="text-sm text-ink-2">Accesso ai download</span></span>
              </div>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">Username
                <input name="Username" autoComplete="username" required aria-required autoCapitalize="none" spellCheck={false} className={`${field} h-12`} />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">Password
                <input name="Password" type="password" autoComplete="current-password" required aria-required className={`${field} h-12`} />
              </label>
              <button type="submit" className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-blue-600 px-6 text-[15px] font-medium text-white transition-colors hover:bg-blue-700">
                Accedi
              </button>
              <p className="text-[13px] leading-snug text-ink-muted">Le credenziali vengono inviate direttamente al sistema di accesso di Cedi Soft e non sono conservate da questo sito.</p>
            </form>
          </div>
          <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-ink-2">
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">Non hai le credenziali?</h2>
            <p>Se sei cliente Cedi Soft e non hai ancora un accesso, o lo hai smarrito, scrivici dal modulo di assistenza o chiamaci: ti rispondiamo noi.</p>
            <p><a href="/assistenza#richiesta" className="font-medium text-blue-600 hover:underline">Richiedi assistenza</a></p>
          </div>
        </div>
      </section>
    </>
  );
}
