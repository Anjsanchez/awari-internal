import React from "react";
import { useParams } from "react-router-dom";
import { BsAspectRatioFill } from "react-icons/bs";
import FormHeader from "./../../../common/form/FormHeader";
import ReservationDetailsTabs from "./ReservationDetailsTabs";

const ReservationDetails = () => {
  const { id: reservationId } = useParams();

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

      <ReservationDetailsTabs headerId={reservationId} />
    </div>
  );
};

export default ReservationDetails;
