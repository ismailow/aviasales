import styles from './errorIndicator.module.scss';

function ErrorIndicator() {
  const reloadPage = () => {
    const location = window.location.href;
    window.location.href = location;
  };

  return (
    <div className={styles.error}>
      <img
        src="/img/error.png"
        alt="error indicator"
      />
      <p>Что-то пошло не так...</p>
      <button
        onClick={reloadPage}
        className={styles.button}
      >
        Перезагрузить страницу?
      </button>
    </div>
  );
}

export default ErrorIndicator;
