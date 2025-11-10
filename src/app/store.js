import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./slices/cartslice";
import RecipeReducer from "./slices/recipeslice";
const store = configureStore({
  devTools: true,
  reducer: {
    cart: CartReducer,
    recipes: RecipeReducer,
  },
});

export default store;
