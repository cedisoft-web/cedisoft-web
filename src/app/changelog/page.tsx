import type { Metadata } from 'next';

import { PageHero } from '@/components/ui/section';
import { content } from '@/content/source';
import { formatDate } from '@/lib/format';

export const revalidate = 120;

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Le novità di ogni versione dei software Cedi Soft.',
  alternates: { canonical: '/changelog' },
};

export default async function ChangelogPage() {
  const entries = await content.getChangelog();
  return (
    <>
      <PageHero eyebrow="Changelog" title="Cosa cambia in ogni versione." lead="Le modifiche rilasciate per i software Cedi Soft, dalla più recente."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Changelog' }]} />
      <section className="px-6 pb-24 pt-4">
        <div className="mx-auto max-w-[860px]">
          {entries.length === 0 ? (
            <p role="status" className="rounded-2xl border border-border-subtle bg-white p-6 text-[15px] text-ink-2">
              Non ci sono ancora aggiornamenti pubblicati.
            </p>
          ) : (
            <ol className="flex flex-col gap-4">
              {entries.map((e) => (
                <li key={`${e.productId ?? e.product}-${e.version}`} className="rounded-[22px] border border-border-subtle bg-white p-6">
                  <h2 className="flex flex-wrap items-baseline gap-x-3 text-xl font-semibold tracking-[-0.02em] text-ink">
                    {e.product && <span>{e.product}</span>}<span className="font-mono text-base text-blue-600">{e.version}</span>
                  </h2>
                  <time dateTime={e.date} className="eyebrow mt-1 block">{formatDate(e.date)}</time>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-ink-2">
                    {e.changes.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
    </>
  );
}
