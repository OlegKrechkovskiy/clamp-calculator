import { setRequestLocale } from 'next-intl/server';
import ClampFunction from '@/components/ClampFunction/ClampFunction';
import Example from '@/components/Example/Example';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <LanguageSwitcher />
      <ClampFunction />
      <Example />
    </div>
  );
}