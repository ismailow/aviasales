import styles from './logo.module.scss';

function Logo() {
  return (
    <div className={styles.logoBlock}>
      <img
        src="/img/logo.svg"
        alt="Logo"
      />
    </div>
  );
}

export default Logo;
