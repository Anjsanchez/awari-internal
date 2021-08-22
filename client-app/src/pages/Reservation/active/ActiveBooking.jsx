import React, { useState } from "react";
import FormHeader from "../../../common/form/FormHeader";
import { BsAspectRatioFill } from "react-icons/bs";
import ActiveBookingTable from "./ActiveBookingTable";

const ActiveBooking = () => {
  return (
    <div className="container__wrapper">
      <FormHeader
        header="Active Bookings"
        second="Reservation Management"
        third="Bookings"
        navigate="/"
        SecondIcon={BsAspectRatioFill}
        isVisibleBtn={false}
      />

      <ActiveBookingTable />
    </div>
  );
};

export default ActiveBooking;
