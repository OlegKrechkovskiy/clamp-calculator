import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Отключаем проверку линтера на этапе сборки,
    // чтобы не блокировать деплой некритичными предупреждениями.
    ignoreDuringBuilds: true
  }
};

// Подключаем next-intl через официальный плагин, указывая файл конфигурации запросов
const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

export default withNextIntl(nextConfig);