import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const cartSlice = createSlice({
  name: "Cart_Slice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
  },
});

export default cartSlice.reducer;
export const { addToCart } = cartSlice.actions;
