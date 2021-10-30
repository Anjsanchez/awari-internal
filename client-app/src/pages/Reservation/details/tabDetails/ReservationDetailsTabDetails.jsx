import React from "react";
import { Grid } from "@material-ui/core";
import "./css/ReservationDetailsTabDetails.css";
import { store } from "../../../../utils/store/configureStore";
import ReservationDetailsLeftTab from "./ReservationDetailsLeftTab";
import ReservationDetailsLeftTabBilling from "./ReservationDetailsLeftTabBilling";
import ReservationDetailsRightTabRoom from "./room/ReservationDetailsRightTabRoom";
import ReservationDetailsRightTabHeads from "./walk-in/ReservationDetailsRightTabHeads";
import ReservationDetailsRightTabPayment from "./payment/ReservationDetailsRightTabPayment";
import ReservationDetailsRightTabTransaction from "./transaction/ReservationDetailsRightTabTransaction";
import ReservationDetailsLeftTabActions from "./ReservationDetailsLeftTabActions";

const ReservationDetailsTabDetails = () => {
  let isWalkIn = false;

  const typeInStore = store.getState().entities.reservationDetails;

  const type = typeInStore.header.reservationType.name.toLowerCase();

  if (type === "day tour" || type === "restaurant") isWalkIn = true;

  const renderRoomTab = () => {
    if (isWalkIn)
      return (
        <>
          <ReservationDetailsRightTabHeads />
          <ReservationDetailsRightTabPayment isTrans={typeInStore.isTrans} />
        </>
      );

    return (
      <>
        <ReservationDetailsRightTabRoom isTrans={typeInStore.isTrans} />
        <ReservationDetailsRightTabPayment isTrans={typeInStore.isTrans} />
      </>
    );
  };

  return (
    <div className="reservationdetails__container">
      <Grid container>
        <Grid item xs={12} md={12} lg={4}>
          <ReservationDetailsLeftTab />
          <ReservationDetailsLeftTabBilling />
          <ReservationDetailsLeftTabActions typeInStore={typeInStore} />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          {renderRoomTab()}
          <ReservationDetailsRightTabTransaction
            header={typeInStore.header._id}
            isTrans={typeInStore.isTrans}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ReservationDetailsTabDetails;
