// src/components/HomePage/HomePage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../common/Table';
import { fetchCoinsData } from '../../redux/coins/coinsSlice';

import { Container } from '@mui/material';
import { fetchCoinInfo, fetchLogo } from '../../services/cryptoServices';

const HomePage = () => {
  const dispatch = useDispatch();
  const coins = useSelector((state) => state.coins.coins);
  const [coinData, setCoinData] = useState([]); // Store additional data per coin
  const [coinLogos, setCoinLogos] = useState({});

  const fetchAllData = async () => {
    const dataPromises = coins.map(async (coin) => {
      try {
        const coinInfoResponse = await fetchCoinInfo(coin.id);
        const logoUrl = coinInfoResponse.data.data[coin.id]?.logo;
        const logoImage = await fetchLogo(logoUrl);

        const coinData = {
          id: coin.id,
          logoUrl,
          logoImage: logoImage.data,
          currentTradedValue: coinInfoResponse.data.data[coin.id]?.quote.USD.price,
          netChange24h: coinInfoResponse.data.data[coin.id]?.quote.USD.percent_change_24h,
          netChange7d: coinInfoResponse.data.data[coin.id]?.quote.USD.percent_change_7d,
        };

        return coinData;
      } catch (error) {
        console.error(`Error fetching data for coin ${coin.id}:`, error.message);
        return null;
      }
    });

    const dataResults = await Promise.all(dataPromises);
    const validData = dataResults.filter((data) => data !== null);

    setCoinData(validData);

    const logosMap = validData.reduce((acc, data) => {
      acc[data.id] = data.logoImage;
      return acc;
    }, {});

    setCoinLogos(logosMap);
  };



  useEffect(() => {
    dispatch(fetchCoinsData());

    const callingFetchAllData = async() =>{
      return fetchAllData()
    }

    callingFetchAllData(); 
    const intervalId = setInterval(callingFetchAllData, 60000); // call every 60 seconds


    return () => clearInterval(intervalId);

  }, [dispatch ,coins, fetchAllData]);


  const tableHeaders = [
    'Logo',
    'Name',
    'Price',
    'Net Change (24H)',
    'Net Change (7D)',
    'Market Cap',
    'Volume (24H)',
    'Circulating Supply',
  ];

  return (
    <Container>
      <CustomTable headers={tableHeaders} data={enrichCoinDataWithLogos(coins, coinData, coinLogos)} />
    </Container>
  );
};

const enrichCoinDataWithLogos = (coins, coinData, logos) => {

  console.log("coinData Image", {
    coinData,
    logos
  })
  return coins.map((coin) => {
    const data = coinData.find((item) => item.id === coin.id);
    return {
      ...coin,
      Logo: logos[coin.id],
      Price: data?.currentTradedValue || '-',
      'Net Change (24H)': data?.netChange24h || '-',
      'Net Change (7D)': data?.netChange7d || '-',
    };
  });
};

export default HomePage;
