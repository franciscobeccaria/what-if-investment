import { createStore } from 'redux';
import {
  SHOW_MODAL_STOCK,
  SHOW_MODAL_PORTFOLIO,
  CHANGE_AMOUNT_SIMPLE,
  CHANGE_DATE_SIMPLE,
  CHANGE_INVESTMENT_SIMPLE,
  CHANGE_PRICES_SIMPLE,
  CHANGE_GROWTH_SIMPLE,
  CHANGE_PORTFOLIO,
  DELETE_FROM_PORTFOLIO,
  CHANGE_ITEM_FROM_PORTFOLIO,
  CHANGE_SELECTED_IN_ADVANCED_CHART,
  CHANGE_INITIAL_DATE_PORTFOLIO,
  CHANGE_END_DATE_PORTFOLIO,
  CHANGE_AMOUNT_ADVANCED,
  CHANGE_ITEM_PERCENTAGE,
  CHANGE_ITEM_DATA,
  SHOW_MODAL_LOADING,
} from './actions';

const initialStore = {
  showModalStock: false,
  showModalPortfolio: false,
  showModalLoading: false,
  amountSimple: undefined,
  amountAdvanced: undefined,
  dateSimple: '10 years ago',
  investmentSimple: {
    type: 'stock',
    symbol: 'AAPL',
    name: 'Apple Inc.',
  },
  pricesSimple: {
    initial: undefined,
    end: undefined,
    all: [],
  },
  growthSimple: undefined,
  portfolio: [],
  selectedInAdvancedChart: {
    type: 'stock',
    symbol: 'AAPL',
    name: 'Apple Inc.',
  },
  initialDatePortfolio: undefined,
  endDatePortfolio: undefined,
};

// Recibe el estado y la acción
// Devuelve el nuevo estado
const rootReducer = (state = initialStore, action) => {
  console.log(action);
  if (action.type === SHOW_MODAL_STOCK) {
    return {
      ...state,
      showModalStock: action.data,
    };
  }
  if (action.type === SHOW_MODAL_PORTFOLIO) {
    return {
      ...state,
      showModalPortfolio: action.data,
    };
  }
  if (action.type === CHANGE_AMOUNT_SIMPLE) {
    return {
      ...state,
      amountSimple: action.data,
    };
  }
  if (action.type === CHANGE_DATE_SIMPLE) {
    return {
      ...state,
      dateSimple: action.data,
    };
  }
  if (action.type === CHANGE_INVESTMENT_SIMPLE) {
    return {
      ...state,
      investmentSimple: action.data,
    };
  }
  if (action.type === CHANGE_PRICES_SIMPLE) {
    return {
      ...state,
      pricesSimple: action.data,
    };
  }
  if (action.type === CHANGE_GROWTH_SIMPLE) {
    return {
      ...state,
      growthSimple: action.data,
    };
  }
  if (action.type === CHANGE_PORTFOLIO) {
    return {
      ...state,
      portfolio: [...state.portfolio, action.data],
    };
  }
  if (action.type === DELETE_FROM_PORTFOLIO) {
    return {
      ...state,
      portfolio: (state.portfolio = state.portfolio.filter((el) => el.name !== action.data)),
    };
  }
  if (action.type === CHANGE_ITEM_FROM_PORTFOLIO) {
    state.portfolio.filter((e) => e.name === action.data[0])[0].checked = action.data[1];
    return {
      ...state,
    };
  }
  if (action.type === CHANGE_SELECTED_IN_ADVANCED_CHART) {
    return {
      ...state,
      selectedInAdvancedChart: action.data,
    };
  }
  if (action.type === CHANGE_INITIAL_DATE_PORTFOLIO) {
    return {
      ...state,
      initialDatePortfolio: action.data,
    };
  }
  if (action.type === CHANGE_END_DATE_PORTFOLIO) {
    return {
      ...state,
      endDatePortfolio: action.data,
    };
  }
  if (action.type === CHANGE_AMOUNT_ADVANCED) {
    return {
      ...state,
      amountAdvanced: action.data,
    };
  }
  if (action.type === CHANGE_ITEM_PERCENTAGE) {
    let array = state.portfolio;
    array.filter((e) => e.symbol === action.data.symbol)[0].percentage = action.data.percentage;
    // useEffect no detecta cambio en receivedState.portfolio. Pero si pongo receivedState si lo detecta.
    // Quizas que haga la petición cuando tocó el boton Save de ModalPortfolio.
    return {
      ...state,
      portfolio: array,
    };
  }
  if (action.type === CHANGE_ITEM_DATA) {
    let array = state.portfolio;
    array.filter((e) => e.symbol === action.data.symbol)[0].data = action.data.data;
    // Este lo mismo que CHANGE_ITEM_PERCENTAGE.
    return {
      ...state,
      portfolio: array,
    };
  }
  if (action.type === SHOW_MODAL_LOADING) {
    return {
      ...state,
      showModalLoading: action.data,
    };
  }
  console.log(state);
  return state;
};

export default createStore(rootReducer);
