import type { Metadata } from 'next';
import Link from 'next/link';

import { Icon } from '@/components/ui/icon';
import { PageHero } from '@/components/ui/section';
import { content } from '@/content/source';
import { formatDate } from '@/lib/format';

export const revalidate = 120;

export const metadata: Metadata = {
  title: 'News',
  description: 'Novità e aggiornamenti da Cedi Soft.',
  alternates: { canonical: '/news' },
};

export default async function NewsPage() {
  const news = await content.getNews();
  return (
    <>
      <PageHero eyebrow="News" title="Novità da Cedi Soft." lead="Aggiornamenti sui software, sui servizi e sull’azienda."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'News' }]} />
      <section className="px-6 pb-24 pt-4">
        <div className="mx-auto max-w-[860px]">
          {news.length === 0 ? (
            <p role="status" className="rounded-2xl border border-border-subtle bg-white p-6 text-[15px] text-ink-2">
              Non ci sono ancora news pubblicate. Torna a trovarci presto.
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {news.map((n) => (
                <li key={n.slug}>
                  <article className="rounded-[22px] border border-border-subtle bg-white p-6 transition-[border-color,box-shadow] hover:border-sky-300 hover:shadow-[0_16px_30px_-20px_rgba(25,44,88,.4)]">
                    <time dateTime={n.date} className="eyebrow">{formatDate(n.date)}</time>
                    <h2 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-ink">
                      <Link href={`/news/${n.slug}`} className="hover:text-blue-600">{n.title}</Link>
                    </h2>
                    {n.excerpt && <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{n.excerpt}</p>}
                    <Link href={`/news/${n.slug}`} aria-label={`Leggi: ${n.title}`} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline">
                      Leggi<Icon name="arrow-right" size={15} />
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
