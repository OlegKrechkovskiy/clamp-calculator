import propTypes from 'prop-types';
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
  return (
    <div className={styles['result']}>
      {error ? (
        <span className={`${styles['result__item-title']} ${styles['result__warning']} not_allocated`}>
          Расчет при заданных значениях не предусмотрен.<br />
          {error}
        </span>
      ) : (
        <div className={styles['result__item']}>
          <span className={`${styles['result__item-title']} not_allocated`}>
            result width calc(&nbsp;) =
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
            Copied ✔
          </span>
        </div>
      )}

      {unitOfMeasurement === "%" && (
        <p className={styles['result__description']}>
          !!! Проценты добавлены в тестовом режиме. В некоторых случаях может привести к неправильному расчету.
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