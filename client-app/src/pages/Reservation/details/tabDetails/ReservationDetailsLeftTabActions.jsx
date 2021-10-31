import { Card } from "antd";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MDialog from "./../../../../common/MDialog";
import { Divider, Button } from "@material-ui/core";
import { store } from "../../../../utils/store/configureStore";
import ReservationApprovalRemark from "./../../../../common/ReservationApprovalRemark";
import { DeleteReservationHeader } from "./../../../../utils/services/pages/reservation/ReservationHeader";

const ReservationDetailsLeftTabActions = ({ typeInStore }) => {
  const hist = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [askConfirmation, setAskConfirmation] = useState(false);
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

  const onSuccessRequestApproval = () => {
    hist.replace("/a/reservation-management/reservations");
  };

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
    if (typeInStore.header.approvalStatus === 1) {
      return <span>PENDING APPROVAL</span>;
    }

    return <span>DELETE BOOKING</span>;
  };

  return (
    <>
      {askConfirmation && (
        <MDialog
          openDialog={askConfirmation}
          handleClose={() => setAskConfirmation(false)}
          handleOk={() => onDeleteHeaderAdmin()}
        />
      )}

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
              <Button
                onClick={() => handleDelete()}
                variant="contained"
                color="primary"
                disabled={isLoading}
              >
                {renderButtonText()}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ReservationDetailsLeftTabActions;
