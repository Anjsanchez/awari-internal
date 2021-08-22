import React from "react";
import "./css/ActiveBookings.css";
import { Card, Divider } from "antd";
import { ButtonGroup, Grid } from "@material-ui/core";
import ActiveBookingMenu from "./body/ActiveBookingMenu";
import ActiveButton from "../../../common/form/ActiveButton";
import ActiveBookingMenuRooms from "./body/ActiveBookingMenuRooms";

import MaterialButton from "../../../common/MaterialButton";

const useStyles = makeStyles({
  root: {},
  half: {},
  btn: {},
});

const ActiveBookingBody = () => {
  return (
    <>
      <div className="activeBooking-container__wrapper">
        <Card hoverable className="activeBooking-card__wrapper">
          <div style={{ position: "absolute", right: "-2px", top: "-3px" }}>
            <ActiveBookingMenu />
          </div>

          <div className="activeBooking_customer__wrapper">
            <span className="activeBooking_span_title">Angelo Sanchez</span>
            <span className="activeBooking_span_subTitle title">Guest</span>
          </div>

          <Grid container>
            <Grid item xs={12}>
              <div className="activeBooking-subheader__container">
                <div className="activeBooking-subheader__wrapper">
                  <span className="activeBooking_span_subTitle">
                    Room Total
                  </span>
                  <span className="activeBooking_span_child title">
                    2 rooms
                  </span>
                </div>
                <div className="activeBooking-subheader__wrapper">
                  <ActiveButton value={true} />
                </div>
              </div>
            </Grid>
          </Grid>

          <Divider>Walk-In</Divider>

          <div className="activeBooking-rooms__container">
            <ActiveBookingMenuRooms />
          </div>
          <div className="activeBooking-rooms__container">
            <ActiveBookingMenuRooms />
          </div>

          <ButtonGroup
            variant="text"
            color="primary"
            aria-label="text primary button group"
            className="activeBooking-buttonGroup"
          >
            <MaterialButton
              text="Cancel"
              color="secondary"
              className="activeBooking-button"
            />
            <MaterialButton
              text="Edit"
              color="primary"
              className="activeBooking-button"
            />
          </ButtonGroup>
        </Card>
      </div>
    </>
  );
};

export default ActiveBookingBody;
