import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import '../../styles/animations.css'

const CoinCard = ({ coin }) => {
  return (
    <Card className="fadeIn">
    <CardContent>
      <Typography variant="h5">{coin.name}</Typography>
      <Typography variant="body1">{coin.symbol}</Typography>
      {/* Add other coin details here */}
    </CardContent>
  </Card>
  );
};

export default CoinCard;
