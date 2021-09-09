import { Card } from "antd";
import { useSelector } from "react-redux";
import "./css/ReservationDetailsLeftTab.css";
import React, { useState, useEffect } from "react";
import tempAvatar from "../../../../assets/tempAvatar.png";
import MailTwoToneIcon from "@material-ui/icons/MailTwoTone";
import ActiveButton from "./../../../../common/form/ActiveButton";
import BookmarkTwoToneIcon from "@material-ui/icons/BookmarkTwoTone";
import { Grid, Divider, Avatar, List, ListItem } from "@material-ui/core";
import PhoneAndroidTwoToneIcon from "@material-ui/icons/PhoneAndroidTwoTone";
import ConfirmationNumberTwoToneIcon from "@material-ui/icons/ConfirmationNumberTwoTone";

const ReservationDetailsLeftTab = () => {
  const [totalHeads, setTotalHeads] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0);
  const [totalTrans, setTotalTrans] = useState(0);

  const detailsInStore = useSelector(
    (state) => state.entities.reservationDetails
  );

  const { rooms, payments, transactions, header, trans } = detailsInStore;

  const { firstName, lastName, mobile, emailAddress } = header.customer;

  useEffect(() => {
    const heads = rooms.reduce(
      (a, b) => a + (b.adultPax + b.seniorPax + b.childrenPax),
      0
    );

    setTotalTrans(trans.length);
    setTotalRooms(rooms.length);
    setTotalHeads(heads);
  }, [rooms, trans]);

  return (
    <div className="reservationdetails-grid__wrapper first">
      <Card className="reservationDetails-card__wrapper" hoverable>
        <div className="reservationDetails-title__wrapper">
          <div className="reservationDetails-title-avatar__wrapper">
            <Avatar alt="Remy Sharp" src={tempAvatar} />
            <div className="reservationDetails-title-span__wrapper">
              <span className="reservationDetails-title__spanHeader">
                {firstName + " " + lastName}
              </span>
              <span className="reservationDetails-title__spanSubHeader">
                {mobile}
              </span>
            </div>
          </div>
          <div>
            <ActiveButton value={true} />
          </div>
        </div>

        <Divider light />
        <div className="reservationDetails-body__wrapper">
          <List component="nav" aria-label="mailbox folders">
            <ListItem button className="reservationDetails-body__span__wrapper">
              <BookmarkTwoToneIcon className="reservationDetails-body__span__icon" />
              <span className="reservationDetails-body__span__label">
                Reservation Type
              </span>
              <span className="reservationDetails-body__span__detail">
                {header.reservationType.name}
              </span>
            </ListItem>
            <Divider />
            <ListItem button className="reservationDetails-body__span__wrapper">
              <ConfirmationNumberTwoToneIcon className="reservationDetails-body__span__icon" />
              <span className="reservationDetails-body__span__label">
                Voucher
              </span>
              <span className="reservationDetails-body__span__detail">
                {header.reservationType.voucher}
              </span>
            </ListItem>
            <Divider />
            <ListItem button className="reservationDetails-body__span__wrapper">
              <MailTwoToneIcon className="reservationDetails-body__span__icon" />
              <span className="reservationDetails-body__span__label">
                Email
              </span>
              <span className="reservationDetails-body__span__detail">
                {emailAddress}
              </span>
            </ListItem>
            <Divider />
            <ListItem button className="reservationDetails-body__span__wrapper">
              <PhoneAndroidTwoToneIcon className="reservationDetails-body__span__icon" />
              <span className="reservationDetails-body__span__label">
                Phone
              </span>
              <span className="reservationDetails-body__span__detail">
                {mobile}
              </span>
            </ListItem>
          </List>
          <div className="reservationDetails-footer__wrapper">
            <Grid container>
              <Grid
                item
                xs={4}
                className="reservationDetails-footer-span__wrapper"
              >
                <span className="reservationDetails-footer__spanHeader">
                  {totalHeads}
                </span>
                <br />
                <span className="reservationDetails-footer__span__detail">
                  Heads
                </span>
              </Grid>
              <Grid
                item
                xs={4}
                className="reservationDetails-footer-span__wrapper"
              >
                <span className="reservationDetails-footer__spanHeader">
                  {totalRooms}
                </span>
                <br />
                <span className="reservationDetails-footer__span__detail">
                  Rooms
                </span>
              </Grid>
              <Grid
                item
                xs={4}
                className="reservationDetails-footer-span__wrapper"
              >
                <span className="reservationDetails-footer__spanHeader">
                  {totalTrans}
                </span>
                <br />
                <span className="reservationDetails-footer__span__detail">
                  Transactions
                </span>
              </Grid>
            </Grid>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReservationDetailsLeftTab;
