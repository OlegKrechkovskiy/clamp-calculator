import propTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styles from './ResultDisplay.module.scss';
import Copy from './copy.svg';

const ResultDisplay = ({
  error,
  clampFunc,
  unitOfMeasurement,
  copyToClipboard,
  result,
  copyShow
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles['result']}>
      {error ? (
        <span className={`${styles['result__item-title']} ${styles['result__warning']} not_allocated`}>
          {t('calculationNotProvided')}<br />
          {error}
        </span>
      ) : (
        <div className={styles['result__item']}>
          <span className={`${styles['result__item-title']} not_allocated`}>
            {t('resultWidthCalc')}
          </span>
          <div ref={result} className={styles['result__value']}>
            {clampFunc}
          </div>
          <div
            className={`${styles['result__copy']} not_allocated`}
            onClick={() => copyToClipboard(copyShow, clampFunc, result)}
          >
            <img src={Copy} alt="Copy" title="Copy" />
          </div>
          <span
            ref={copyShow}
            className={styles['result__copy-success']}
            data-copy-message
          >
            {t('copied')}
          </span>
        </div>
      )}

      {unitOfMeasurement === "%" && (
        <p className={styles['result__description']}>
          {t('percentWarning')}
        </p>
      )}
    </div>
  );
};

ResultDisplay.propTypes = {
  error: propTypes.string,
  clampFunc: propTypes.string,
  copyToClipboard: propTypes.func,
  result: propTypes.object,
  copyShow: propTypes.object,
  unitOfMeasurement: propTypes.string
};

export default ResultDisplay;