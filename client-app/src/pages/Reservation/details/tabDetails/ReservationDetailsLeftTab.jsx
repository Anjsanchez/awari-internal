import React from "react";
import { Card } from "antd";
import "./css/ReservationDetailsLeftTab.css";
import tempAvatar from "../../../../assets/tempAvatar.png";
import MailTwoToneIcon from "@material-ui/icons/MailTwoTone";
import ActiveButton from "./../../../../common/form/ActiveButton";
import BookmarkTwoToneIcon from "@material-ui/icons/BookmarkTwoTone";
import { Grid, Divider, Avatar, List, ListItem } from "@material-ui/core";
import PhoneAndroidTwoToneIcon from "@material-ui/icons/PhoneAndroidTwoTone";
import ConfirmationNumberTwoToneIcon from "@material-ui/icons/ConfirmationNumberTwoTone";

const ReservationDetailsLeftTab = () => {
  return (
    <div className="reservationdetails-grid__wrapper first">
      <Card className="reservationDetails-card__wrapper" hoverable>
        <div className="reservationDetails-title__wrapper">
          <div className="reservationDetails-title-avatar__wrapper">
            <Avatar alt="Remy Sharp" src={tempAvatar} />
            <div className="reservationDetails-title-span__wrapper">
              <span className="reservationDetails-title__spanHeader">
                Angelo Sanchez
              </span>
              <span className="reservationDetails-title__spanSubHeader">
                0978905482
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
                Walk-In
              </span>
            </ListItem>
            <Divider />
            <ListItem button className="reservationDetails-body__span__wrapper">
              <ConfirmationNumberTwoToneIcon className="reservationDetails-body__span__icon" />
              <span className="reservationDetails-body__span__label">
                Voucher
              </span>
              <span className="reservationDetails-body__span__detail">
                VH22113
              </span>
            </ListItem>
            <Divider />
            <ListItem button className="reservationDetails-body__span__wrapper">
              <MailTwoToneIcon className="reservationDetails-body__span__icon" />
              <span className="reservationDetails-body__span__label">
                Email
              </span>
              <span className="reservationDetails-body__span__detail">
                anjlosanchez@gmail.com
              </span>
            </ListItem>
            <Divider />
            <ListItem button className="reservationDetails-body__span__wrapper">
              <PhoneAndroidTwoToneIcon className="reservationDetails-body__span__icon" />
              <span className="reservationDetails-body__span__label">
                Phone
              </span>
              <span className="reservationDetails-body__span__detail">
                09054292526
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
                <span className="reservationDetails-footer__spanHeader">2</span>
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
                <span className="reservationDetails-footer__spanHeader">5</span>
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
                  55
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
