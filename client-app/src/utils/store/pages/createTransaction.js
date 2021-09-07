// import { createSelector, createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "createTransaction",
  initialState: {
    products: [],
  },
  reducers: {
    toggleProductsAdded: (resx, action) => {
      const prodFromPayload = { ...action.payload };

      const prodx = [...resx.products];
      const i = prodx.findIndex((x) => x._id === prodFromPayload._id);

      if (i === -1) {
        resx.products = [
          ...prodx,
          {
            ...prodFromPayload,
            quantity: 1,
            netDiscount: 0,
            seniorPax: 0,
            discount: { _id: 0, name: "Not Applicable" },
            netAmount: 0,
          },
        ];
        return;
      }

      prodx[i].quantity += 1;
      resx.products = prodx;
    },
    toggleAdjustQuantity: (resx, action) => {
      const { act, prod } = action.payload;

      const prodx = [...resx.products];
      const i = prodx.findIndex((x) => x._id === prod._id);

      if (i === -1) return;

      const currentQty = prodx[i].quantity;

      if (act === "dec") {
        if (currentQty <= 1) return;
        prodx[i].quantity -= 1;
        return;
      }
      prodx[i].quantity += 1;
    },
    toggleAddCartDiscount: (resx, action) => {
      const { discount, seniorPax, netDiscount, product } = action.payload;

      const prodx = [...resx.products];
      const i = prodx.findIndex((x) => x._id === product._id);

      if (i === -1) return;

      prodx[i].discount = discount;
      prodx[i].seniorPax = seniorPax;
      prodx[i].netDiscount = netDiscount;

      resx.products = prodx;
    },
    toggleRemoveItemInCart: (resx, action) => {
      const prodFromPayload = { ...action.payload };

      const newProd = resx.products.filter(
        (n) => n._id !== prodFromPayload._id
      );
      resx.products = newProd;
    },
  },
});

export const getVisibleState = createSelector(
  (state) => state.entities.createTransaction,
  (isLoading) => isLoading
);

export const {
  toggleProductsAdded,
  toggleAdjustQuantity,
  toggleRemoveItemInCart,
  toggleAddCartDiscount,
} = slice.actions;
export default slice.reducer;
