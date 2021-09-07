// import { createSelector, createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "createTransaction",
  initialState: {
    products: [],
    customer: {},
    room: {},
    sendToKitchen: true,
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
            remark: "",
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
      const { discount, seniorPax, remark, netDiscount, product } =
        action.payload;

      const prodx = [...resx.products];
      const i = prodx.findIndex((x) => x._id === product._id);

      if (i === -1) return;

      prodx[i].discount = discount;
      prodx[i].seniorPax = seniorPax;
      prodx[i].netDiscount = netDiscount;
      prodx[i].remark = remark;

      resx.products = prodx;
    },
    toggleRemoveItemInCart: (resx, action) => {
      const prodFromPayload = { ...action.payload };

      const newProd = resx.products.filter(
        (n) => n._id !== prodFromPayload._id
      );
      resx.products = newProd;
    },
    toggleCustomerAdded: (r, a) => {
      r.customer = a.payload;
    },
    toggleRoomAdded: (r, a) => {
      r.room = a.payload;
    },
    toggleSendKitchen: (r, a) => {
      r.sendToKitchen = a.payload;
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
  toggleCustomerAdded,
  toggleRoomAdded,
  toggleSendKitchen,
} = slice.actions;
export default slice.reducer;
