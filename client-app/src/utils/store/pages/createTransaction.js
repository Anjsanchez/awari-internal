// import { createSelector, createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "createTransaction",
  initialState: {
    isOpenDrawer: false,
    customer: {},
    products: [],
    productCategory: [],
  },
  reducers: {
    toggleOpenDrawer: (resx, action) => {
      resx.isOpenDrawer = action.payload;

      if (action.payload === true) return;
      resx.customer = {};
      resx.products = [];
      resx.productCategory = [];
    },
    toggleCustomeAdded: (resx, action) => {
      resx.customer = action.payload;
    },
    toggleProductsAdded: (resx, action) => {
      const cat = action.payload.productCategories;
      const prod = action.payload.products;

      const sortedCat = cat.sort((a, b) => a.name.localeCompare(b.name));
      const sortedProd = prod.sort((a, b) =>
        a.longName.localeCompare(b.longName)
      );

      resx.productCategory = [{ _id: 0, name: "All" }, ...sortedCat];
      resx.products = sortedProd;
    },
  },
});

export const getVisibleState = createSelector(
  (state) => state.entities.createTransaction,
  (isLoading) => isLoading
);

// export const { toggleOpenDrawer, toggleCustomeAdded, toggleProductsAdded } =
//   slice.actions;
export default slice.reducer;
