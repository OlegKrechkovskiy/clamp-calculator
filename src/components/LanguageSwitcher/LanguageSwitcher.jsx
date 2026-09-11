'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import styles from './LanguageSwitcher.module.scss';

const LanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const changeLanguage = (lng) => {
    router.replace(pathname, { locale: lng });
  };

  return (
    <div className='container'>
      <div className={styles.switcher}>
        <button
          className={`${styles.btn} ${locale === 'en' ? styles.active : ''}`}
          onClick={() => changeLanguage('en')}
        >
          EN
        </button>
        <button
          className={`${styles.btn} ${locale === 'ru' ? styles.active : ''}`}
          onClick={() => changeLanguage('ru')}
        >
          RU
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;