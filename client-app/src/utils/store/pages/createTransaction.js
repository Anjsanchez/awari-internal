// import { createSelector, createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "createTransaction",
  initialState: {
    isOpenDrawer: false,
    customer: {},
  },
  reducers: {
    toggleOpenDrawer: (resx, action) => {
      resx.isOpenDrawer = action.payload;
    },
    toggleCustomeAdded: (resx, action) => {
      resx.customer = action.payload;
    },
  },
});

export const getVisibleState = createSelector(
  (state) => state.entities.createTransaction,
  (isLoading) => isLoading
);

export const { toggleOpenDrawer, toggleCustomeAdded } = slice.actions;
export default slice.reducer;
