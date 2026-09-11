import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Все поддерживаемые локали
  locales: ['en', 'ru'],
  // Локаль по умолчанию (используется при редиректе с "/")
  defaultLocale: 'ru'
});