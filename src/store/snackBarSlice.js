import { createSlice } from "@reduxjs/toolkit";

export const snackBarSlice = createSlice({
  name: "snackBar",
  initialState: {
    openSnackBar: false,
  },
  reducers: {
    setOpenSnackBar: (state,payload) => {
      state.openSnackBar = payload.payload;
    },
  },
});

export const { setOpenSnackBar } = snackBarSlice.actions;
export const snackBarSelector = (state) => state.snackBar.openSnackBar;
export default snackBarSlice.reducer;
