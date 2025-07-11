import propTypes from 'prop-types';
import styles from './SelectUnit.module.scss';

const SelectUnit = ({
  setUnitOfMeasurement,
  changeUnion,
  result
}) => {
  return (
    <div className={[styles['block__item'], styles['block__item-last']].join(" ")}>
      <div className={styles['block__title']}>Показывать результат в </div>
      <select
        name="unit_of_measurement"
        id="unit_of_measurement"
        className={styles['block__select']}
        onChange={(event) => {
          setUnitOfMeasurement(event.target.value);
          changeUnion(event.target.value, result);
        }}
        defaultValue="px"
      >
        <option value="rem">rem</option>
        <option value="px">px</option>
        <option value="%">%</option>
      </select>
    </div>
  );
};

SelectUnit.propTypes = {
  unitOfMeasurement: propTypes.string,
  setUnitOfMeasurement: propTypes.func,
  changeUnion: propTypes.func,
  result: propTypes.object
};

export default SelectUnit;