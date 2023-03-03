import { createSlice } from "@reduxjs/toolkit";

const admin = createSlice({
  name: "admin",
  initialState: {
    totalRevenue: 0,
    totalVisit: 0,
    totalSale: 0,
    totalMade: 0,
    orderComplete: 0,
    topProducts: [],
    categories: [],
    subCategories: [],
    allProducts: [],
    allCustomers: [],
    allOrders: {
      orderEntityDetail: [],
      maxPage: 0,
      orderEntityPage: [],
    },
    revenueOfYear: [],
    allShop: [],
  },
  reducers: {
    updateTopProducts: (state, action) => {
      state.topProducts = action.payload;
    },
    updateCategory: (state, action) => {
      state.categories = action.payload;
    },
    updateSubCategory: (state, action) => {
      state.subCategories = action.payload;
    },
    updateCustomer: (state, action) => {
      state.allCustomers = action.payload;
    },
    updateProduct: (state, action) => {
      state.allProducts = action.payload;
    },
    updateOrder: (state, action) => {
      state.allOrders = action.payload;
    },
    updateRevenueOfYear: (state, action) => {
      state.revenueOfYear = action.payload;
    },
    updateTotalRevenue: (state, action) => {
      state.totalRevenue = action.payload;
    },
    updateShop: (state, action) => {
      state.allShop = action.payload;
    }
  },
});

const { reducer, actions } = admin;
export const adminActions = actions;
export default reducer;
