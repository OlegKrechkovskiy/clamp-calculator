import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.scss';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className='container'>
      <div className={styles.switcher}>
        <button
          className={`${styles.btn} ${i18n.language === 'en' ? styles.active : ''}`}
          onClick={() => changeLanguage('en')}
        >
          EN
        </button>
        <button
          className={`${styles.btn} ${i18n.language === 'ru' ? styles.active : ''}`}
          onClick={() => changeLanguage('ru')}
        >
          RU
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;