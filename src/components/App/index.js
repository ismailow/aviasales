/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { Spin } from 'antd';

import Logo from '../Logo';
import StopsFilter from '../StopsFilter';
import PriceFilter from '../priceFilter';
import Ticket from '../ticket';
import ErrorIndicator from '../errorIndicator';
import GeneralLoadingIndicator from '../generalLoadingIndicatro';
import { getSearchId, loadTickets } from '../../actions';

import styles from './app.module.scss';
import './loaderStyles.scss';

function App() {
  const [visibleTicketsCount, setVisibleTicketsCount] = useState(5);
  const [filterError, setFilterError] = useState(false);
  const dispatch = useDispatch();
  const id = useSelector((state) => state.id);
  const sort = useSelector((state) => state.sort);
  const filter = useSelector((state) => state.transferCheckboxes);
  const appState = useSelector((state) => state.appState);
  const generalLoading = useSelector((state) => state.generalLoading);

  const filters = Object.entries(filter);

  const onFilters = filters.filter((item) => {
    if (item[1]) {
      return true;
    }
  });

  const onFiltersCounter = filters.reduce((acc, current) => {
    if (current[1]) {
      acc += 1;
    }
    return acc;
  }, 0);

  useEffect(() => {
    dispatch(getSearchId());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(loadTickets(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const filterTickets = (tickets) => {
    const filtersKeys = {
      all: 'all',
      zero: 0,
      one: 1,
      two: 2,
      three: 3,
    };

    if (onFiltersCounter === 1) {
      return tickets.filter((item) => {
        if (item.segments[0].stops.length === filtersKeys[onFilters[0][0]]) {
          return true;
        }
      });
    }

    if (onFiltersCounter === 2) {
      return tickets.filter((item) => {
        if (
          item.segments[0].stops.length === filtersKeys[onFilters[0][0]] ||
          item.segments[0].stops.length === filtersKeys[onFilters[1][0]]
        ) {
          return true;
        }
      });
    }

    if (onFiltersCounter === 3) {
      return tickets.filter((item) => {
        if (
          item.segments[0].stops.length === filtersKeys[onFilters[0][0]] ||
          item.segments[0].stops.length === filtersKeys[onFilters[1][0]] ||
          item.segments[0].stops.length === filtersKeys[onFilters[2][0]]
        ) {
          return true;
        }
      });
    }

    if (onFiltersCounter > 3) {
      return tickets;
    }
  };

  useEffect(() => {
    if (onFiltersCounter === 0) {
      setFilterError((prev) => {
        if (!prev) {
          return true;
        }
      });
    } else {
      setFilterError((prev) => {
        if (prev) {
          return false;
        }
      });
    }
  }, [onFiltersCounter]);

  const tickets = useSelector((state) => state.tickets);

  const filteredTickets = filterTickets(tickets);

  const sortedTickets =
    filteredTickets &&
    filteredTickets.sort((currentItem, nextItem) => {
      if (sort === 'cheap') {
        if (currentItem.price < nextItem.price) {
          return -1;
        }
        if (currentItem.price > nextItem.price) {
          return 1;
        }
        return 0;
      }
      if (sort === 'fast') {
        if (
          currentItem.segments[0].duration + currentItem.segments[1].duration <
          nextItem.segments[0].duration + nextItem.segments[1].duration
        ) {
          return -1;
        }
        if (
          currentItem.segments[0].duration + currentItem.segments[1].duration >
          nextItem.segments[0].duration + nextItem.segments[1].duration
        ) {
          return 1;
        }
        return 0;
      }
      if (sort === 'optimal') {
        if (
          currentItem.price + currentItem.segments[0].duration + currentItem.segments[1].duration <
          nextItem.price + nextItem.segments[0].duration + nextItem.segments[1].duration
        ) {
          return -1;
        }
        if (
          currentItem.price + currentItem.segments[0].duration + currentItem.segments[1].duration >
          nextItem.price + nextItem.segments[0].duration + nextItem.segments[1].duration
        ) {
          return 1;
        }
        return 0;
      }
    });

  const visibleTickets = sortedTickets && sortedTickets.slice(0, visibleTicketsCount);

  const LoadingIndicator = appState === 'loading' ? <Spin size="large" /> : null;
  const errorIndicator = appState === 'error' ? <ErrorIndicator /> : null;
  const filterErrorIndicator = filterError ? (
    <div className={styles.filterError}>Рейсов, подходящих под заданные фильтры, не найдено</div>
  ) : null;
  const generalLoadingIndicator = generalLoading ? <GeneralLoadingIndicator /> : null;

  return (
    <div className={styles.app}>
      {generalLoadingIndicator}
      <Logo />
      <div className={styles.wrapper}>
        <StopsFilter />
        <div className={styles.content}>
          <PriceFilter />
          {errorIndicator}
          <div className={styles.ticketsList}>
            {LoadingIndicator}
            {filterErrorIndicator}
            {visibleTickets &&
              visibleTickets.map((ticket) => (
                <Ticket
                  key={uniqid()}
                  price={ticket.price}
                  company={ticket.carrier}
                  segments={ticket.segments}
                />
              ))}
            {appState === 'done' && !filterError ? (
              <button
                className={styles.loadMoreBtn}
                onClick={() => {
                  setVisibleTicketsCount((count) => count + 5);
                }}
              >
                Показать еще 5 билетов!
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
