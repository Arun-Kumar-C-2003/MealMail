import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
  name: "Recipe_Slice",
  initialState: {
    userRecipes: [],
    totalRecipes: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setRecipes: (state, action) => {
      state.userRecipes = action.payload;
      state.totalRecipes = action.payload.length;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default recipeSlice.reducer;
export const { setRecipes, setError, setLoading } = recipeSlice.actions;
