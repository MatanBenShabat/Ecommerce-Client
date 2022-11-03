import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import snackBarReducer from "./snackBarSlice";

export default configureStore({
  reducer: {
    login: loginReducer,
    snackBar: snackBarReducer
  }
});
