import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth/slice";
import transactionsReducer from "./transactions/slice";
import { currencyReducer } from "./currency/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const currencyPersistConfig = {
  key: "currency",
  storage,
  whitelist: ["rates", "lastUpdate"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  transactions: transactionsReducer,
  currency: persistReducer(currencyPersistConfig, currencyReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
