import React from "react";
import { BsAspectRatioFill } from "react-icons/bs";
import FormHeader from "./../../../common/form/FormHeader";
import ReservationDetailsTabs from "./ReservationDetailsTabs";

const ReservationDetails = () => {
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

      <ReservationDetailsTabs />
    </div>
  );
};

export default ReservationDetails;
