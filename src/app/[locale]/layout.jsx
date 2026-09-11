import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '@/assets/styles/scss/main.scss';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://clampcalculator.vercel.app';

// Статическая генерация маршрутов для каждой локали (SSG — отлично для SEO)
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    return {};
  }

  const t = await getTranslations({ locale });

  return {
    metadataBase: new URL(SITE_URL),
    title: t('metaTitle'),
    description: t('metaDescription'),
    verification: {
      yandex: 'beda73bca75be22b',
    },
    keywords: t('metaKeywords'),
    authors: [{ name: 'Oleg Krechkovskiy' }],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'x-default': `/${routing.defaultLocale}`,
        en: '/en',
        ru: '/ru'
      }
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${locale}`,
      title: t('metaTitle'),
      description: t('metaDescription'),
      siteName: t('calculatorTitle'),
      images: [{ url: `${SITE_URL}/icon_m.png`, width: 1200, height: 630 }]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('metaTitle'),
      description: t('metaDescription'),
      images: [`${SITE_URL}/icon_m.png`]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large'
      }
    }
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Позволяет статически генерировать маршрут для текущей локали
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'CSS Clamp Calculator',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description: t('metaDescription'),
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale,
    offers: { '@type': 'Offer', price: '0' },
    author: { '@type': 'Organization', name: 'Clamp Calculator' }
  };

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}