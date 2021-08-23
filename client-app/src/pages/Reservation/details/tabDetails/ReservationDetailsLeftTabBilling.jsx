import React from "react";
import { Card } from "antd";
import "./css/ReservationDetailsLeftTab.css";
import { Divider, List, ListItem } from "@material-ui/core";
import ActiveButton from "./../../../../common/form/ActiveButton";

const ReservationDetailsLeftTabBilling = () => {
  return (
    <div className="reservationdetails-grid__wrapper first">
      <Card className="reservationDetails-card__wrapper" hoverable>
        <div className="reservationDetails-title__wrapper">
          <div className="reservationDetails-title-avatar__wrapper">
            <div className="reservationDetails-title-span__wrapper">
              <span className="reservationDetails-title__spanHeader">
                Billing
              </span>
            </div>
          </div>
          <div>
            <ActiveButton value={false} textFalse="Incomplete Payment" />
          </div>
        </div>

        <Divider light />
        <div className="reservationDetails-body__wrapper">
          <List component="nav" aria-label="mailbox folders">
            <ListItem button className="reservationDetails-body__span__wrapper">
              <span className="reservationDetails-body__span__label">
                Total Amount
              </span>
              <span className="reservationDetails-body__span__detail">
                202,150 PHP
              </span>
            </ListItem>
            <Divider />
            <ListItem button className="reservationDetails-body__span__wrapper">
              <span className="reservationDetails-body__span__label">
                Amount Paid
              </span>
              <span className="reservationDetails-body__span__detail">
                50,401 PHP
              </span>
            </ListItem>
            <Divider />
            <ListItem button className="reservationDetails-body__span__wrapper">
              <span className="reservationDetails-body__span__label">
                Amount Remaining
              </span>
              <span className="reservationDetails-body__span__detail">
                821,321 PHP
              </span>
            </ListItem>
          </List>
        </div>
      </Card>
    </div>
  );
};
export default ReservationDetailsLeftTabBilling;
