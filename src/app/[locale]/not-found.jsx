import { getTranslations } from 'next-intl/server';

export default async function NotFoundPage() {
  const t = await getTranslations();

  return (
    <main className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
      <h1>404</h1>
      <p>{t('pageNotFound')}</p>
    </main>
  );
}