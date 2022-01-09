import React from "react";
import { Card } from "antd";
import { useSelector } from "react-redux";
import "./css/ReservationDetailsLeftTab.css";
import { Divider, List, ListItem } from "@material-ui/core";
import ActiveButton from "./../../../../common/form/ActiveButton";

const ReservationDetailsLeftTabBilling = () => {
  const detailsInStore = useSelector(
    (state) => state.entities.reservationDetails
  );

  const { netPayment, netAmount } = detailsInStore.totals;

  const formatNumber = (num) =>
    Intl.NumberFormat().format(Number(num).toFixed(2));

  const renderAmountRemaining = () => {
    if (formatNumber(netAmount) === formatNumber(netPayment))
      return <ActiveButton value={true} textTrue="0.00 PHP" />;

    if (netAmount <= netPayment)
      return (
        <ActiveButton
          isWarning={true}
          textTrue={netAmount - netPayment + "PHP"}
        />
      );

    return <ActiveButton textFalse={netAmount - netPayment + "PHP"} />;
  };
  const renderPaymentStatus = () => {
    if (!detailsInStore.header.isActive) return;

    const netAmt = formatNumber(netAmount);
    const netPay = formatNumber(netPayment);

    if (netAmt === netPay)
      return <ActiveButton value={true} textTrue="Complete" />;

    if (netAmt <= netPay)
      return <ActiveButton isWarning={true} textTrue="Over" />;

    return <ActiveButton textFalse="Incomplete" />;
  };

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
          <div>{renderPaymentStatus()}</div>
        </div>

        <Divider light />
        <div className="reservationDetails-body__wrapper">
          <List component="nav" aria-label="mailbox folders">
            <ListItem button className="reservationDetails-body__span__wrapper">
              <span className="reservationDetails-body__span__label">Net</span>
              <span className="reservationDetails-body__span__detail">
                {formatNumber(netAmount)} PHP
              </span>
            </ListItem>
            <Divider />
            <ListItem button className="reservationDetails-body__span__wrapper">
              <span className="reservationDetails-body__span__label">Paid</span>
              <span className="reservationDetails-body__span__detail">
                {formatNumber(netPayment)} PHP
              </span>
            </ListItem>
            <Divider />
            <ListItem button className="reservationDetails-body__span__wrapper">
              <span className="reservationDetails-body__span__label">
                Remaining
              </span>
              <span className="reservationDetails-body__span__detail">
                {renderAmountRemaining()}
              </span>
            </ListItem>
          </List>
        </div>
      </Card>
    </div>
  );
};
export default ReservationDetailsLeftTabBilling;
