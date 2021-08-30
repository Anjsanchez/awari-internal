// import { createSelector, createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "globalSettings",
  initialState: {
    isLoading: false,
  },
  reducers: {
    toggleLoadingGlobal: (resx, action) => {
      resx.isLoading = action.payload;
    },
    toggleLoadingForceStop: (resx, action) => {
      resx.isLoading = false;
    },
  },
});

export const getVisibleState = createSelector(
  (state) => state.entities.globalSettings,
  (isLoading) => isLoading
);

export const { toggleLoadingGlobal, toggleLoadingForceStop } = slice.actions;
export default slice.reducer;
