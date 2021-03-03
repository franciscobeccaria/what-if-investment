import {
  SHOW_MODAL_STOCK,
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
  SHOW_MODAL_PORTFOLIO,
  CHANGE_ITEM_PERCENTAGE,
  CHANGE_ITEM_DATA,
  SHOW_MODAL_LOADING,
} from './actions';

const showModalStock = (data) => ({
  type: SHOW_MODAL_STOCK,
  data,
});

const showModalPortfolio = (data) => ({
  type: SHOW_MODAL_PORTFOLIO,
  data,
});

const changeAmountSimple = (data) => ({
  type: CHANGE_AMOUNT_SIMPLE,
  data,
});

const changeDateSimple = (data) => ({
  type: CHANGE_DATE_SIMPLE,
  data,
});

const changeInvestmentSimple = (data) => ({
  type: CHANGE_INVESTMENT_SIMPLE,
  data,
});

const changePricesSimple = (data) => ({
  type: CHANGE_PRICES_SIMPLE,
  data,
});

const changeGrowthSimple = (data) => ({
  type: CHANGE_GROWTH_SIMPLE,
  data,
});

const changePortfolio = (data) => ({
  type: CHANGE_PORTFOLIO,
  data,
});

const deleteFromPortfolio = (data) => ({
  type: DELETE_FROM_PORTFOLIO,
  data,
});

const changeItemFromPortfolio = (data) => ({
  type: CHANGE_ITEM_FROM_PORTFOLIO,
  data,
});

const changeSelectedInAdvancedChart = (data) => ({
  type: CHANGE_SELECTED_IN_ADVANCED_CHART,
  data,
});

const changeInitialDatePortfolio = (data) => ({
  type: CHANGE_INITIAL_DATE_PORTFOLIO,
  data,
});

const changeEndDatePortfolio = (data) => ({
  type: CHANGE_END_DATE_PORTFOLIO,
  data,
});

const changeAmountAdvanced = (data) => ({
  type: CHANGE_AMOUNT_ADVANCED,
  data,
});

const changeItemPercentage = (data) => ({
  type: CHANGE_ITEM_PERCENTAGE,
  data,
});

const changeItemData = (data) => ({
  type: CHANGE_ITEM_DATA,
  data,
});

const showModalLoading = (data) => ({
  type: SHOW_MODAL_LOADING,
  data,
});

export {
  showModalStock,
  changeAmountSimple,
  changeDateSimple,
  changeInvestmentSimple,
  changePricesSimple,
  changeGrowthSimple,
  changePortfolio,
  deleteFromPortfolio,
  changeItemFromPortfolio,
  changeSelectedInAdvancedChart,
  changeInitialDatePortfolio,
  changeEndDatePortfolio,
  changeAmountAdvanced,
  showModalPortfolio,
  changeItemPercentage,
  changeItemData,
  showModalLoading,
};
