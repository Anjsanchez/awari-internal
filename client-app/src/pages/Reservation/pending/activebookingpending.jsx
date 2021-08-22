import React from "react";
import { BsAspectRatioFill } from "react-icons/bs";
import FormHeader from "../../../common/form/FormHeader";
import { Grid } from "@material-ui/core";
import "./css/ActiveBookings.css";
const Activebookingpending = () => {
  return (
    <>
      <FormHeader
        header="Active Bookings"
        second="Reservation Management"
        third="Bookings"
        navigate="/"
        SecondIcon={BsAspectRatioFill}
        isVisibleBtn={false}
      />

      <Grid
        container
        spacing={2}
        className="activeBooking-grid-container__wrapper"
      >
        <Grid item xs={12} sm={9}>
          <Grid container>
            <ActiveBookingBody />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3}>
          hello
        </Grid>
      </Grid>
    </>
  );
};

export default Activebookingpending;
