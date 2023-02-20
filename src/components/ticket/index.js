import styles from './ticket.module.scss';

function Ticket(props) {
  const { price, company, segments } = props;

  const formatPrice = (val) =>
    val
      .reverse()
      .reduce((acc, char, i) => {
        if (i % 3 === 0) {
          acc += ' ';
        }
        acc += char;
        return acc;
      }, 'P')
      .split('')
      .reverse()
      .join('');

  const transfersTitile = (transfers) => {
    switch (transfers) {
      case 0: {
        return 'Без пересадок';
      }
      case 1: {
        return '1 пересадка';
      }
      default:
        return `${transfers} пересадки`;
    }
  };

  const formatFlightDuration = (time) => {
    let hours = Math.floor(time / 60);
    hours = hours < 10 ? `0${hours}` : hours;
    let minutes = Math.floor(time % 60);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}ч ${minutes}м`;
  };

  const formatFlightTime = (time, duration) => {
    let startHours = new Date(time).getHours();
    startHours = startHours < 10 ? `0${startHours}` : startHours;
    let startMinutes = new Date(time).getMinutes();
    startMinutes = startMinutes < 10 ? `0${startMinutes}` : startMinutes;
    const endTime = new Date(
      0,
      0,
      0,
      startHours + Math.floor(duration / 60),
      startMinutes + Math.floor(duration % 60),
      0,
      0
    );
    let endHours = new Date(endTime).getHours();
    endHours = endHours < 10 ? `0${endHours}` : endHours;
    let endMinutes = new Date(endTime).getMinutes();
    endMinutes = endMinutes < 10 ? `0${endMinutes}` : endMinutes;
    return `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
  };

  return (
    <div className={styles.ticket}>
      <div className={styles.header}>
        <h3 className={styles.price}>{formatPrice(price.toString().split(''))}</h3>
        <img
          src={`https://pics.avs.io/99/36/${company}.png`}
          alt="Logo"
          className={styles.logo}
        />
      </div>
      <div>
        {segments.map((item) => (
          <div
            key={item.date}
            className={styles.flightInfo}
          >
            <div className={styles.infoItem}>
              <div className={styles.infoTitle}>
                {item.origin} – {item.destination}
              </div>
              <div className={styles.infoDescr}>
                {/* 10:45 – 08:00 */}
                {formatFlightTime(item.date, item.duration)}
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoItem}>
                <div className={styles.infoTitle}>В пути</div>
                <div className={styles.infoDescr}>
                  {/* 21ч 15м */}
                  {formatFlightDuration(item.duration)}
                </div>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoItem}>
                <div className={styles.infoTitle}>{transfersTitile(item.stops.length)}</div>
                <div className={styles.infoDescr}>{item.stops.join(', ')}</div>
              </div>
            </div>
          </div>
        ))}
        {/* <div className={styles.flightInfo}>
          <div className={styles.infoItem}>
            <div className={styles.infoTitle}>
              {firstFlightOrigin} – {firstFlightDestination}
            </div>
            <div className={styles.infoDescr}>10:45 – 08:00</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoItem}>
              <div className={styles.infoTitle}>В пути</div>
              <div className={styles.infoDescr}>21ч 15м</div>
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoItem}>
              <div className={styles.infoTitle}>MOW – HKT</div>
              <div className={styles.infoDescr}>HKG, JNB</div>
            </div>
          </div>
        </div>
        <div className={styles.flightInfo}>
          <div className={styles.infoItem}>
            <div className={styles.infoTitle}>MOW – HKT</div>
            <div className={styles.infoDescr}>11:20 – 00:50</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoItem}>
              <div className={styles.infoTitle}>В пути</div>
              <div className={styles.infoDescr}>13ч 30м</div>
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoItem}>
              <div className={styles.infoTitle}>MOW – HKT</div>
              <div className={styles.infoDescr}>HKG</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Ticket;
