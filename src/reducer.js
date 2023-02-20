const initialState = {
  tickets: [],
  sort: 'cheap',
  id: null,
  transferCheckboxes: {
    all: false,
    zero: false,
    one: false,
    two: true,
    three: false,
  },
  allChecked: false,
  appState: 'loading',
  generalLoading: true,
};

// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHEAP':
      return { ...state, sort: 'cheap' };
    case 'FAST':
      return { ...state, sort: 'fast' };
    case 'OPTI':
      return { ...state, sort: 'optimal' };
    case 'CHECK_ALL':
      return {
        ...state,
        allChecked: !state.allChecked,
        transferCheckboxes: {
          all: !state.allChecked,
          zero: !state.allChecked,
          one: !state.allChecked,
          two: !state.allChecked,
          three: !state.allChecked,
        },
      };
    case 'UPDATE_CHECKBOX': {
      const currentCheck = !state.transferCheckboxes[action.payload];

      if (currentCheck) {
        const checks = Object.values(state.transferCheckboxes).reduce((acc, next) => {
          if (next) {
            acc += 1;
          }
          return acc;
        }, 0);

        if (checks >= 3) {
          return {
            ...state,
            allChecked: !state.allChecked,
            transferCheckboxes: {
              all: !state.allChecked,
              zero: !state.allChecked,
              one: !state.allChecked,
              two: !state.allChecked,
              three: !state.allChecked,
            },
          };
        }
      } else {
        const checks = Object.values(state.transferCheckboxes).reduce((acc, next) => {
          if (!next) {
            acc += 1;
          }
          return acc;
        }, 0);

        if (checks < 3) {
          return {
            ...state,
            allChecked: false,
            transferCheckboxes: {
              ...state.transferCheckboxes,
              all: false,
              [action.payload]: false,
            },
          };
        }
      }

      return {
        ...state,
        transferCheckboxes: {
          ...state.transferCheckboxes,
          [action.payload]: !state.transferCheckboxes[action.payload],
        },
      };
    }
    case 'GET_SEARCH_ID': {
      return {
        ...state,
        id: action.id,
      };
    }
    case 'TICKETS_LOAD': {
      return {
        ...state,
        tickets: [...state.tickets, ...action.data],
      };
    }
    case 'LOADING_END': {
      return {
        ...state,
        appState: 'done',
      };
    }
    case 'LOADING_ERROR': {
      return {
        ...state,
        appState: 'error',
      };
    }
    case 'GENERAL_LOADING': {
      return {
        ...state,
        generalLoading: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
