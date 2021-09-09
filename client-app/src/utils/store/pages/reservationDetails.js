// import { createSelector, createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "reservationDetails",
  initialState: {
    rooms: [],
    payments: [],
    header: {},
    trans: [],
  },

  reducers: {
    addRDetails: (resx, action) => {
      const { payments, header, rooms, trans } = action.payload;
      resx.payments = [...payments];
      resx.rooms = [...rooms];
      resx.header = header;
      resx.trans = trans;
    },
    addRPayments: (resx, action) => {
      resx.payments = [...action.payload];
    },
    addRRooms: (resx, action) => {
      resx.rooms = [...resx.rooms, action.payload];
    },
    editRRooms: (resx, action) => {
      resx.rooms = action.payload;
    },
    toggleRemoveProduct: (r, a) => {
      r.trans = a.payload;
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
