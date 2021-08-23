import React from "react";
import { Card } from "antd";
import "../css/ReservationDetailsRightTabPayment.css";
import { Divider, IconButton } from "@material-ui/core";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import ReservationDetailsPaymentTable from "./ReservationDetailsPaymentTable";

const ReservationDetailsRightTabPayment = () => {
  return (
    <div className="reservationdetails-grid__wrapper">
      <Card className="reservationDetails-card__wrapper" hoverable>
        <div className="reservationDetails-title__wrapper">
          <div className="reservationDetails-title-avatar__wrapper">
            <div className="reservationDetails-title-span__wrapper">
              <span className="reservationDetails-title__spanHeader">
                Payments
              </span>
            </div>
          </div>
          <div>
            <IconButton aria-label="delete" size="small">
              <BorderColorIcon />
            </IconButton>
          </div>
        </div>

        <Divider light />
        <div className="reservationDetails-body__wrapper">
          <ReservationDetailsPaymentTable />
        </div>
      </Card>
    </div>
  );
};

export default ReservationDetailsRightTabPayment;
