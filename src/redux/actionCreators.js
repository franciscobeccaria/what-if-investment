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

const showModalStock = (data) => ({
  type: SHOW_MODAL_STOCK,
  data,
});

const showModalLoading = (data) => ({
  type: SHOW_MODAL_LOADING,
  data,
});

const changeAmountHome = (data) => ({
  type: CHANGE_AMOUNT_HOME,
  data,
});

const changeDateHome = (data) => ({
  type: CHANGE_DATE_HOME,
  data,
});

const changeInvestmentHome = (data) => ({
  type: CHANGE_INVESTMENT_HOME,
  data,
});

const updateDataInvestmentHome = (data) => ({
  type: UPDATE_DATA_INVESTMENT_HOME,
  data,
});

const changeAmountPortfolio = (data) => ({
  type: CHANGE_AMOUNT_PORTFOLIO,
  data,
});

const changeDatePortfolio = (data) => ({
  type: CHANGE_DATE_PORTFOLIO,
  data,
});

const addInvestmentPortfolio = (data) => ({
  type: ADD_INVESTMENT_PORTFOLIO,
  data,
});

const removeInvestmentPortfolio = (data) => ({
  type: REMOVE_INVESTMENT_PORTFOLIO,
  data,
});

const showModalPortfolio = (data) => ({
  type: SHOW_MODAL_PORTFOLIO,
  data,
});

const changePercentage = (data) => ({
  type: CHANGE_PERCENTAGE,
  data,
});

const updateDataPortfolio = (data) => ({
  type: UPDATE_DATA_PORTFOLIO,
  data,
});

const changeSelectedPortfolio = (data) => ({
  type: CHANGE_SELECTED_PORTFOLIO,
  data,
});

export {
  showModalStock,
  changeAmountHome,
  changeDateHome,
  changeInvestmentHome,
  updateDataInvestmentHome,
  showModalLoading,
  changeAmountPortfolio,
  changeDatePortfolio,
  addInvestmentPortfolio,
  removeInvestmentPortfolio,
  showModalPortfolio,
  changePercentage,
  updateDataPortfolio,
  changeSelectedPortfolio,
};
