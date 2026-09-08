import type { Metadata } from 'next';
import { Fraunces, JetBrains_Mono, Manrope } from 'next/font/google';
import type { ReactNode } from 'react';

import '../globals.css';

import { getPublicContent } from '@/lib/content';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getPublicContent();
  const base = meta.url ? new URL(meta.url) : undefined;

  return {
    metadataBase: base,
    title: meta.title,
    description: meta.description,
    openGraph: {
      type: 'profile',
      siteName: meta.siteName,
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: meta.url || undefined,
      locale: meta.locale,
      images: meta.ogImage ? [{ url: meta.ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: meta.ogImage ? [meta.ogImage] : undefined,
    },
    icons: { icon: '/favicon.svg' },
  };
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ru"
      className={`${fraunces.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body data-surface="site">{children}</body>
    </html>
  );
}
