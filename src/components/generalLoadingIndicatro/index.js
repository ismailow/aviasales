import { Spin } from 'antd';

import styles from './generalLoadingIndicatro.module.scss';

function GeneralLoadingIndicator() {
  return (
    <div className={styles.block}>
      <Spin className={styles.loadingIndicator} />
      <span>Данные загружаются</span>
    </div>
  );
}

export default GeneralLoadingIndicator;
