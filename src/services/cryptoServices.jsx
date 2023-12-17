import axios from 'axios';

const proxyURL = 'http://localhost:5000/api';

const API_KEY = '1a7b5dc0-566d-461f-8d53-914190919176'; // Replace with your CoinMarketCap API key

const instance = axios.create({
  baseURL: proxyURL,
});

const instance1 = axios.create({
  baseURL: 'https://pro-api.coinmarketcap.com/v2',
  headers: {
    'X-CMC_PRO_API_KEY': API_KEY,
  },
});


export const fetchCoins = () => instance.get('/cryptocurrency/listings/latest');
export const convertCurrency = (from, to, amount) =>
  instance.get('/tools/price-conversion', { params: { amount, symbol: from, convert: to } });


  export const fetchCoinInfo = async (id) => {
    try {
      const response = await instance1.get(`/cryptocurrency/info?id=${id}`);
      console.log('Coin Info Response', response.data); // Log the response
      return response.data;
    } catch (error) {
      console.error('Error fetching coin info', error);
      throw error;
    }
  };
  
  export const fetchLogo = async (slug) => {
    try {
      const response = await instance1.get(`/cryptocurrency/info?slug=${slug}`);
      console.log('Logo Response', response.data); // Log the response
      return response.data;
    } catch (error) {
      console.error('Error fetching logo', error);
      throw error;
    }
  };
  




