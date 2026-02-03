import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Fields from '@/components/Fields/Fields';
import Popup from '@/components/Popup/Popup';
import ResultDisplay from '@/components/ResultDisplay/ResultDisplay';
import SelectUnit from '@/components/SelectUnit/SelectUnit';
import styles from './ClampFunction.module.scss';

const ClampFunction = () => {
  const { t } = useTranslation();
  const [minWidthPX, setMinWidthPX] = useState(320);
  const [maxWidthPX, setMaxWidthPX] = useState(1920);
  const [minValueSizePX, setMinFontSizePX] = useState(16);
  const [maxValueSizePX, setMaxFontSizePX] = useState(32);
  const [pixelsPerRem, setPixelsPerRem] = useState(1);
  const [unitOfMeasurement, setUnitOfMeasurement] = useState('px');
  const [isSwap, setIsSwap] = useState(false);
  const [error, setError] = useState('');

  const fields = [
    {
      id: 'minWidthPX',
      title: t('minViewportWidth'),
      func: minWidthPX,
      setFunc: setMinWidthPX
    },
    {
      id: 'maxWidthPX',
      title: t('maxViewportWidth'),
      func: maxWidthPX,
      setFunc: setMaxWidthPX
    },
    {
      id: 'minValueSizePX',
      title: t('minValueSize'),
      func: minValueSizePX,
      setFunc: setMinFontSizePX
    },
    {
      id: 'maxValueSizePX',
      title: t('maxValueSize'),
      func: maxValueSizePX,
      setFunc: setMaxFontSizePX
    },
    {
      id: 'pxRem',
      title: t('pixelsPerRem'),
      func: pixelsPerRem,
      setFunc: setPixelsPerRem
    }
  ];

  const copyShow = useRef();
  const result = useRef();

  const copyToClipboard = (showMEss, text, toggleResult) => {
    //xxx Если браузер поддерживает Clipboard API, то копируем в буфер обмена
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showMEss.current.style.opacity = '1';
      toggleResult.current.classList.add('jelloHorizontal');
      setTimeout(() => (showMEss.current.style.opacity = '0', toggleResult.current.classList.remove('jelloHorizontal')), 5000);
    } else {
      window.popup.showModal();
      document.body.classList.add('scroll-lock');
      //xxx Если браузер не поддерживает Clipboard API, то копируем в буфер обмена с помощью функции unsecuredCopyToClipboard
      // unsecuredCopyToClipboard(text);
      // showMEss.current.style.opacity = '1';
      // setTimeout(() => (showMEss.current.style.opacity = '0'), 5000);
    }
  };

  const changeUnion = (union, toggleResult) => {
    union === 'rem' ? setPixelsPerRem(16) : setPixelsPerRem(1);
    toggleResult.current.classList.add('jelloHorizontal');
    setTimeout(() => (toggleResult.current.classList.remove('jelloHorizontal')), 2000);
  };

  // const unsecuredCopyToClipboard = text => {
  //   const textArea = document.createElement('textarea');
  //   textArea.value = text;
  //   document.body.appendChild(textArea);
  //   textArea.focus();
  //   textArea.select();
  //   document.execCommand('copy');
  //   document.body.removeChild(textArea);
  // };

  const minWidth = minWidthPX / pixelsPerRem;
  const maxWidth = maxWidthPX / pixelsPerRem;

  const slope = !isSwap ? ((maxValueSizePX - minValueSizePX) / (maxWidth - minWidth)) : ((minValueSizePX - maxValueSizePX) / (minWidth - maxWidth));
  const yAxisIntersection = !isSwap ? -minWidth * slope + minValueSizePX : -maxWidth * slope + maxValueSizePX;

  const clampFunc = !isSwap ?
    `clamp(${minValueSizePX}${unitOfMeasurement}, calc(${yAxisIntersection.toFixed(4)}${unitOfMeasurement} + ${(slope * 100).toFixed(4)}vw), ${maxValueSizePX}${unitOfMeasurement})`
    :
    `clamp(${maxValueSizePX}${unitOfMeasurement}, calc(${(slope * 100).toFixed(4)}vw + ${yAxisIntersection.toFixed(4)}${unitOfMeasurement}), ${minValueSizePX}${unitOfMeasurement})`


  useEffect(() => {
    if (minValueSizePX > maxValueSizePX) {
      setIsSwap(true);
    } else {
      setIsSwap(false);
    }

    if (minWidthPX >= maxWidthPX) {
      setError(t('minWidthError'));
    } else {
      setError('');
    }
  }, [minValueSizePX, maxValueSizePX, maxWidthPX, minWidthPX, t]);

  return (
    <div className='container'>
      <h1 className={`not_allocated ${styles['page-title']}`}>{t('calculatorTitle')}</h1>
      <p className={`not_allocated ${styles['page-description']}`}>
        {t('description1')}
      </p>
      <p className={`not_allocated ${styles['page-description']}`}>
        {t('description2')}
      </p>
      <p className={`not_allocated ${styles['page-description']}`}>
        {t('description3')}
      </p>
      <p className={`not_allocated ${styles['page-description']}`}>{t('exampleRem')}</p>

      <div className={styles['block']}>
        <Fields fields={fields} unitOfMeasurement={unitOfMeasurement} />
        <SelectUnit
          unitOfMeasurement={unitOfMeasurement}
          setUnitOfMeasurement={setUnitOfMeasurement}
          changeUnion={changeUnion}
          result={result}
        />
      </div>

      <ResultDisplay
        error={error}
        clampFunc={clampFunc}
        copyToClipboard={copyToClipboard}
        result={result}
        copyShow={copyShow}
        unitOfMeasurement={unitOfMeasurement}
      />

      <Popup clampFunc={clampFunc}/>
    </div>
  );
};

export default ClampFunction;