// import { createSelector, createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "reservationDetails",
  initialState: {
    rooms: [],
    payments: [],
    header: {},
    trans: [],
    totals: {
      netAmountTrans: 0,
      netAmountRooms: 0,
      netPayment: 0,
      netAmount: 0,
    },
  },

  reducers: {
    addRDetails: (resx, action) => {
      const { payments, header, rooms, trans } = action.payload;
      resx.payments = [...payments];
      resx.rooms = [...rooms];
      resx.header = header;
      resx.trans = trans;

      resx.totals.netPayment = resx.payments.reduce((a, b) => a + b.amount, 0);
      resx.totals.netAmountRooms = resx.rooms.reduce(
        (a, b) => a + b.totalAmount,
        0
      );
      resx.totals.netAmountTrans = trans.reduce(
        (a, b) => a + (b.product.sellingPrice * b.quantity - b.netDiscount),
        0
      );
      resx.totals.netAmount =
        resx.totals.netAmountRooms + resx.totals.netAmountTrans;
    },
    addRPayments: (resx, action) => {
      resx.payments = [...action.payload];

      resx.totals.netPayment = resx.payments.reduce((a, b) => a + b.amount, 0);
    },
    addRRooms: (resx, action) => {
      resx.rooms = [...resx.rooms, action.payload];
      resx.totals.netAmountRooms = resx.rooms.reduce(
        (a, b) => a + b.totalAmount,
        0
      );
      resx.totals.netAmount =
        resx.totals.netAmountRooms + resx.totals.netAmountTrans;
    },
    editRRooms: (resx, action) => {
      resx.rooms = action.payload;
      resx.totals.netAmountRooms = resx.rooms.reduce(
        (a, b) => a + b.totalAmount,
        0
      );
      resx.totals.netAmount =
        resx.totals.netAmountRooms + resx.totals.netAmountTrans;
    },
    toggleRemoveProduct: (r, a) => {
      r.trans = a.payload;
      console.log(a.payload);
      if (r.trans.length === 0) return;

      r.totals.netAmountTrans = r.trans.reduce(
        (a, b) => a + (b.product.sellingPrice * b.quantity - b.netDiscount),
        0
      );
      r.totals.netAmount = r.totals.netAmountRooms + r.totals.netAmountTrans;
    },
    toggleHeaderActiveStatus: (r, a) => {
      r.header.isActive = true;
    },
  },
});

export const {
  addRPayments,
  addRHeaders,
  addRDetails,
  toggleRemoveProduct,
  addRRooms,
  editRRooms,
  toggleHeaderActiveStatus,
} = slice.actions;
export default slice.reducer;
