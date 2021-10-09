import React from "react";
import { Modal } from "antd";
import "../css/ReservationDetailsPaymentModal.css";
import ReservationDetailsRoomSteps from "./ReservationDetailsRoomSteps";

const ReservationDetailsRoomModal = ({
  onVisible,
  visible,
  onProceedWithModal,
  selectedRoom,
  onSuccessRequestApproval,
}) => {
  //..
  const handleProceedModal = (action) => {
    onVisible({ value: false, action: "cancel" });
    onProceedWithModal(action);
  };

  const onCancel = () => onVisible({ value: false, action: "cancel" });

  return (
    <div className="roomModal__container">
      <Modal
        title="Room Reservation"
        centered
        className="roomServationMdl__container"
        visible={visible.value}
        style={{
          top: "2%",
          minWidth: "340px",
        }}
        width="auto"
        onOk={onVisible}
        onCancel={() => onCancel()}
        footer={null}
      >
        <ReservationDetailsRoomSteps
          selectedRoom={selectedRoom}
          visible={visible}
          onCancelRoomDialog={() => onCancel()}
          onProceedModal={handleProceedModal}
          onSuccessRequestApproval={onSuccessRequestApproval}
        />
      </Modal>
    </div>
  );
};

export default ReservationDetailsRoomModal;
