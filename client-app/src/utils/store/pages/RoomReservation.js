// import { createSelector, createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "createReservation",
  initialState: {
    header: {
      type: {
        name: "",
        key: "",
      },
      voucher: "",
      customer: {},
    },
    isLoading: false,
    isVisible: false,
  },
  reducers: {
    toggleVisible: (resx, action) => {
      resx.isVisible = action.payload;
    },
    toggleLoading: (resx, action) => {
      resx.isLoading = action.payload;
    },
    refreshValues: (resx, action) => {
      resx.header.type = {
        name: "",
        key: "",
      };
      resx.header.voucher = "";
      resx.header.customer = {};
      resx.isLoading = false;
      resx.isVisible = false;
    },
    headerTypeAdded: (resx, action) => {
      const { name, key, voucher } = action.payload;
      resx.header.type.name = name;
      resx.header.type.key = key;
      resx.header.voucher = voucher;
    },
    headerCustomerAdded: (resx, action) => {
      resx.header.customer = action.payload;
    },
  },
});

export const getVisibleState = createSelector(
  (state) => state.entities.createReservation,
  (isVisible) => isVisible
);

export const {
  toggleVisible,
  headerTypeAdded,
  refreshValues,
  headerCustomerAdded,
  toggleLoading,
} = slice.actions;
export default slice.reducer;

// date: {
//   fromDate: moment(),
//   toDate: moment(),
// },
// reservationDateAdded: (resx, action) => {
//   const { fromDate, toDate } = action.payload;
//   resx.header.date.fromDate = fromDate;
//   resx.header.date.toDate = toDate;
// },

// resx.header.date.fromDate = moment();
// resx.header.date.toDate = moment();
