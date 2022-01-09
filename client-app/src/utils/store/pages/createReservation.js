// import { createSelector, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
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
      agency: "",
      customer: {},
    },
    rooms: {
      id: "",
      createdDate: "",
      approvalStatus: 0,
      roomPricing: {},
      lateCheckOutPenalty: 0,
      user: {},
      date: {
        fromDate: moment(),
        toDate: moment(),
      },
      heads: {
        adult: 0,
        children: 0,
        senior: 0,
      },
      selectedStartDate: {
        room: {},
        date: "",
      },
      selectedEndDate: {
        room: {},
        date: "",
      },
      discount: {},
      addOns: {
        mattress: 0,
        remarks: "",
      },
      amountPrice: {
        netDiscount: 0,
        netAmount: 0,
        grossAmount: 0,
        paymentId: null,
      },
    },
    isLoading: false,
    isVisible: false,
  },
  reducers: {
    headerRoomAllAdded: (resx, action) => {
      const {
        _id,
        startDate,
        adultPax,
        childrenPax,
        discount,
        endDate,
        grossAmount,
        mattress,
        remark,
        room,
        seniorPax,
        totalAmount,
        totalDiscount,
        user,
        lateCheckOutPenalty,
        roomPricing,
        createdDate,
      } = action.payload;

      resx.rooms.approvalStatus = action.payload.approvalStatus;

      const xDiscount =
        discount === null ? { _id: 0, name: "Not Applicable" } : discount;

      resx.rooms.lateCheckOutPenalty = lateCheckOutPenalty;
      resx.rooms.roomPricing = roomPricing;

      resx.rooms.user = user;
      resx.rooms.createdDate = createdDate;
      resx.rooms.id = _id;
      resx.rooms.date = {
        fromDate: moment(startDate),
        toDate: moment(endDate),
      };
      resx.rooms.heads = {
        adult: adultPax,
        children: childrenPax,
        senior: seniorPax,
      };
      resx.rooms.selectedStartDate = {
        room: room,
        date: moment(startDate).format("MM-DD-YYYY"),
      };
      resx.rooms.selectedEndDate = {
        room: room,
        date: moment(endDate).format("MM-DD-YYYY"),
      };
      resx.rooms.discount = xDiscount;
      resx.rooms.addOns = {
        mattress: mattress,
        remarks: remark,
      };
      resx.rooms.amountPrice = {
        netDiscount: totalDiscount,
        netAmount: totalAmount,
        grossAmount: grossAmount,
      };
    },
    headerIdRemoved: (resx, action) => {
      resx.rooms.id = "";
    },
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
      const { name, key, voucher, agency } = action.payload;
      resx.header.type.name = name;
      resx.header.type.key = key;
      resx.header.voucher = voucher;
      resx.header.agency = agency;
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
    roomLinesSelectedStartDateAdded: (resx, action) => {
      resx.rooms.selectedStartDate = action.payload;
    },
    roomLinesSelectedEndDateAdded: (resx, action) => {
      resx.rooms.selectedEndDate = action.payload;
    },
    roomLinesSelectedDiscountAdded: (resx, action) => {
      resx.rooms.discount = action.payload;
    },
    roomLinesSelectedReset: (resx, action) => {
      resx.rooms.selectedStartDate = {
        room: {},
        date: "",
      };
      resx.rooms.selectedEndDate = {
        room: {},
        date: "",
      };
    },
    roomLinesSelectedAddOnsMattress: (resx, action) => {
      resx.rooms.addOns.mattress = action.payload;
    },
    roomLinesSelectedAddOnsRemark: (resx, action) => {
      resx.rooms.addOns.remarks = action.payload;
    },
    roomLinesSelectedAmountAdded: (resx, action) => {
      const { grossAmount, netAmount, netDiscount, paymentId } = action.payload;
      resx.rooms.amountPrice.grossAmount = grossAmount;
      resx.rooms.amountPrice.netAmount = netAmount;
      resx.rooms.amountPrice.netDiscount = netDiscount;
      resx.rooms.amountPrice.paymentId = paymentId;
    },
    roomLinesResetValue: (re, action) => {
      re.rooms.id = "";
      re.rooms.roomPricing = {};
      re.rooms.lateCheckOutPenalty = 0;
      re.rooms.date = { fromDate: moment(), toDate: moment() };
      re.rooms.heads = { adult: 0, children: 0, senior: 0 };
      re.rooms.selectedStartDate = { room: {}, date: "" };
      re.rooms.selectedEndDate = { room: {}, date: "" };
      re.rooms.discount = {};
      re.rooms.addOns = { mattress: 0, remarks: "" };
      re.rooms.amountPrice = { netAmount: 0, netDiscount: 0, grossAmount: 0 };
      re.rooms.approvalStatus = 0;
    },
    // roomLineLateCheckOut: (re, action) => {

    //   const { transId, lateCheckOutPenalty } = a.payload;
    //   const rooms = [...r.rooms];

    //   const i = rooms.findIndex((x) => x._id === transId);

    //   rooms[i] = { ...rooms[i] };
    //   rooms[i].lateCheckOutPenalty = lateCheckOutPenalty;

    // },
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
  roomLinesSelectedStartDateAdded,
  roomLinesSelectedEndDateAdded,
  roomLinesSelectedReset,
  roomLinesSelectedDiscountAdded,
  roomLinesSelectedAddOnsMattress,
  roomLinesSelectedAddOnsRemark,
  roomLinesSelectedAmountAdded,
  roomLinesResetValue,
  headerRoomAllAdded,
  headerIdRemoved,
} = slice.actions;
export default slice.reducer;
