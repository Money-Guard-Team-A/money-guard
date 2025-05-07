import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
  transactionCategories,
  transactionSummary,
} from "./operations";
import { toast } from "react-hot-toast";

const handlePending = (state) => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error =
    action.payload || action.error?.message || "An unknown error occurred";
};
const transactions = createSlice({
  name: "transactions",
  initialState: {
    items: [],
    categories: [],
    isLoading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, handlePending)
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, handleRejected)
      .addCase(addTransaction.pending, handlePending)
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
        toast.success("Transaction added successfully!");
      })
      .addCase(addTransaction.rejected, handleRejected)
      .addCase(deleteTransaction.pending, handlePending)
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(
          (transaction) => transaction.id !== action.meta.arg // Silinen öğeyi hemen kaldır
        );
        toast.success("Transaction deleted successfully!");
      })
      .addCase(deleteTransaction.rejected, handleRejected)
      .addCase(updateTransaction.pending, handlePending)
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(
          (transaction) => transaction.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
          toast.success("Transaction updated successfully!");
        }
      })
      .addCase(updateTransaction.rejected, handleRejected)
      .addCase(transactionCategories.pending, handlePending)
      .addCase(transactionCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(transactionCategories.rejected, handleRejected)
      .addCase(transactionSummary.pending, handlePending)
      .addCase(transactionSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.summary = action.payload;
      })
      .addCase(transactionSummary.rejected, handleRejected);
  },
});


const transactionsReducer = transactions.reducer;
export default transactionsReducer;

