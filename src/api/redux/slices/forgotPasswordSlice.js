import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  otp: "",
  newPassword: "",
};

const forgotPassword = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    updateOTP: (state, actions) => {
      state.otp = actions.payload.otp;
    },
    updateEmail: (state, actions) => {
      state.email = actions.payload.email;
    },
    updateNewPassword: (state, actions) => {
      state.newPassword = actions.payload.newPassword;
    },
  },
});

const { reducer, actions } = forgotPassword;
export const forgotPasswordActions = actions;
export default reducer;
