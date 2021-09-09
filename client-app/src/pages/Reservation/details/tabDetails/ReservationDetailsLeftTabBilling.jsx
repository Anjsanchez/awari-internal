import { Card } from "antd";
import { useSelector } from "react-redux";
import "./css/ReservationDetailsLeftTab.css";
import React, { useState, useEffect } from "react";
import { Divider, List, ListItem } from "@material-ui/core";
import ActiveButton from "./../../../../common/form/ActiveButton";

const ReservationDetailsLeftTabBilling = () => {
  const [netAmount, setNetAmount] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);

  const detailsInStore = useSelector(
    (state) => state.entities.reservationDetails
  );

  const { rooms, payments, trans, header } = detailsInStore;

  useEffect(() => {
    const netAmountOfRooms = rooms.reduce((a, b) => a + b.totalAmount, 0);
    const netAmountOfTransactions = trans.reduce(
      (a, b) => a + (b.product.sellingPrice * b.quantity - b.netDiscount),
      0
    );

    setNetAmount(netAmountOfRooms + netAmountOfTransactions);
  }, [rooms, trans]);

  useEffect(() => {
    const totalPayment = payments.reduce((a, b) => a + b.amount, 0);
    setAmountPaid(totalPayment);
  }, [payments]);

  const formatNumber = (num) =>
    Intl.NumberFormat().format(Number(num).toFixed(2));

  const renderAmountRemaining = () => {
    if (netAmount === amountPaid)
      return <ActiveButton value={true} textTrue="0.00 PHP" />;

    if (netAmount <= amountPaid)
      return (
        <ActiveButton
          isWarning={true}
          textTrue={formatNumber(netAmount - amountPaid) + "PHP"}
        />
      );

    return (
      <ActiveButton textFalse={formatNumber(netAmount - amountPaid) + "PHP"} />
    );
  };
  const renderPaymentStatus = () => {
    if (!header.isActive) return;

    if (netAmount === amountPaid)
      return <ActiveButton value={true} textTrue="Payment Complete" />;

    if (netAmount <= amountPaid)
      return <ActiveButton isWarning={true} textTrue="Over Payment" />;

    return <ActiveButton textFalse="Incomplete Payment" />;
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
              <span className="reservationDetails-body__span__label">
                Net Amount
              </span>
              <span className="reservationDetails-body__span__detail">
                {formatNumber(netAmount)} PHP
              </span>
            </ListItem>
            <Divider />
            <ListItem button className="reservationDetails-body__span__wrapper">
              <span className="reservationDetails-body__span__label">
                Amount Paid
              </span>
              <span className="reservationDetails-body__span__detail">
                {formatNumber(amountPaid)} PHP
              </span>
            </ListItem>
            <Divider />
            <ListItem button className="reservationDetails-body__span__wrapper">
              <span className="reservationDetails-body__span__label">
                Amount Remaining
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
