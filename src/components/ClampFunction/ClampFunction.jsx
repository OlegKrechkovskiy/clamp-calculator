import { useEffect, useRef, useState } from 'react';
import styles from './ClampFunction.module.scss';
import Copy from './copy.svg';

const ClampFunction = () => {
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
      title: 'Minimum viewport width = ',
      func: minWidthPX,
      setFunc: setMinWidthPX
    },
    {
      id: 'maxWidthPX',
      title: 'Maximum viewport width = ',
      func: maxWidthPX,
      setFunc: setMaxWidthPX
    },
    {
      id: 'minValueSizePX',
      title: 'Minimum value size = ',
      func: minValueSizePX,
      setFunc: setMinFontSizePX
    },
    {
      id: 'maxValueSizePX',
      title: 'Maximum value size = ',
      func: maxValueSizePX,
      setFunc: setMaxFontSizePX
    },
    {
      id: 'pxRem',
      title: 'Pixels per rem = ',
      func: pixelsPerRem,
      setFunc: setPixelsPerRem
    }
  ];

  const copyShow = useRef();
  const result = useRef();
  const pxRem = useRef(null);

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

  const changeUnion = (union, toggleResult) => {
    union === 'rem' ? (setPixelsPerRem(16), pxRem.current.removeAttribute('disabled')) : (setPixelsPerRem(1), pxRem.current.setAttribute('disabled', ''));
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

  const scheckinput = (event) => {
    const value = event.target.value;

    if (value.startsWith('0')) {
      event.target.value = value.slice(1);
    } else {
      event.target.value = value;
    }
  }

  useEffect(() => {
    if (minValueSizePX > maxValueSizePX) {
      setIsSwap(true);
    } else {
      setIsSwap(false);
    }

    if (minWidthPX >= maxWidthPX) {
      setError('Минимальная ширина не может быть больше или равна максимальной');
    } else {
      setError('');
    }
  }, [minValueSizePX, maxValueSizePX, maxWidthPX, minWidthPX]);

  return (
    <div className='container'>
      <h1 className={`not_allocated ${styles['page-title']}`}>Clamp function</h1>
      <p className={`not_allocated ${styles['page-description']}`}>
        Данная функция рассчитывает наиблее приемлемые значения для адаптивного
        уменьшения/увеличения размеров.
      </p>
      <p className={`not_allocated ${styles['page-description']}`}>
        Подходит для размеров шрифтов, отступов, размеров блоков...
      </p>
      <p className={`not_allocated ${styles['page-description']}`}>
        Для рассчета В <b>rem</b> - просто выставляем в поле{' '}
        <b>&quot;Pixels&nbsp;per&nbsp;rem&nbsp;=&nbsp;&quot;&nbsp;значение px</b>
      </p>
      <p className={`not_allocated ${styles['page-description']}`}>*Пример:&nbsp;<b>1rem&nbsp;==&nbsp;16px</b></p>

      <div className={styles['block']}>
        {fields.map((field, index) => (
          // <div className={styles['block__item']} key={index}  {...field.id && field.id == 'unitOfMeasurement' ? { ref: pxRem } : ''}>
          <div className={styles['block__item']} key={index}>
            <div className={styles['block__title']}>{field.title}</div>
            <div className={styles['block__quantity']} ref={field.id === 'pxRem' ? pxRem : null} {...field.id === 'pxRem' && { disabled: true }}>
              <span
                className={styles['block__quantity-button']}
                onClick={() => field.setFunc(+field.func - 1)}
              >
                -
              </span>
              <input
                ref={fields.id}
                value={field.func}
                className={styles['block__input']}
                name={field.id}
                type='number'
                onChange={e => (scheckinput(e), field.setFunc(Number(e.target.value)))}
              />
              <span
                className={styles['block__quantity-button']}
                data-quantity='+'
                onClick={() => field.setFunc(+field.func + 1)}
              >
                +
              </span>
            </div>
          </div>
        ))}
        <div
          className={[
            [styles['block__item'], styles['block__item-last']].join(' ')
          ]}
        >
          <div className={styles['block__title']}>Показывать результат в </div>
          <select
            name='unit_of_measurement'
            id='unit_of_measurement'
            className={styles['block__select']}
            onChange={event => {
              setUnitOfMeasurement(event.target.value);
              changeUnion(event.target.value, result);
            }}
            defaultValue='px'
          >
            <option value='rem'>rem</option>
            <option value='px'>px</option>
            <option value='%'>%</option>
          </select>
        </div>
      </div>

      <div className={styles['result']}>
        {error ?
          (<span className={`${styles['result__item-title']} ${styles['result__warning']}`}>
            Расчет при заданных значениях не предусмотрен.<br />
            {error}
          </span>)
          :
          (
            <div className={styles['result__item']}>
              <span className={styles['result__item-title']}>
                result width calc() ={' '}
              </span>
              <div ref={result} className={styles['result__value']}>{clampFunc}</div>
              <div
                className={styles['result__copy']}
                onClick={() => copyToClipboard(copyShow, clampFunc, result)}
              >
                <img src={Copy} alt='Copy' title='Copy' />
              </div>
              <span
                ref={copyShow}
                className={styles['result__copy-success']}
                data-copy-message
              >
                Copied ✔
              </span>
            </div>
          )
        }

        {unitOfMeasurement == '%' && (
          <p className={styles['result__description']}>
            !!! Проценты добавлены в тестовом режиме. В некоторых случаях может привести к неправильному расчету.
          </p>
        )}
        
      </div>

      <dialog
        className={styles['dialog']}
        id='popup'
        onClose={() => closeDialog()}
        onClick={e => closeOnBackDropClick(e.currentTarget, e.target)}
      >
        <div className={styles['dialog-wrapper']}>
          <h3 className={styles['dialog-title']}>
            Браузер не поддерживает Clipboard API
          </h3>
          <p className={styles['dialog-description']}>
            Чтобы скопировать в буфер обмена,{' '}
          </p>
          <p>
            выделите текст и&nbsp;нажмите{' '}
            <strong>Ctrl+C (Cmd+C для Mac)</strong>
          </p>
          <button
            className={styles['dialog-close']}
            onClick={() => closeDialog()}
          >
            &#x2715;
          </button>
          <textarea
            readOnly
            value={clampFunc}
            className={styles['dialog-textarea']}
          >
            {clampFunc}
          </textarea>
        </div>
      </dialog>
    </div>
  );
};

export default ClampFunction;
