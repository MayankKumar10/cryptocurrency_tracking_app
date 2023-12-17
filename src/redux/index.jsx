import { configureStore } from "@reduxjs/toolkit";
import { coinsReducer } from "./coins/coinsSlice";


export const store = configureStore({
  reducer: {
    coins: coinsReducer,
  },
});