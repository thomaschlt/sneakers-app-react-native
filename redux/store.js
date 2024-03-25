import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";

// Creation of the Redux store
export const store = configureStore({
  reducer: {
    userAuth: authSlice,
  },
});
