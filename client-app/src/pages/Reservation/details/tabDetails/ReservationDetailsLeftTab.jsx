import { Card } from "antd";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import "./css/ReservationDetailsLeftTab.css";
import { useHistory } from "react-router-dom";
import MDialog from "./../../../../common/MDialog";
import React, { useState, useEffect } from "react";
import tempAvatar from "../../../../assets/tempAvatar.png";
import MailTwoToneIcon from "@material-ui/icons/MailTwoTone";
import { store } from "../../../../utils/store/configureStore";
import CasinoTwoToneIcon from "@material-ui/icons/CasinoTwoTone";
import ActiveButton from "./../../../../common/form/ActiveButton";
import BookmarkTwoToneIcon from "@material-ui/icons/BookmarkTwoTone";
import PhoneAndroidTwoToneIcon from "@material-ui/icons/PhoneAndroidTwoTone";
import ConfirmationNumberTwoToneIcon from "@material-ui/icons/ConfirmationNumberTwoTone";
import { saveHeader } from "../../../../utils/services/pages/reservation/ReservationHeader";
import { toggleHeaderActiveStatus } from "../../../../utils/store/pages/reservationDetails";
import { PostCheckOutReservation } from "./../../../../utils/services/pages/reservation/ReservationHeader";
import {
  Grid,
  Divider,
  Avatar,
  List,
  ListItem,
  Button,
} from "@material-ui/core";

const ReservationDetailsLeftTab = () => {
  const hist = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [totalHeads, setTotalHeads] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0);
  const [totalTrans, setTotalTrans] = useState(0);
  const [askConfirmation, setAskConfirmation] = useState(false);
  const [askCheckOutConfirmation, setAskCheckOutConfirmation] = useState(false);

  const detailsInStore = useSelector(
    (state) => state.entities.reservationDetails
  );

  const { rooms, header, trans, totals, isTrans } = detailsInStore;

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

  const soa = () =>
    hist.push(`/a/reports/SOA/${header._id}&istrans=${isTrans}`);

  const handleClose = () => {
    setAskConfirmation(false);
    setAskCheckOutConfirmation(false);
  };
  const handleCheckInCheckOut = () => {
    if (!header.isActive) return setAskConfirmation(true);

    const { netAmount, netPayment } = totals;
    if (netAmount !== netPayment) {
      return enqueueSnackbar("Please settle the exact amount", {
        variant: "error",
      });
    }

    setAskCheckOutConfirmation(true);
  };

  const handleCheckOut = async () => {
    setAskCheckOutConfirmation(false);

    try {
      await PostCheckOutReservation(header._id);

      enqueueSnackbar("Check out complete", {
        variant: "success",
      });

      hist.replace("/a/reservation-management/reservations");
    } catch (error) {
      enqueueSnackbar(
        "0003: An error occured while fetching the reservation type in the server.",
        {
          variant: "error",
        }
      );
    }
  };

  const handleOk = async () => {
    if (askCheckOutConfirmation) return handleCheckOut();

    setAskConfirmation(false);

    const obj = { _id: header._id, isActive: true };
    try {
      await saveHeader(obj);
      store.dispatch(toggleHeaderActiveStatus());
      enqueueSnackbar("Successfully Checked In", { variant: "success" });
    } catch (ex) {
      if (ex) enqueueSnackbar(ex.data, { variant: "error" });
    }
  };

  const renderStatus = () => {
    if (isTrans) return <ActiveButton value={true} textTrue="Completed" />;
    if (header.isActive) return <ActiveButton value={true} textTrue="In" />;

    return <ActiveButton isWarning={true} textTrue="Pending" />;
  };

  const renderConfirmation = () => {
    if (askConfirmation || askCheckOutConfirmation)
      return (
        <MDialog
          openDialog={askConfirmation || askCheckOutConfirmation}
          handleClose={handleClose}
          handleOk={handleOk}
        />
      );
  };

  const renderButton = () => {
    if (isTrans) {
      return (
        <div className="cd-button__container rdlt">
          <Button onClick={soa} variant="contained" color="primary">
            PRINT SOA
          </Button>
        </div>
      );
    }
    return (
      <>
        {header.isActive && (
          <div className="cd-button__container rdlt">
            <Button onClick={soa} variant="contained" color="primary">
              PRINT SOA
            </Button>
          </div>
        )}
        <div className="cd-button__container rdlt">
          <Button
            color="primary"
            variant="contained"
            onClick={handleCheckInCheckOut}
          >
            {header.isActive ? "CHECK-OUT" : "CHECK-IN"}
          </Button>
        </div>
      </>
    );
  };
  return (
    <>
      {renderConfirmation()}

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
            <div>{renderStatus()}</div>
          </div>

          <Divider light />
          <div className="reservationDetails-body__wrapper">
            <List component="nav" aria-label="mailbox folders">
              <ListItem
                button
                className="reservationDetails-body__span__wrapper"
              >
                <BookmarkTwoToneIcon className="reservationDetails-body__span__icon" />
                <span className="reservationDetails-body__span__label">
                  Reservation
                </span>
                <span className="reservationDetails-body__span__detail">
                  {header.reservationType.name}
                </span>
              </ListItem>
              <Divider />

              {header.reservationType.name === "OTA/Travel Agency" && (
                <>
                  <ListItem
                    button
                    className="reservationDetails-body__span__wrapper"
                  >
                    <CasinoTwoToneIcon className="reservationDetails-body__span__icon" />
                    <span className="reservationDetails-body__span__label">
                      Agency
                    </span>
                    <span className="reservationDetails-body__span__detail">
                      {header.agency}
                    </span>
                  </ListItem>
                  <Divider />
                </>
              )}

              {header.reservationType.name !== "Restaurant" &&
                header.reservationType.name !== "Day Tour" && (
                  <>
                    <ListItem
                      button
                      className="reservationDetails-body__span__wrapper"
                    >
                      <ConfirmationNumberTwoToneIcon className="reservationDetails-body__span__icon" />
                      <span className="reservationDetails-body__span__label">
                        Voucher
                      </span>
                      <span className="reservationDetails-body__span__detail">
                        {header.reservationType.voucher}
                      </span>
                    </ListItem>
                    <Divider />
                  </>
                )}
              <ListItem
                button
                className="reservationDetails-body__span__wrapper"
              >
                <MailTwoToneIcon className="reservationDetails-body__span__icon" />
                <span className="reservationDetails-body__span__label">
                  Email
                </span>
                <span className="reservationDetails-body__span__detail">
                  {emailAddress}
                </span>
              </ListItem>
              <Divider />
              <ListItem
                button
                className="reservationDetails-body__span__wrapper"
              >
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
                    Trans
                  </span>
                </Grid>
              </Grid>
            </div>
            <div className="rdlt-btn__wrapper rdlt">
              {renderButton()}
              {/* {header.isActive && (
                <div className="cd-button__container rdlt">
                  <Button onClick={soa} variant="contained" color="primary">
                    PRINT SOA
                  </Button>
                </div>
              )}
              <div className="cd-button__container rdlt">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleCheckInCheckOut}
                >
                  {header.isActive ? "CHECK-OUT" : "CHECK-IN"}
                </Button>
              </div> */}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ReservationDetailsLeftTab;
