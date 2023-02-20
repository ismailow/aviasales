export const cheap = () => ({ type: 'CHEAP' });
export const fast = () => ({ type: 'FAST' });
export const optimal = () => ({ type: 'OPTI' });

export const updateCheckbox = (check) => ({ type: 'UPDATE_CHECKBOX', payload: check.target.id });
export const selectAll = () => ({ type: 'CHECK_ALL' });

export const getSearchId = () => async (dispatch) => {
  const request = await fetch('https://aviasales-test-api.kata.academy/search');
  const response = await request.json();
  dispatch({
    type: 'GET_SEARCH_ID',
    id: response.searchId,
  });
};

export const loadTickets = (searchId) => async (dispatch) => {
  try {
    const request = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
    if (request.status === 502) {
      await loadTickets(searchId)(dispatch);
    } else if (request.status !== 200) {
      await loadTickets(searchId)(dispatch);
    } else {
      const response = await request.json();
      dispatch({
        type: 'TICKETS_LOAD',
        data: response.tickets,
      });
      dispatch({
        type: 'LOADING_END',
      });
      if (!response.stop) {
        loadTickets(searchId)(dispatch);
      } else {
        dispatch({
          type: 'GENERAL_LOADING',
        });
      }
    }
  } catch {
    dispatch({
      type: 'LOADING_ERROR',
    });
  }
};
