import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  childData: JSON.parse(sessionStorage.getItem("childData")) || null,
};

export const childSlice = createSlice({
  name: "childData",
  initialState,
  reducers: {
    savedChildData: (state, action) => {
      state.childData = action.payload;
      sessionStorage.setItem("childData", JSON.stringify(action.payload));
    },
    logoutChild: (state) => {
      state.childData = null;
      sessionStorage.removeItem("childData");
    },
  },
});

export const { savedChildData, logoutChild } = childSlice.actions;

export default childSlice.reducer;
