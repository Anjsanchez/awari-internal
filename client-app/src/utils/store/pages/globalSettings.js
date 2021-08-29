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
  },
});

export const getVisibleState = createSelector(
  (state) => state.entities.globalSettings,
  (isVisible) => isVisible
);

export const { toggleLoadingGlobal } = slice.actions;
export default slice.reducer;
