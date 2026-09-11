'use client';
import propTypes from 'prop-types';
import { useTranslations } from 'next-intl';
import styles from './Popup.module.scss';

const Popup = ({ clampFunc }) => {
  const t = useTranslations();

  const closeDialog = () => {
    window.popup.close();
    document.body.classList.remove('scroll-lock');
  };

  const closeOnBackDropClick = (currentTarget, target) => {
    const dialogElement = currentTarget;
    const isClickedOnBackDrop = target === dialogElement;
    if (isClickedOnBackDrop) {
      dialogElement.close();
    }
  };

  return (
    <dialog className={styles['dialog']} id="popup"
      onClose={() => closeDialog()}
      onClick={e => closeOnBackDropClick(e.currentTarget, e.target)}>
      <div className={styles['dialog-wrapper']}>
        <h3 className={styles['dialog-title']}>
          {t('browserNotSupportClipboard')}
        </h3>
        <p className={styles['dialog-description']}>
          {t('copyToClipboardInstructions1')}
        </p>
        <p>
          {t('copyToClipboardInstructions2')}{" "}
          <strong>{t('copyToClipboardInstructions3')}</strong>
        </p>
        <button className={styles['dialog-close']} onClick={() => closeDialog()}>
          ×
        </button>
        <textarea
          readOnly
          value={clampFunc}
          className={styles['dialog-textarea']}
        />
      </div>
    </dialog>
  );
};

Popup.propTypes = {
  clampFunc: propTypes.string,
  closeDialog: propTypes.func,
};

export default Popup;