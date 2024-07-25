import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/Carts";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
