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
      console.log(action.payload);
      resx.payments = [...action.payload];
    },
  },
});

export const { addRPayments, addRHeaders, addRDetails } = slice.actions;
export default slice.reducer;
