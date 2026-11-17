import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { CediAssist } from '@/components/assist/cedi-assist';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { contacts, tagline } from '@/content/data/company';
import { footerColumns, legalLabels, megaGroups, mainLinks, soonLinks } from '@/content/data/navigation';
import { products } from '@/content/data/products';
import { env, isIndexable } from '@/lib/env';
import { clientAreaLinks, platformLoginUrl } from '@/lib/platform';

import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: { default: 'Cedi Soft — Software gestionale dal 1989', template: '%s · Cedi Soft' },
  description: tagline,
  openGraph: { type: 'website', locale: 'it_IT', siteName: 'Cedi Soft' },
  twitter: { card: 'summary_large_image' },
  robots: isIndexable ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: '#FFFFFF', width: 'device-width', initialScale: 1 };

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: contacts.company,
  url: env.siteUrl,
  logo: `${env.siteUrl}/brand/cedisoft-logo.png`,
  foundingDate: '1989',
  email: contacts.email,
  telephone: contacts.phones[0]?.href.replace('tel:', ''),
  vatID: contacts.vat.replace('P. IVA ', 'IT'),
  address: { '@type': 'PostalAddress', streetAddress: 'Piazza Rotelli 4', postalCode: '04028', addressLocality: 'Scauri (LT)', addressCountry: 'IT' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const loginUrl = platformLoginUrl();
  return (
    <html lang="it" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replaceAll('<', '\\u003c') }} />
        <a href="#main" className="fixed left-4 top-[-60px] z-[80] rounded-[10px] bg-blue-900 px-3.5 py-2.5 text-sm font-medium text-white transition-[top] duration-200 focus:top-3">
          Vai al contenuto
        </a>
        <Header links={mainLinks} soonLinks={soonLinks} megaGroups={megaGroups} products={products} loginUrl={loginUrl} accountLinks={clientAreaLinks()} />
        <main id="main">{children}</main>
        <CediAssist channels={{ supportHref: '/assistenza', contactHref: '/azienda#contatti', phones: contacts.phones, email: contacts.email }} />
        <Footer contacts={contacts} tagline={tagline} products={products} columns={footerColumns} legalLabels={legalLabels} loginUrl={loginUrl} />
      </body>
    </html>
  );
}
