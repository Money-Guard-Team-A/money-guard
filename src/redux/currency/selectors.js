export const selectCurrencyRates = (state) => state.currency.rates;
export const selectLastUpdate = (state) => state.currency.lastUpdate;
export const selectIsLoading = (state) => state.currency.isLoading;
export const selectError = (state) => state.currency.error; 