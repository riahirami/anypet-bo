import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, CategoryData } from "../../core/models/category.model";
import { RootState } from "../store";

const initialState = {
  categories: [] as Category[],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategories: (
      state,
      action: PayloadAction<{ category: CategoryData }>
    ) => {
      state.categories = action.payload.category.data;
    },
  },
});
export const selectCategory = (state: RootState) => state.category.categories;
export const { getCategories } = categorySlice.actions;
export default categorySlice.reducer
