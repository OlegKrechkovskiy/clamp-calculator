import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Типизированные навигационные хелперы next-intl,
// автоматически добавляющие локаль в пути маршрутов.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);