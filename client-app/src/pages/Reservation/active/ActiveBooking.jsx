import React from "react";
import { BsAspectRatioFill } from "react-icons/bs";
import ActiveBookingTable from "./ActiveBookingTable";
import FormHeader from "../../../common/form/FormHeader";

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
