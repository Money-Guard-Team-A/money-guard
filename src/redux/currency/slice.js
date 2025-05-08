import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrencyRates } from "./operations";

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    rates: [],
    lastUpdate: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setLastUpdate: (state, action) => {
      state.lastUpdate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencyRates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrencyRates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rates = action.payload;
        state.lastUpdate = new Date().toISOString();
      })
      .addCase(fetchCurrencyRates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setLastUpdate } = currencySlice.actions;
export const currencyReducer = currencySlice.reducer;
