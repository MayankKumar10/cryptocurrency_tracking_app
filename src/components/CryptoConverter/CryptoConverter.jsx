import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Grid, MenuItem, Select, TextField, Button } from '@mui/material';
import { useSelector } from 'react-redux';

const CryptoConverter = () => {


  const coins = useSelector((state) => state.coins.coins);
  const [sourceCurrency, setSourceCurrency] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    // Set default source and target currencies
    if (coins.length > 0) {
      setSourceCurrency(coins[0].symbol);
      setTargetCurrency(coins[1].symbol);
    }
  }, [coins]);

  const getLogoUrl = (symbol) => {
    // Replace this with your logic for dynamically importing images
    // You might need to adjust the path based on your project structure
  
    const logos = require.context('../../assets/icons', false, /\.png$/);
    const logoKeys = logos.keys();
  
    // Filter logoKeys based on symbol match
    const matchingLogoKeys = logoKeys.filter((key) => {
      const keySymbol = key.match(/\/([a-z0-9]+)\.png$/)[1];
      return keySymbol.toLowerCase() === symbol.toLowerCase();
    });
  
    // Take the first matching logo key
    const logoPath = matchingLogoKeys.length > 0 ? matchingLogoKeys[0] : null;
    return logoPath ? logos(logoPath) : null;
  };

  const onChange = (e, setCurrency) =>{
    const{value} = e.target
    setCurrency(value)
    setConvertedAmount(null)
  }

  const handleConvert = () => {
    const conversionRate = (currency) => coins.filter((e) => e?.symbol === currency);
    const result =
      (Number(amount) * Number(conversionRate(sourceCurrency)[0]?.quote?.USD?.price)) /
      Number(conversionRate(targetCurrency)[0]?.quote?.USD?.price);

    setConvertedAmount(result);
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Crypto Currency Converter
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Select fullWidth value={sourceCurrency} onChange={(e) => onChange(e, setSourceCurrency)}>
              {coins.map((coin) => (
                <MenuItem key={coin.id} value={coin.symbol}>
                  {<img
                  src={getLogoUrl(coin?.symbol)}
                  alt={coin.name}
                  style={{ width: '20px', height: '20px' }}
                />} &nbsp; {coin.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h5" align="center">
              TO
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Select fullWidth value={targetCurrency} onChange={(e) => onChange(e, setTargetCurrency)}>
              {coins.map((coin) => (
                <MenuItem key={coin.id} value={coin.symbol}>
                  {<img
                  src={getLogoUrl(coin?.symbol)}
                  alt={coin.name}
                  style={{ width: '20px', height: '20px' }}
                />} &nbsp; {coin.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleConvert}>
              Convert
            </Button>
          </Grid>
          <Grid item xs={12}>
            {convertedAmount !== null && (
              <Typography variant="h6" align="center">
                Converted Amount: {convertedAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}{' '}
                 ({ targetCurrency })
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CryptoConverter;
