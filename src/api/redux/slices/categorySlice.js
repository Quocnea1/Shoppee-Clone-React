import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  currentCategory: null,
  currentSubCategoryList: [],
};

const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {
    updateSubcategory: (state, actions) => {
      state.currentSubCategoryList = actions.payload;
    },
    updateList: (state, actions) => {
      state.list = actions.payload.list;
    },
    resetSubList: (state) => {
      state.currentSubCategoryList = initialState.currentSubCategoryList
    }
  },
});

const { reducer, actions } = categories;
export const categoryActions = actions;
export default reducer;
