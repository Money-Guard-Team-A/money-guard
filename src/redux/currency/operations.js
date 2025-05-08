import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CURRENCY_STORAGE_KEY = "currency_rates";
const CURRENCY_UPDATE_TIME_KEY = "currency_last_update";
const UPDATE_INTERVAL = 3600000; 


const checkLocalStorage = () => {
  const storedRates = localStorage.getItem(CURRENCY_STORAGE_KEY);
  const lastUpdate = localStorage.getItem(CURRENCY_UPDATE_TIME_KEY);
  
  if (storedRates && lastUpdate) {
    const now = new Date().getTime();
    const lastUpdateTime = new Date(lastUpdate).getTime();
    
    if (now - lastUpdateTime < UPDATE_INTERVAL) {
      return JSON.parse(storedRates);
    }
  }
  return null;
};


const updateLocalStorage = (rates) => {
  localStorage.setItem(CURRENCY_STORAGE_KEY, JSON.stringify(rates));
  localStorage.setItem(CURRENCY_UPDATE_TIME_KEY, new Date().toISOString());
};


export const fetchCurrencyRates = createAsyncThunk(
  "currency/fetchRates",
  async (_, thunkAPI) => {
    try {
     
      const storedRates = checkLocalStorage();
      if (storedRates) {
        return storedRates;
      }

      const response = await axios.get("https://api.monobank.ua/bank/currency");
      

      const filteredRates = response.data.filter(
        (rate) => rate.currencyCodeA === 840 || rate.currencyCodeA === 978
      );

     
      updateLocalStorage(filteredRates);
      
      return filteredRates;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch currency rates"
      );
    }
  }
); 