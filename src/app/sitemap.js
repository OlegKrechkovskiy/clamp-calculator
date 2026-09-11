const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://clampcalculator.vercel.app';
const locales = ['en', 'ru'];

export default function sitemap() {
  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
    alternates: {
      languages: {
        en: `${SITE_URL}/en`,
        ru: `${SITE_URL}/ru`
      }
    }
  }));
}