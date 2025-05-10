import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/transactions");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transaction, thunkAPI) => {
    try {
      const res = await axios.post("/transactions", transaction);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (transactionId, thunkAPI) => {
    try {
      await axios.delete(`/transactions/${transactionId}`);
      return transactionId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async ({ transactionId, transaction }, thunkAPI) => {
    try {
      const res = await axios.patch(
        `/transactions/${transactionId}`,
        transaction
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
export const transactionCategories = createAsyncThunk(
  "transactions/transactionCategories",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/transaction-categories");
      // console.log("Fetched categories:", res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
export const transactionSummary = createAsyncThunk(
  "transactions/transactionSummary",
  async ({ month, year, transaction }, thunkAPI) => {
    try {
      const res = await axios.get(
        `/transactions-summary?month=${month}&year=${year}`,
        transaction
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
