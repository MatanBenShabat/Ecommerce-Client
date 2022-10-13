import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    userType: false,
    userName: "",
    isLogged: false,
    signUp: true,
    token: ""
  },
  reducers: {
    setUserType: (state, payload) => {
      state.userType = payload.payload;
      localStorage.setItem("userType",payload.payload)
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
    // setToken: (state, payload) => {
    //   state.isLogged = payload.payload;
    //   localStorage.setItem("token",payload.payload)

    // },
  },
});

export const { setToken,setUserType, setUsername, setSignUp, setIsLogged } = loginSlice.actions;
export const userTypeSelector = (state) => state.login.userType;
export const userNameSelector = (state) => state.login.userName;
export const signUpSelector = (state) => state.login.signUp;
export const isLoggedSelector = (state) => state.login.isLogged;
export const tokenSelector = (state) => state.login.token;


export default loginSlice.reducer;
