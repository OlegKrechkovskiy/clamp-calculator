import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Example.module.scss';
import video from '/preview/clamp.gif';

const Example = () => {
  const { t } = useTranslation();
  const [fontSize, setFontSize] = useState(0);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [borderRadius, setBorderRadius] = useState(0);

  useEffect(() => {
    let block = document.querySelector(`[data-block]`);
    const handleResize = () =>
      setFontSize(
        window.getComputedStyle(block, null).getPropertyValue('font-size')
      );
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let block = document.querySelector(`[data-block]`);
    const handleResize = () =>
      setHeight(
        window.getComputedStyle(block, null).getPropertyValue('height')
      );
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let block = document.querySelector(`[data-block]`);
    const handleResize = () =>
      setWidth(window.getComputedStyle(block, null).getPropertyValue('width'));
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let block = document.querySelector(`[data-block]`);
    const handleResize = () =>
      setBorderRadius(
        window.getComputedStyle(block, null).getPropertyValue('border-radius')
      );
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className='container'>
        <h2 className={`not_allocated ${styles['block-title']}`}>
          {t('exampleBlockTitle')}<br />
          <small>{t('exampleBlockDescription')}</small>
        </h2>
        <div className={`not_allocated ${styles['block']}`} data-block>
          <div className={styles['block-info']}>
            <p className={styles['block-width']}>
              {t('blockWidth')}:{' '}
              <span>
                <strong>{width}</strong>
              </span>
            </p>
            <p className={styles['block-height']}>
              {t('blockHeight')}:{' '}
              <span>
                <strong>{height}</strong>
              </span>
            </p>
            <p>
              {t('fontSize')}:{' '}
              <span>
                <strong>{fontSize}</strong>
              </span>
            </p>
            <p className={styles['border-radius']}>
              {t('borderRadius')}:{' '}
              <span>
                <strong>{borderRadius}</strong>
              </span>
            </p>
          </div>
          <div className={styles['line-block-width']}></div>
          <div className={styles['line-block-height']}></div>
          <div className={styles['line-bor-radius']}></div>
        </div>

        <div className={styles['example']}>
          <img className={styles['example-img']} src={video} alt={t('exampleGifAlt')} />
        </div>

      </div>
    </div>
  );
};

export default Example;
