// import { createSelector, createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "reservationDetails",
  initialState: {
    rooms: [],
    payments: [],
    transactions: [],
    header: {},
  },

  reducers: {
    addRDetails: (resx, action) => {
      const { payments, header, rooms } = action.payload;
      resx.payments = [...payments];
      resx.rooms = [...rooms];
      resx.header = header;
    },
    addRPayments: (resx, action) => {
      console.log(action.payload);
    },

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
