import { configureStore } from "@reduxjs/toolkit";
import DataReducer from "./slice";
// import { showApi } from "../utils/api";
import data from "./slice";

export const store = configureStore({
  reducer: {
    // [showApi.reducerPath]: showApi.reducer,
    data,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(showApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
