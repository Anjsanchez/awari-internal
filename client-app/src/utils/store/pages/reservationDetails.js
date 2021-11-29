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
    isTrans: false,
  },
  reducers: {
    addRDetails: (resx, action) => {
      const { payments, header, rooms, trans, isTrans } = action.payload;
      resx.payments = [...payments];
      resx.rooms = [...rooms];
      resx.header = header;
      resx.trans = trans;

      resx.isTrans = isTrans;
      resx.totals.netPayment = resx.payments.reduce((a, b) => a + b.amount, 0);

      resx.totals.netAmountRooms = resx.rooms.reduce(
        (a, b) => a + b.totalAmount,
        0
      );
      resx.totals.netAmountTrans = trans.reduce(
        (a, b) => a + (b.product.sellingPrice * b.quantity - b.netDiscount),
        0
      );

      const getTotalCheckOutPercentage = rooms.reduce((a, b) => {
        if (b.lateCheckOutPenalty === 0) return a;
        return a + b.roomPricing.sellingPrice * (b.lateCheckOutPenalty / 100);
      }, 0);

      resx.totals.netAmount =
        resx.totals.netAmountRooms +
        resx.totals.netAmountTrans +
        getTotalCheckOutPercentage;
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
      if (r.trans.length === 0) return;

      r.totals.netAmountTrans = r.trans.reduce(
        (a, b) => a + (b.product.sellingPrice * b.quantity - b.netDiscount),
        0
      );
      r.totals.netAmount = r.totals.netAmountRooms + r.totals.netAmountTrans;
    },
    toggleModifyProduct: (r, a) => {
      const { discountId, netDiscount, seniorPax, transId } = a.payload;

      const trans = [...r.trans];
      const i = trans.findIndex((x) => x._id === transId);

      trans[i] = { ...trans[i] };
      trans[i].discountId = discountId;
      trans[i].seniorPax = seniorPax;
      trans[i].netDiscount = netDiscount;

      r.trans = trans;

      if (r.trans.length === 0) return;

      r.totals.netAmountTrans = r.trans.reduce(
        (a, b) => a + (b.product.sellingPrice * b.quantity - b.netDiscount),
        0
      );
      r.totals.netAmount = r.totals.netAmountRooms + r.totals.netAmountTrans;
    },
    toggleModifyApprovalStatusTrans: (r, a) => {
      const { transId } = a.payload;
      const trans = [...r.trans];
      const i = trans.findIndex((x) => x._id === transId);
      trans[i] = { ...trans[i] };
      trans[i].approvalStatus = 1;
      r.trans = trans;
    },
    toggleModifyLateCheckOutPenalty: (r, a) => {
      const { transId, lateCheckOutPenalty } = a.payload;
      const rooms = [...r.rooms];

      const i = rooms.findIndex((x) => x._id === transId);

      rooms[i] = { ...rooms[i] };
      rooms[i].lateCheckOutPenalty = lateCheckOutPenalty;
      r.rooms = rooms;

      r.totals.netAmountRooms = r.rooms.reduce((a, b) => a + b.totalAmount, 0);
      r.totals.netAmountTrans = r.trans.reduce(
        (a, b) => a + (b.product.sellingPrice * b.quantity - b.netDiscount),
        0
      );

      const getTotalCheckOutPercentage = rooms.reduce((a, b) => {
        if (b.lateCheckOutPenalty === 0) return a;
        if (b.roomPricing === null) return a;
        return a + b.roomPricing.sellingPrice * (b.lateCheckOutPenalty / 100);
      }, 0);

      r.totals.netAmount =
        r.totals.netAmountRooms +
        r.totals.netAmountTrans +
        getTotalCheckOutPercentage;
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
  toggleModifyProduct,
  toggleModifyApprovalStatusTrans,
  toggleModifyLateCheckOutPenalty,
} = slice.actions;
export default slice.reducer;
