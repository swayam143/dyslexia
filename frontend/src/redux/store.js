import { configureStore } from "@reduxjs/toolkit";
import childSlice from "./childSlice";

export const store = configureStore({
  reducer: {
    childData: childSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
