import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  name: null,
  email: null,
  phone: null,
  gender: null,
  dob: null,
  role: null,
  avatar: null,
  addresses: [],
  orders: [],
};

const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUserInfo: (state, actions) => {
      state.username = actions.payload.username;
      state.email = actions.payload.email;
      state.role = actions.payload.role;
      state.name = actions.payload.name;
      state.phone = actions.payload.phone;
      state.gender = actions.payload.gender;
      state.dob = actions.payload.dob;
      state.avatar = actions.payload.avatar;
      state.addresses = actions.payload.addresses;
    },
    updateUserOrder: (state, actions) => {
      state.orders = actions.payload;
    },
    resetUserInfo: () => initialState,
  },
});

const { reducer, actions } = users;
export const userActions = actions;
export default reducer;
