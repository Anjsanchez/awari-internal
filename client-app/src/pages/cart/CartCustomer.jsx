import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Switch, Button } from "antd";
import MDialog from "./../../common/MDialog";
import { store } from "../../utils/store/configureStore";
import ReservationCustomer from "./../Reservation/create/ReservationCustomer";
import { toggleSendKitchen } from "../../utils/store/pages/createTransaction";
import SelectTransactionLinesRooms from "./../../common/select/SelectTransactionLinesRooms";

const dialog = {
  title: "Confirmation",
  subTitle: "Are you sure you want to save this record?",
};

const CartCustomer = ({ showModal, handleCancelModal, handleConfirmOrder }) => {
  //..
  const [loading, isLoading] = useState(false);
  const [askConfirm, setAskConfirm] = useState(false);

  const createTransaction = useSelector(
    (state) => state.entities.createTransaction
  );

  const hasCustomer = Object.keys(createTransaction.customer).length !== 0;
  const hasRooms = Object.keys(createTransaction.room).length !== 0;

  const onSwitchChange = (n) => store.dispatch(toggleSendKitchen(n));

  const handleOkDialog = () => {
    setAskConfirm(false);
    // handleConfirmOrder();
  };

  return (
    <>
      <MDialog
        openDialog={askConfirm}
        handleClose={() => setAskConfirm(false)}
        handleOk={handleOkDialog}
        dialogText={dialog}
      />

      <Modal
        className="cd-modal__wrapper"
        title="Order Checkout"
        visible={showModal}
        onOk={handleCancelModal}
        onCancel={handleCancelModal}
        footer={null}
      >
        <div className="cd-mattress__autoComplete">
          <ReservationCustomer action="inventoryTransaction" />
        </div>

        {hasCustomer && (
          <div className="cd-mattress__autoComplete">
            <SelectTransactionLinesRooms
              activeRoom={createTransaction.room}
              customer={createTransaction.customer}
            />
          </div>
        )}

        <div className="cd-mattress__switch">
          <div className="header-label__wrapper">
            <label htmlFor="cc-switch__sendKitchen">SEND TO KITCHEN</label>
          </div>
          <Switch
            id="cc-switch__sendKitchen"
            defaultChecked
            onChange={onSwitchChange}
          />
        </div>

        {hasCustomer && hasRooms && (
          <div className="cd-mattress__switch btn">
            <Button
              loading={loading}
              className="cf-btn__getOrders"
              onClick={() => setAskConfirm(true)}
            >
              SEND ORDER
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default CartCustomer;
