import React from "react";
import FormHeader from "./../../../common/form/FormHeader";
import { BsAspectRatioFill } from "react-icons/bs";

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
      hello!
    </div>
  );
};

export default ReservationDetails;
