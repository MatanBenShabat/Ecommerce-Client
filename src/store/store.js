import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import snackBarReducer from "./snackBarSlice";
import brandReducer from "./brandSlice";
import sortReducer from "./sortSlice";

export default configureStore({
  reducer: {
    login: loginReducer,
    snackBar: snackBarReducer,
    brand: brandReducer,
    sort: sortReducer,
  }
});
