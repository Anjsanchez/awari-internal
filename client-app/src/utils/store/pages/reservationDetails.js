// import { createSelector, createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "reservationDetails",
  initialState: {
    rooms: [],
    payments: [],
    transactions: [],
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
    addRPayments: (resx, action) => {},

    addRHeaders: (resx, action) => {
      resx.payments = [...action.payload];
    },
    addRRooms: (resx, action) => {
      resx.rooms = [...resx.rooms, action.payload];
    },
    editRRooms: (resx, action) => {
      resx.rooms = action.payload;
    },
  },
});

export const { addRPayments, addRHeaders, addRDetails, addRRooms, editRRooms } =
  slice.actions;
export default slice.reducer;
