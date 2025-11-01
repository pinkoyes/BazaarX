import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";

const store = configureStore({
  reducer: {
    categories: categoryReducer, // register our slice
  },
});

export default store;
