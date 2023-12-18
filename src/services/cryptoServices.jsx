// cryptoServices.js (or the appropriate file name)

import axios from 'axios';

const proxyURL = 'http://localhost:5000/api';

const instance = axios.create({
  baseURL: proxyURL,
});

export const fetchCoins = () => instance.get('/cryptocurrency/listings/latest');

export const convertCurrency = (from, to, amount) =>
  instance.get('/tools/price-conversion', { params: { amount, symbol: from, convert: to } });

