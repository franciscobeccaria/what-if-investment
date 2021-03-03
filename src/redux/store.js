import { createStore } from 'redux';
import {
  SHOW_MODAL_STOCK,
  SHOW_MODAL_LOADING,
  CHANGE_AMOUNT_HOME,
  CHANGE_DATE_HOME,
  CHANGE_INVESTMENT_HOME,
  UPDATE_DATA_INVESTMENT_HOME,
  CHANGE_AMOUNT_PORTFOLIO,
  CHANGE_DATE_PORTFOLIO,
  ADD_INVESTMENT_PORTFOLIO,
  REMOVE_INVESTMENT_PORTFOLIO,
  SHOW_MODAL_PORTFOLIO,
  CHANGE_PERCENTAGE,
  UPDATE_DATA_PORTFOLIO,
  CHANGE_SELECTED_PORTFOLIO,
} from './actions';

const initialStore = {
  showModalStock: false,
  showModalLoading: false,
  showModalPortfolio: false,
  amountHome: undefined,
  investmentHome: {
    type: 'stock',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    id: undefined,
  },
  dateHome: '10 years ago',
  dataInvestmentHome: [],
  amountPortfolio: undefined,
  datePortfolio: {
    initial: undefined,
    end: undefined,
  },
  portfolio: {
    AAPL: {
      type: 'stock',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      id: undefined,
      percentage: 0,
    },
  },
  portfolioData: {
    AAPL: {
      initialDate: '',
      endDate: '',
      data: [],
    },
  },
  selectedPortfolio: {
    name: undefined,
    symbol: undefined,
    id: undefined,
  },
};

const rootReducer = (state = initialStore, action) => {
  console.log(action);
  console.log(state);
  if (action.type === SHOW_MODAL_STOCK) {
    return {
      ...state,
      showModalStock: action.data,
    };
  }
  if (action.type === SHOW_MODAL_LOADING) {
    return {
      ...state,
      showModalLoading: action.data,
    };
  }
  if (action.type === CHANGE_AMOUNT_HOME) {
    return {
      ...state,
      amountHome: action.data,
    };
  }
  if (action.type === CHANGE_DATE_HOME) {
    return {
      ...state,
      dateHome: action.data,
    };
  }
  if (action.type === CHANGE_INVESTMENT_HOME) {
    return {
      ...state,
      investmentHome: action.data,
    };
  }
  if (action.type === UPDATE_DATA_INVESTMENT_HOME) {
    return {
      ...state,
      dataInvestmentHome: action.data,
    };
  }
  if (action.type === CHANGE_AMOUNT_PORTFOLIO) {
    return {
      ...state,
      amountPortfolio: action.data,
    };
  }
  if (action.type === CHANGE_DATE_PORTFOLIO) {
    return {
      ...state,
      datePortfolio: action.data,
    };
  }
  if (action.type === ADD_INVESTMENT_PORTFOLIO) {
    return {
      ...state,
      portfolio: {
        ...state.portfolio,
        [action.data.id || action.data.symbol]: action.data,
      },
      portfolioData: {
        ...state.portfolioData,
        [action.data.id || action.data.symbol]: {
          initialDate: '',
          endDate: '',
          data: [],
        },
      },
    };
  }
  if (action.type === REMOVE_INVESTMENT_PORTFOLIO) {
    const key = action.data;
    const { [key]: value, ...newPortfolio } = state.portfolio;
    const { [key]: val, ...newPortfolioData } = state.portfolioData;
    return {
      ...state,
      portfolio: newPortfolio,
      portfolioData: newPortfolioData,
    };
  }
  if (action.type === SHOW_MODAL_PORTFOLIO) {
    return {
      ...state,
      showModalPortfolio: action.data,
    };
  }
  if (action.type === CHANGE_PERCENTAGE) {
    return {
      ...state,
      portfolio: {
        ...state.portfolio,
        [action.data.symbol]: {
          ...state.portfolio[action.data.symbol],
          percentage: action.data.percentage,
        },
      },
    };
  }
  if (action.type === UPDATE_DATA_PORTFOLIO) {
    return {
      ...state,
      portfolioData: {
        ...state.portfolioData,
        [action.data.symbol]: {
          initialDate: action.data.initialDate,
          endDate: action.data.endDate,
          data: action.data.data,
        },
      },
    };
  }
  if (action.type === CHANGE_SELECTED_PORTFOLIO) {
    return {
      ...state,
      selectedPortfolio: action.data,
    };
  }
  return state;
};

export default createStore(rootReducer);
