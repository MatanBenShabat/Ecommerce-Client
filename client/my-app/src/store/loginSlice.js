import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    signUp: true,
  },
  reducers: {
    setSignUp: (state, payload) => {
      state.signUp = payload.payload;
    },
  },
});

export const { setSignUp } = loginSlice.actions;
export const signUpSelector = (state) => state.login.signUp;
export default loginSlice.reducer;
