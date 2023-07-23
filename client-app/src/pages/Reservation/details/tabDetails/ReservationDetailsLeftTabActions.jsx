import { Card } from "antd";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MDialog from "./../../../../common/MDialog";
import { Divider, Button } from "@material-ui/core";
import { store } from "../../../../utils/store/configureStore";
import ReservationApprovalRemark from "./../../../../common/ReservationApprovalRemark";
import ReservationDetailsLeftTabLateCheckOut from "./ReservationDetailsLeftTabLateCheckOut";
import {
  DeleteReservationHeader,
  PostCheckOutForfeitedPayment,
} from "./../../../../utils/services/pages/reservation/ReservationHeader";

const ReservationDetailsLeftTabActions = ({ typeInStore }) => {
  const hist = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [askConfirmation, setAskConfirmation] = useState(false);
  const [isVisibleLateCheckOut, setIsVisibleLateCheckOut] = useState(false);
  const [isVisibleForeightedPayment, setIsVisibleForeightedPayment] =
    useState(false);
  const [askConfirmationApproval, setAskConfirmationApproval] = useState({
    value: false,
    action: "DELETE",
  });

  useEffect(() => {
    if (typeInStore.header.approvalStatus === 1) setIsLoading(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = () => {
    const { user } = store.getState().entities.user;

    if (user.role.rolename !== "Administrator")
      return setAskConfirmationApproval({
        action: "DELETE",
        value: true,
      });

    return setAskConfirmation(true);
  };

  const handleDialogCancel = () => {
    setAskConfirmationApproval({
      action: "DELETE",
      value: false,
    });

    setAskConfirmation(false);
  };

  const onSuccessRequestApproval = () =>
    hist.replace("/a/reservation-management/reservations");

  const onDeleteHeaderAdmin = async () => {
    setAskConfirmation(false);
    setIsLoading(true);
    try {
      await DeleteReservationHeader(typeInStore.header._id);

      enqueueSnackbar("The reservation is successfully deleted!", {
        variant: "success",
      });

      setIsLoading(false);
      hist.replace("/a/reservation-management/reservations");
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar("0045: " + error, {
        variant: "error",
      });
    }
  };

  const renderButtonText = () => {
    if (typeInStore.header.approvalStatus === 1)
      return <span>PENDING APPROVAL</span>;

    return <span>DELETE BOOKING</span>;
  };

  const renderLateChecKout = () => {
    const { name } = typeInStore.header.reservationType;
    if (name === "Restaurant" || name === "Day Tour" || name === "Night Tour")
      return null;

    return (
      <ReservationDetailsLeftTabLateCheckOut
        visible={isVisibleLateCheckOut}
        onVisible={() => setIsVisibleLateCheckOut(false)}
        onCancel={() => setIsVisibleLateCheckOut(false)}
      />
    );
  };

  const renderBtnLateCheckOut = () => {
    const { name } = typeInStore.header.reservationType;
    if (name === "Restaurant" || name === "Day Tour" || name === "Night Tour")
      return null;
    return (
      <Button
        onClick={() => setIsVisibleLateCheckOut(true)}
        variant="contained"
        color="primary"
        disabled={isLoading}
      >
        <span>Early Check-In/Late check-out</span>
      </Button>
    );
  };

  const renderBtnForfeitedBookingWithPayment = () => {
    const { name } = typeInStore.header.reservationType;
    if (name === "Restaurant" || name === "Day Tour" || name === "Night Tour")
      return null;
    if (typeInStore.header.isActive) return null;

    return (
      <Button
        onClick={() => setIsVisibleForeightedPayment(true)}
        variant="contained"
        style={{ marginTop: 5 }}
        color="primary"
        disabled={isLoading}
      >
        <span>Forfeited Payment</span>
      </Button>
    );
  };

  const handleOkForfeitedPayment = async () => {
    setIsVisibleForeightedPayment(false);

    try {
      await PostCheckOutForfeitedPayment(typeInStore.header._id);

      enqueueSnackbar("Check out complete", {
        variant: "success",
      });

      hist.replace("/a/reservation-management/reservations");
    } catch (error) {
      if (error && error.status === 400)
        return enqueueSnackbar(error.data, {
          variant: "error",
        });

      enqueueSnackbar(
        "0066: An error occured while fetching the reservation type in the server.",
        {
          variant: "error",
        }
      );
    }
  };

  const renderConfirmation = () => {
    if (isVisibleForeightedPayment)
      return (
        <MDialog
          openDialog={isVisibleForeightedPayment}
          handleClose={() => setIsVisibleForeightedPayment(false)}
          handleOk={handleOkForfeitedPayment}
        />
      );
  };

  return (
    <>
      {renderConfirmation()}

      {askConfirmation && (
        <MDialog
          openDialog={askConfirmation}
          handleClose={() => setAskConfirmation(false)}
          handleOk={() => onDeleteHeaderAdmin()}
        />
      )}
      {renderLateChecKout()}

      <ReservationApprovalRemark
        approvalType="headers"
        visible={askConfirmationApproval}
        onSuccessRequestApproval={onSuccessRequestApproval}
        onCancel={handleDialogCancel}
        onCancelWholeDialog={handleDialogCancel}
        values={typeInStore}
      />

      <div className="reservationdetails-grid__wrapper first">
        <Card className="reservationDetails-card__wrapper" hoverable>
          <div className="reservationDetails-title__wrapper">
            <div className="reservationDetails-title-avatar__wrapper">
              <div className="reservationDetails-title-span__wrapper">
                <span className="reservationDetails-title__spanHeader">
                  Actions
                </span>
              </div>
            </div>
          </div>
          <Divider light />
          <div className="reservationDetails-body__wrapper">
            <div className="cd-button__container rdltCheckOut">
              {!typeInStore.isTrans && (
                <>
                  {renderBtnLateCheckOut()}
                  {renderBtnForfeitedBookingWithPayment()}
                  <Button
                    style={{ marginTop: 5 }}
                    onClick={() => handleDelete()}
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                  >
                    {renderButtonText()}
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ReservationDetailsLeftTabActions;
