import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  childData: JSON.parse(sessionStorage.getItem("childData")) || null,
  familyMember: [],
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
    updateProfile: (state, action) => {
      state.childData = action.payload;
      sessionStorage.setItem("childData", JSON.stringify(action.payload));
    },
    GetFamilyMember: (state, action) => {
      state.familyMember = action.payload;
    },
  },
});

export const { savedChildData, logoutChild, updateProfile, GetFamilyMember } =
  childSlice.actions;

export default childSlice.reducer;
