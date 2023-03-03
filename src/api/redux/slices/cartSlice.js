import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  checkoutList: [],
  currentAddress: {
    address: "",
    ward: "",
    district: "",
    city: "",
    phone: "",
    name: "",
  },
};

const carts = createSlice({
  name: "carts",
  initialState,
  reducers: {
    updateCartList: (state, action) => {
      state.list = action.payload;
    },
    updateCartQuantity: (state, action) => {
      for (const item of state.list) {
        if (item.productId === action.payload.productId) {
          item.quantity = action.payload.quantity;
          item.totalPrice = item.price * action.payload.quantity
          break;
        }
      }
    },
    buyNow: (state, action) => {
      state.checkoutList = action.payload;
    },
    updateCheckoutList: (state, action) => {
      state.checkoutList = action.payload;
    },
    updateCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
    resetCart: () => initialState,
  },
});

const { reducer, actions } = carts;
export const cartActions = actions;
export default reducer;
