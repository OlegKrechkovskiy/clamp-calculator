import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Матчер пропускает API-маршруты, внутренние файлы Next.js (_next)
  // и любые пути с расширением (статика), но обрабатывает всё остальное.
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
};