import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isAdmin: false,
    userName: "",
    isRegistered: false,
  },
  reducers: {
    setIsAdmin: (state, payload) => {
      state.isAdmin = payload.payload;
    },
    setUsername: (state, payload) => {
      state.userName = payload.payload;
    },
    setIsRegistered: (state, payload) => {
      state.isRegistered = payload.payload;
    },
  },
});

export const { setIsAdmin, setUsername, setIsRegistered } = loginSlice.actions;
export const isAdminSelector = (state) => state.login.isAdmin;
export const userNameSelector = (state) => state.login.userName;
export const isRegisteredSelector = (state) => state.login.isRegistered;


export default loginSlice.reducer;
