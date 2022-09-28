import { configureStore } from "@reduxjs/toolkit";
import logAdminReducer from "../src/Redux/logAdminReducer";

export default configureStore({
  reducer: {
    admin: logAdminReducer,
  }
});
