import propTypes from 'prop-types';
import styles from './Fields.module.scss';

const Fields = ({ fields, unitOfMeasurement }) => {
  const scheckinput = (event) => {
    const value = event.target.value;

    if (value.startsWith('0')) {
      event.target.value = value.slice(1);
    } else {
      event.target.value = value;
    }
  }

  return (
    <>
      {/* {console.log('%c unitOfMeasurement ', 'background:black;color:white;padding:5px;', unitOfMeasurement)} */}
      {fields.map((field, index) => (
        <div className={styles['block__item']} key={index}>
          <div className={`${styles['block__title']} not_allocated`}>{field.title}</div>
          <div className={`${styles['block__quantity']} not_allocated`} {...field.id === 'pxRem' && (unitOfMeasurement == 'px' || unitOfMeasurement == '%') && { disabled: true }}>
            <span
              className={styles['block__quantity-button']}
              onClick={() => ( field.setFunc( +field.func <= 0 ? 0 : +field.func - 1))}
            >
              -
            </span>
            <input
              value={field.func}
              className={styles['block__input']}
              name={field.id}
              type="number"
              onChange={(e) =>(scheckinput(e), field.setFunc(Number(e.target.value)))}
            />
            <span
              className={styles['block__quantity-button']}
              data-quantity="+"
              onClick={() => field.setFunc(field.func + 1)}
            >
              +
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

Fields.propTypes = {
  fields: propTypes.array,
  unitOfMeasurement: propTypes.string
};

export default Fields;