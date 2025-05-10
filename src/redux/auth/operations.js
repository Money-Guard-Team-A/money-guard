import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/sign-up",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/auth/sign-up", userData);
      if (response.data.token) {
        setAuthHeader(response.data.token);
        toast.success("Kayıt başarılı!");
      } else {
        toast.error("Kayıt başarılı ancak token alınamadı.");
        return thunkAPI.rejectWithValue("Token bulunamadı");
      }
      return response.data;
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error("Bu e-posta zaten kayıtlı.");
      } else {
        toast.error("Kayıt başarısız. Lütfen tekrar deneyin.");
      }
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/sign-in",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/auth/sign-in", userData);
      setAuthHeader(response.data.token);
      toast.success("Giriş başarılı!");
      return response.data;
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("E-posta veya şifre hatalı.");
      } else {
        toast.error("Giriş başarısız. Lütfen tekrar deneyin.");
      }
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const signout = createAsyncThunk(
  "auth/sign-out",
  async (_, thunkAPI) => {
    try {
      await axios.delete("/auth/sign-out");
      clearAuthHeader();
      toast.success("Çıkış yapıldı.");
    } catch (err) {
      toast.error("Çıkış yapılamadı.");
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const refresh = createAsyncThunk("auth/current", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;
  if (!token) {
    return thunkAPI.rejectWithValue("Token bulunamadı!");
  }
  setAuthHeader(token);
  try {
    const response = await axios.get("/users/current");
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});
