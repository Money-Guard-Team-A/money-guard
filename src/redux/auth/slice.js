import { createSlice } from "@reduxjs/toolkit";
import { login, refresh, register, signout } from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.isRefreshing = false;
  state.error = action.payload || action.error.message;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { username: null, email: null },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.userData;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, handleRejected)

      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action) => {
        const { username, email } = action.payload.user;
        state.user = { username, email };
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, handleRejected)

      .addCase(signout.pending, handlePending)
      .addCase(signout.fulfilled, (state) => {
        state.user = { username: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(signout.rejected, handleRejected)

      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refresh.rejected, handleRejected);
  },
});

export default authSlice.reducer;
