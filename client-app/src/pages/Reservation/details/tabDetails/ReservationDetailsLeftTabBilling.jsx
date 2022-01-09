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
    const fNetAmt = Number.parseFloat(netAmount).toFixed(2);
    const fNetPayment = Number.parseFloat(netPayment).toFixed(2);

    if (fNetAmt === fNetPayment)
      return <ActiveButton value={true} textTrue="0.00 PHP" />;

    if (fNetAmt <= fNetPayment)
      return (
        <ActiveButton
          isWarning={true}
          textTrue={(fNetAmt - fNetPayment).toFixed(2) + "PHP"}
        />
      );

    return (
      <ActiveButton textFalse={(fNetAmt - fNetPayment).toFixed(2) + "PHP"} />
    );
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

  const renderLateCheckOut = () => {
    const getTotalCheckOutPercentage = detailsInStore.rooms.reduce((a, b) => {
      if (b.lateCheckOutPenalty === 0) return a;
      if (b.roomPricing === null) return a;
      return a + b.roomPricing.sellingPrice * (b.lateCheckOutPenalty / 100);
    }, 0);

    return getTotalCheckOutPercentage;
  };

  const renderLateCheckOutList = () => {
    if (renderLateCheckOut() === 0) return null;

    return (
      <>
        <ListItem button className="reservationDetails-body__span__wrapper">
          <span className="reservationDetails-body__span__label">
            Late Check-out
          </span>
          <span className="reservationDetails-body__span__detail">
            {formatNumber(renderLateCheckOut())} PHP
          </span>
        </ListItem>
        <Divider />
      </>
    );
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
            {renderLateCheckOutList()}
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
