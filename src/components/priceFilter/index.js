import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../../actions';

import styles from './priceFilter.module.scss';

function PriceFilter() {
  const { cheap, fast, optimal } = actions;
  const sort = useSelector((state) => state.sort);
  const dispatch = useDispatch();
  const btns = [
    {
      type: 'cheap',
      label: 'Самый дешевый',
      handler: cheap,
    },
    {
      type: 'fast',
      label: 'Самый быстрый',
      handler: fast,
    },
    {
      type: 'optimal',
      label: 'Оптимальный',
      handler: optimal,
    },
  ];

  const renderBtns = btns.map((btn) => {
    let className = styles.filtresItem;
    if (btn.type === sort) {
      className += ` ${styles.activeBtn}`;
    }
    return (
      <li
        className={className}
        key={btn.type}
      >
        <button
          className={styles.filterBtn}
          onClick={() => dispatch(btn.handler())}
        >
          {btn.label}
        </button>
      </li>
    );
  });

  return <ul className={styles.filtres}>{renderBtns}</ul>;
}

export default PriceFilter;
