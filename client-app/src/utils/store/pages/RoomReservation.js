// import { createSelector, createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import moment from "moment";

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
    rooms: {
      date: {
        fromDate: moment(),
        toDate: moment(),
      },
      heads: {
        adult: 0,
        children: 0,
        senior: 0,
      },
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
    roomLinesHeadsAdded: (resx, action) => {
      resx.rooms.heads = action.payload;
    },
    roomLinesDateAdded: (resx, action) => {
      const { fromDate, toDate } = action.payload;
      resx.rooms.date.fromDate = fromDate;
      resx.rooms.date.toDate = toDate;
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
  roomLinesHeadsAdded,
  roomLinesDateAdded,
} = slice.actions;
export default slice.reducer;
