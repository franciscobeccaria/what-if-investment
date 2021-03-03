import axios from 'axios';
import moment from 'moment';
const baseUrl = 'http://localhost:3001/notes';
const stockRequestHeaders = {
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer ogG8k3GwGImUQXmAjvzxl5tIWapI',
  },
};

const getStockData = (symbol, interval, initialDate, endDate) => {
  const request = axios.get(
    `https://sandbox.tradier.com/v1/markets/history?symbol=${symbol}&interval=${interval}&start=${initialDate}&end=${endDate}`,
    stockRequestHeaders
  );
  return request.then((resp) => {
    let dataArray = [];
    resp.data.history.day.forEach((e) => dataArray.push({ time: e.date, value: e.close }));
    return dataArray;
  });
};

const getCryptoData = (id, initialDate, endDate) => {
  let finish = false;
  let arrayData = [];

  const apiCall = (initialDate, endDate) => {
    let start = initialDate;
    let end = moment(initialDate).add(365, 'days').toISOString().slice(0, 10);
    const request = axios.get(`https://api.coinpaprika.com/v1/coins/${id}/ohlcv/historical?start=${start}&end=${end}`);
    return request.then((resp) => {
      resp.data.forEach((e) => {
        if (e.time_open.slice(0, 10) === endDate) {
          arrayData.push({ time: e.time_open.slice(0, 10), value: e.open });
          finish = true;
        } else if (finish === false) {
          arrayData.push({ time: e.time_open.slice(0, 10), value: e.open });
        }
      });
      if (finish === true) {
        return arrayData;
      } else return apiCall(end, endDate);
    });
  };
  return apiCall(initialDate, endDate);
};

export { getStockData, getCryptoData };
