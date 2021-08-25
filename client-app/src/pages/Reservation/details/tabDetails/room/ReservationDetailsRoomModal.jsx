import React from "react";
import { Modal } from "antd";
import { ButtonGroup } from "@material-ui/core";
import "../css/ReservationDetailsPaymentModal.css";
import MDialog from "../../../../../common/MDialog";
import { makeStyles } from "@material-ui/core/styles";
import UseDetailsRoomForm from "./validation/UseDetailsRoomForm";
import MaterialButton from "./../../../../../common/MaterialButton";
import ReservationDetailsRoomSteps from "./ReservationDetailsRoomSteps";
import RDetailsRoomFormValidate from "./validation/RDetailsRoomFormValidate";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    fontSize: "14px",
  },
  actionsContainer: {},
  resetContainer: {},
  button__wrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
  labelSpan: {
    fontWeight: 400,
    fontSize: "15px",
    fontFamily: `"Poppins", sans-serif`,
  },
}));

const ReservationDetailsRoomModal = (props) => {
  const classes = useStyles();
  const {
    onVisible,
    visible,
    headerId,
    onSuccessEdit,
    onSuccessAdd,
    selectedPayment,
    onSuccessDelete,
  } = props;

  const {
    askConfirmation,
    handleChange,
    values,
    handleChangeInput,
    handleSubmit,
    errors,
    isRequestOnGoing,
    handleDelete,
    handleValueOnLoad,
    onDecideOfAction,
    handleResetValue,
    handleDialogCancel,
  } = UseDetailsRoomForm(
    RDetailsRoomFormValidate,
    headerId,
    onVisible,
    onSuccessEdit,
    onSuccessAdd,
    onSuccessDelete
  );

  // useEffect(() => {
  //   if (visible.action === "add") return handleResetValue();
  //   if (selectedPayment.length === 0) return;
  //   if (visible.action === "update") return handleValueOnLoad(selectedPayment);
  // }, [visible.action]); // eslint-disable-line react-hooks/exhaustive-deps

  const Footer = () => {
    const isAdd = visible.action === "add" ? true : false;
    const btnTextValue = isAdd ? "Create" : "Modify";

    if (visible.action !== "add") if (selectedPayment.length === 0) return null;

    return (
      <div>
        <ButtonGroup
          className={classes.button}
          variant="text"
          color="primary"
          aria-label="text primary button group"
        >
          {!isAdd && !isRequestOnGoing && (
            <MaterialButton
              onClick={handleDelete}
              className={classes.button}
              size="small"
              color="secondary"
              text="DELETE"
            />
          )}
          <MaterialButton
            size="small"
            className={classes.button}
            onClick={handleSubmit}
            disabled={isRequestOnGoing}
            text={btnTextValue}
          />
        </ButtonGroup>
      </div>
    );
  };

  return (
    <>
      {askConfirmation && (
        <MDialog
          openDialog={askConfirmation}
          handleClose={handleDialogCancel}
          handleOk={onDecideOfAction}
        />
      )}
      <Modal
        title="Room Reservation"
        centered
        visible={visible.value}
        onOk={onVisible}
        onCancel={() => onVisible({ value: false, action: "cancel" })}
        footer={<Footer />}
      >
        <ReservationDetailsRoomSteps />
      </Modal>
    </>
  );
};

export default ReservationDetailsRoomModal;
