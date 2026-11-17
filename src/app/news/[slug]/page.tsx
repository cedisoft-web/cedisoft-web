import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PageHero } from '@/components/ui/section';
import { content } from '@/content/source';
import { formatDate } from '@/lib/format';

type Params = Promise<{ slug: string }>;

export const revalidate = 120;
// Le news nuove compaiono senza nuova build: gli slug non noti a build-time sono generati alla prima richiesta.
export const dynamicParams = true;
export async function generateStaticParams() {
  return (await content.getNews()).map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const n = await content.getNewsItem((await params).slug);
  if (!n) return { title: 'News non trovata' };
  return { title: n.title, description: n.excerpt || undefined, alternates: { canonical: `/news/${n.slug}` } };
}

export default async function NewsDetailPage({ params }: { params: Params }) {
  const n = await content.getNewsItem((await params).slug);
  if (!n) notFound();
  return (
    <>
      <PageHero eyebrow={formatDate(n.date)} title={n.title} lead={n.excerpt || undefined}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'News', href: '/news' }, { label: n.title }]} />
      <article className="px-6 pb-24 pt-4">
        {/* bodyHtml: HTML sanificato dalla Cedi Platform (fonte attendibile, Markdown reso sul server con whitelist). */}
        <div className="cs-prose mx-auto max-w-[720px]" dangerouslySetInnerHTML={{ __html: n.bodyHtml }} />
      </article>
    </>
  );
}
