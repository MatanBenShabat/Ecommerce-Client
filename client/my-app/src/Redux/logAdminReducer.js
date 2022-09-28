import { createSlice } from "@reduxjs/toolkit";

export const logAdminReducer = createSlice({
  name: "admin",
  initialState: {
    logAdminValue: false,
    logCustomerValue: false,
    showLogin: true,
  },
  reducers: {
    adminLoginFront: (state, payload) => {
      state.logAdminValue = payload.payload;
    },
    adminLoginBack: (state, payload) => {
      state.logAdminValue = payload.payload;
    },
    adminLogoutFront: (state, payload) => {
      state.logAdminValue = payload.payload;
    },
    adminLogoutBack: (state, payload) => {
      state.logAdminValue = payload.payload;
    },
    customerLoginFront: (state, payload) => {
      state.logCustomerValue = payload.payload;
    },
    customerLoginBack: (state, payload) => {
      state.logCustomerValue = payload.payload;
    },
    customerLogoutFront: (state, payload) => {
      state.logCustomerValue = payload.payload;
    },
    customerLogoutBack: (state, payload) => {
      state.logCustomerValue = payload.payload;
    },
    showLogin: (state, payload) => {
      state.showLogin = payload.payload;
    },
  },
});

export const {
  adminLoginFront,
  adminLoginBack,
  adminLogoutFront,
  adminLogoutBack,
  customerLoginFront,
  customerLoginBack,
  customerLogoutFront,
  customerLogoutBack,
  showLogin,
} = logAdminReducer.actions;
export const selectAdminLogStatus = (state) => state.admin.logAdminValue;
export const selectCustomerLogStatus = (state) => state.admin.logCustomerValue;
export const selectShowLogin = (state) => state.admin.showLogin;

export default logAdminReducer.reducer;
