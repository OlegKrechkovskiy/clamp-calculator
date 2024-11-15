import { useRef, useState } from 'react';
import Copy from './copy.svg';
import styles from './ClampFunction.module.scss';

const ClampFunction = () => {
  const [minWidthPX, setMinWidthPX] = useState(320);
  const [maxWidthPX, setMaxWidthPX] = useState(1920);
  const [minFontSizePX, setMinFontSizePX] = useState(1);
  const [maxFontSizePX, setMaxFontSizePX] = useState(3);
  const [pixelsPerRem, setPixelsPerRem] = useState(16);
  const [unitOfMeasurement, setUnitOfMeasurement] = useState('rem');

  const fields = [
    {
      title: 'Minimum viewport width = ',
      func: minWidthPX,
      setFunc: setMinWidthPX
    },
    {
      title: 'Maximum viewport width = ',
      func: maxWidthPX,
      setFunc: setMaxWidthPX
    },
    {
      title: 'Minimum font size = ',
      func: minFontSizePX,
      setFunc: setMinFontSizePX
    },
    {
      title: 'Maximum font size = ',
      func: maxFontSizePX,
      setFunc: setMaxFontSizePX
    },
    {
      title: 'Pixels per rem = ',
      func: pixelsPerRem,
      setFunc: setPixelsPerRem
    }
  ];

  const copyShow = useRef();

  const copyToClipboard = (showMEss, text) => {
    //xxx Если браузер поддерживает Clipboard API, то копируем в буфер обмена
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showMEss.current.style.opacity = '1';
      setTimeout(() => (showMEss.current.style.opacity = '0'), 5000);
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

  const changeUnion = union => {
    // console.log('union: ', union);
    union === 'rem' ? setPixelsPerRem(16) : setPixelsPerRem(1);
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
  // console.log('pixelsPerRem: ', pixelsPerRem, unitOfMeasurement);
  const maxWidth = maxWidthPX / pixelsPerRem;

  const slope = (maxFontSizePX - minFontSizePX) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minFontSizePX;

  const clampFunc = `clamp(${minFontSizePX}${unitOfMeasurement}, calc(${yAxisIntersection.toFixed(4)}${unitOfMeasurement} + ${(slope * 100).toFixed(4)}vw), ${maxFontSizePX}${unitOfMeasurement})`;

  return (
    <div className='container'>
      <h1 className={styles['page-title']}>Clamp function</h1>
      <p className={styles['page-description']}>
        Данная функция рассчитывает наиблее приемлемые значения для адаптивного
        уменьшения/увеличения размеров.
      </p>
      <p className={styles['page-description']}>
        Подходит для размеров шрифтов, отступов, размеров блоков...
      </p>
      <p className={styles['page-description']}>
        Для рассчета НЕ В rem - просто выставляем в поле{' '}
        <b>&quot;Pixels per rem = &quot; 1</b>
      </p>

      <div className={styles['block']}>
        {fields.map((field, index) => (
          <div className={styles['block__item']} key={index}>
            <div className={styles['block__title']}>{field.title}</div>
            <div className={styles['block__quantity']}>
              <span
                className={styles['block__quantity-button']}
                onClick={() => field.setFunc(+field.func - 1)}
              >
                -
              </span>
              <input
                value={field.func}
                className={styles['block__input']}
                type='number'
                onChange={e => field.setFunc(Number(e.target.value))}
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
            name=''
            id=''
            className={styles['block__select']}
            onChange={event => {
              setUnitOfMeasurement(event.target.value);
              changeUnion(event.target.value);
            }}
            defaultValue='rem'
          >
            <option value='rem'>rem</option>
            <option value='px'>px</option>
            <option value='%'>%</option>
          </select>
        </div>
      </div>

      <div className={styles['result']}>
        <div className={styles['result__item']}>
          <span className={styles['result__item-title']}>
            result width calc() ={' '}
          </span>
          <div className={styles['result__value']}>{clampFunc}</div>
          <div
            className={styles['result__copy']}
            onClick={() => copyToClipboard(copyShow, clampFunc)}
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
