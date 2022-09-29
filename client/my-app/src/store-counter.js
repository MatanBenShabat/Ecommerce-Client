import { configureStore } from "@reduxjs/toolkit";
import { logRefresherReducer } from "./Redux/logRefresherReducer";

export default configureStore({
  reducer: {
    counter: logRefresherReducer,
  }
});
