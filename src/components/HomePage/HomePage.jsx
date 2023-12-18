import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../common/Table';
import { fetchCoinsData } from '../../redux/coins/coinsSlice';
import { Container } from '@mui/material';

const HomePage = () => {
  const dispatch = useDispatch();
  const coins = useSelector((state) => state.coins.coins);
  const [coinData, setCoinData] = useState([]); // Store additional data per coin
  const [coinLogos, setCoinLogos] = useState({});

  useEffect(() => {
    dispatch(fetchCoinsData());

  }, [dispatch, coins]);

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
      <CustomTable headers={tableHeaders} data={enrichCoinDataWithLogos(coins)} />
    </Container>
  );
};

const enrichCoinDataWithLogos = (coins) => {

  return coins.map((coin) => {

    return {
      ...coin,
      Logo: coins[coin.id],
      Price: coin?.currentTradedValue || '-',
      'Net Change (24H)': coin?.netChange24h || '-',
      'Net Change (7D)': coin?.netChange7d || '-',
    };
  });
};

export default HomePage;