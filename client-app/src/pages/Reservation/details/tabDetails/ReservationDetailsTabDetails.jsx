import React from "react";
import { Grid } from "@material-ui/core";
import "./css/ReservationDetailsTabDetails.css";
import ReservationDetailsLeftTab from "./ReservationDetailsLeftTab";
import ReservationDetailsLeftTabBilling from "./ReservationDetailsLeftTabBilling";
// import ReservationDetailsRightTabRoom from "./rooms/ReservationDetailsRightTabRoom";
import ReservationDetailsRightTabPayment from "./payment/ReservationDetailsRightTabPayment";
// import ReservationDetailsRightTabTransaction from "./transaction/ReservationDetailsRightTabTransaction";

const ReservationDetailsTabDetails = (props) => {
  return (
    <div className="reservationdetails__container">
      <Grid container>
        <Grid item xs={12} md={4}>
          <ReservationDetailsLeftTab />
          <ReservationDetailsLeftTabBilling />
        </Grid>
        <Grid item xs={12} md={8}>
          <ReservationDetailsRightTabPayment headerId={props.headerId} />
          {/* <ReservationDetailsRightTabRoom />
          <ReservationDetailsRightTabTransaction /> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default ReservationDetailsTabDetails;
