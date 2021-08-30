import { Card, Tooltip } from "antd";
import React, { useState } from "react";
import "../css/ReservationDetailsRightTabPayment.css";
import { Divider, IconButton } from "@material-ui/core";
import BorderColorTwoToneIcon from "@material-ui/icons/BorderColorTwoTone";
import EditLocationTwoToneIcon from "@material-ui/icons/EditLocationTwoTone";
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
            <Tooltip placement="topLeft" title="Modify" arrowPointAtCenter>
              <IconButton
                aria-label="Modify"
                size="small"
                onClick={() =>
                  handleVisibleModal({ value: true, action: "update" })
                }
              >
                <EditLocationTwoToneIcon />
              </IconButton>
            </Tooltip>

            <Tooltip placement="topLeft" title="Create" arrowPointAtCenter>
              <IconButton
                aria-label="create"
                size="small"
                onClick={() =>
                  handleVisibleModal({ value: true, action: "add" })
                }
              >
                <BorderColorTwoToneIcon />
              </IconButton>
            </Tooltip>
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
