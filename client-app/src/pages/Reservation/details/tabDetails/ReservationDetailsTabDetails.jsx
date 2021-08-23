import React from "react";
import { Grid } from "@material-ui/core";
import "./css/ReservationDetailsTabDetails.css";
import ReservationDetailsLeftTab from "./ReservationDetailsLeftTab";
import ReservationDetailsLeftTabBilling from "./ReservationDetailsLeftTabBilling";
import ReservationDetailsRightTabPayment from "./payment/ReservationDetailsRightTabPayment";

const ReservationDetailsTabDetails = () => {
  return (
    <div className="reservationdetails__container">
      <Grid container>
        <Grid item xs={12} md={4}>
          <ReservationDetailsLeftTab />
          <ReservationDetailsLeftTabBilling />
        </Grid>
        <Grid item xs={12} md={8}>
          <ReservationDetailsRightTabPayment />
        </Grid>
      </Grid>
    </div>
  );
};

export default ReservationDetailsTabDetails;
