// src/redux/coins/coinsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { convertCurrency, fetchCoins } from '../../services/cryptoServices';

 const fetchCoinsData = createAsyncThunk('coins/fetchCoinsData', async () => {
  const response = await fetchCoins();
  return response.data.data;
});

 const convertCurrencyData = createAsyncThunk('coins/convertCurrencyData', async (params) => {
  const response = await convertCurrency(params.from, params.to, params.amount);
  console.log("convertCurrencyData", response.data.data )
  return response.data.data;
});

const coinsSlice = createSlice({
  name: 'coins',
  initialState: {
    coins: [],
    conversionResult: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinsData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCoinsData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.coins = action.payload;
      })
      .addCase(fetchCoinsData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(convertCurrencyData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.conversionResult = action.payload;
      });
  },
});

export const coinsReducer = coinsSlice.reducer;
export { fetchCoinsData, convertCurrencyData };
