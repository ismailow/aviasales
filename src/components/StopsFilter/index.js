import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../../actions';

import styles from './stopsFilter.module.scss';

function StopsFilter() {
  const selectCheckbox = useSelector((state) => state.transferCheckboxes);
  const dispatch = useDispatch();
  const { selectAll, updateCheckbox } = actions;
  const checkboxes = [
    {
      id: 'all',
      label: 'Все',
    },
    {
      id: 'zero',
      label: 'Без пересадок',
    },
    {
      id: 'one',
      label: '1 пересадка',
    },
    {
      id: 'two',
      label: '2 пересадки',
    },
    {
      id: 'three',
      label: '3 пересадки',
    },
  ];

  const all = () => dispatch(selectAll());
  const update = (check) => dispatch(updateCheckbox(check));

  const renderCheckboxes = checkboxes.map((checkbox) => (
    <li key={checkbox.id}>
      <input
        type="checkbox"
        id={checkbox.id}
        className={styles.checkbox}
        onChange={checkbox.id === 'all' ? all : update}
        checked={selectCheckbox[checkbox.id]}
      />
      <label
        htmlFor={checkbox.id}
        className={styles.label}
      >
        {checkbox.label}
      </label>
    </li>
  ));

  return (
    <div className={styles.filterBlock}>
      <h3 className={styles.title}>Количество пересадок</h3>
      <ul className={styles.filterList}>{renderCheckboxes}</ul>
    </div>
  );
}

export default StopsFilter;
