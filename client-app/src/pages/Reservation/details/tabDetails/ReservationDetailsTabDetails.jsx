import React from "react";
import { Grid } from "@material-ui/core";
import "./css/ReservationDetailsTabDetails.css";
import { store } from "../../../../utils/store/configureStore";
import ReservationDetailsLeftTab from "./ReservationDetailsLeftTab";
import ReservationDetailsLeftTabBilling from "./ReservationDetailsLeftTabBilling";
import ReservationDetailsRightTabRoom from "./room/ReservationDetailsRightTabRoom";
import ReservationDetailsRightTabPayment from "./payment/ReservationDetailsRightTabPayment";
import ReservationDetailsRightTabTransaction from "./transaction/ReservationDetailsRightTabTransaction";

const ReservationDetailsTabDetails = () => {
  let isWalkIn = false;

  const typeInStore = store.getState().entities.reservationDetails.header;

  const type = typeInStore.reservationType.name.toLowerCase();

  if (type === "day tour") isWalkIn = true;

  return (
    <div className="reservationdetails__container">
      <Grid container>
        <Grid item xs={12} md={4}>
          <ReservationDetailsLeftTab />
          <ReservationDetailsLeftTabBilling />
        </Grid>
        <Grid item xs={12} md={8}>
          <ReservationDetailsRightTabPayment />
          {!isWalkIn && <ReservationDetailsRightTabRoom />}
          <ReservationDetailsRightTabTransaction header={typeInStore._id} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ReservationDetailsTabDetails;
