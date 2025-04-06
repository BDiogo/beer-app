import BeerReducer from "./beer/BeerSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    beers: BeerReducer,
  },
});
