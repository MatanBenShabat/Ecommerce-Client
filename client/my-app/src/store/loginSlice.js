import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isAdmin: false,
    userName: "",
    isLogged: false,
    signUp: true,
  },
  reducers: {
    setIsAdmin: (state, payload) => {
      state.isAdmin = payload.payload;
      localStorage.setItem("isAdmin",payload.payload)
    },
    setUsername: (state, payload) => {
      state.userName = payload.payload;
      localStorage.setItem("userName",payload.payload)

    },
    setSignUp: (state, payload) => {
      state.signUp = payload.payload;
      
    },
    setIsLogged: (state, payload) => {
      state.isLogged = payload.payload;
      localStorage.setItem("isLogged",payload.payload)

    },
  },
});

export const { setIsAdmin, setUsername, setSignUp, setIsLogged } = loginSlice.actions;
export const isAdminSelector = (state) => state.login.isAdmin;
export const userNameSelector = (state) => state.login.userName;
export const signUpSelector = (state) => state.login.signUp;
export const isLoggedSelector = (state) => state.login.isLogged;


export default loginSlice.reducer;
