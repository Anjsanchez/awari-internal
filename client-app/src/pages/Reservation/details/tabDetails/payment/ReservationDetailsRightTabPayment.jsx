import { Card } from "antd";
import React, { useState } from "react";
import "../css/ReservationDetailsRightTabPayment.css";
import { Divider, IconButton } from "@material-ui/core";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import BorderColorTwoToneIcon from "@material-ui/icons/BorderColorTwoTone";
import ReservationDetailsPaymentTable from "./ReservationDetailsPaymentTable";

const ReservationDetailsRightTabPayment = () => {
  const [visible, setVisible] = useState({ value: false, action: "add" });

  const handleVisibleModal = ({ value, action }) =>
    setVisible({ value, action });

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
            <IconButton
              aria-label="Modify"
              size="small"
              onClick={() =>
                handleVisibleModal({ value: true, action: "update" })
              }
            >
              <VisibilityTwoToneIcon />
            </IconButton>
            <IconButton
              aria-label="create"
              size="small"
              onClick={() => handleVisibleModal({ value: true, action: "add" })}
            >
              <BorderColorTwoToneIcon />
            </IconButton>
          </div>
        </div>

        <Divider light />
        <div className="reservationDetails-body__wrapper">
          <ReservationDetailsPaymentTable
            onVisible={handleVisibleModal}
            visible={visible}
          />
        </div>
      </Card>
    </div>
  );
};

export default ReservationDetailsRightTabPayment;
