import React from "react";
import { Modal } from "antd";
import "../css/ReservationDetailsPaymentModal.css";
import MDialog from "../../../../../common/MDialog";
import { makeStyles } from "@material-ui/core/styles";
import UseDetailsRoomForm from "./validation/UseDetailsRoomForm";
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
    onSuccessDelete,
  } = props;

  const { askConfirmation, onDecideOfAction, handleDialogCancel } =
    UseDetailsRoomForm(
      RDetailsRoomFormValidate,
      headerId,
      onVisible,
      onSuccessEdit,
      onSuccessAdd,
      onSuccessDelete
    );
  return (
    <div className="roomModal__container">
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
        className="roomServationMdl__container"
        visible={visible.value}
        style={{
          top: "2%",
        }}
        width="auto"
        onOk={onVisible}
        onCancel={() => onVisible({ value: false, action: "cancel" })}
        footer={null}
      >
        <ReservationDetailsRoomSteps />
      </Modal>
    </div>
  );
};

export default ReservationDetailsRoomModal;
