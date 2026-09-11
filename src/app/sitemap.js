const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://clampcalculator.vercel.app';
const locales = ['en', 'ru'];
const LAST_MODIFIED = new Date('2026-09-11').toISOString();

export default function sitemap() {
  // Корневая страница (defaultLocale)
  const rootEntry = {
    url: SITE_URL,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: 1.0,
    alternates: {
      languages: {
        en: `${SITE_URL}/en`,
        ru: `${SITE_URL}/ru`
      }
    }
  };

  // Локализованные страницы
  const localeEntries = locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: 0.9,
    alternates: {
      languages: {
        en: `${SITE_URL}/en`,
        ru: `${SITE_URL}/ru`
      }
    }
  }));

  return [rootEntry, ...localeEntries];
}
