import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Switch, Button } from "antd";
import MDialog from "./../../common/MDialog";
import { store } from "../../utils/store/configureStore";
import { toggleSendKitchen } from "../../utils/store/pages/createTransaction";
import ReservationCustomer from "./../Reservation/create/ReservationCustomer";
import { saveTransLine } from "./../../utils/services/pages/reservation/ReservationTrans";
import SelectTransactionLinesRooms from "./../../common/select/SelectTransactionLinesRooms";

const dialog = {
  title: "Confirmation",
  subTitle: "Are you sure you want to save this record?",
};

const CartCustomer = ({ showModal, handleCancelModal, handleConfirmOrder }) => {
  //..
  const { enqueueSnackbar } = useSnackbar();
  const [loading, isLoading] = useState(false);
  const [askConfirm, setAskConfirm] = useState(false);

  const createTransaction = useSelector(
    (state) => state.entities.createTransaction
  );

  const hasCustomer = Object.keys(createTransaction.customer).length !== 0;
  const hasRooms = Object.keys(createTransaction.room).length !== 0;

  const onSwitchChange = (n) => store.dispatch(toggleSendKitchen(n));

  const handleOkDialog = async () => {
    setAskConfirm(false);
    isLoading(true);

    try {
      await saveTransLine(objViewModel());
      enqueueSnackbar("Successfully updated records!", { variant: "success" });
      handleConfirmOrder();
    } catch (ex) {
      if ((ex && ex.status === 400) || (ex && ex.status === 400))
        enqueueSnackbar(ex.data, { payment: "error" });
    } finally {
      isLoading(false);
    }
  };

  const objViewModel = () => {
    const objArray = [];

    const user = store.getState().entities.user.user;
    const { products, customer, room } = createTransaction;

    products.forEach((n) => {
      const discountId = n.discount._id === 0 ? null : n.discount._id;

      const obj = {
        reservationHeaderId: customer.headerId,
        reservationRoomLineId: room._id,
        productId: n._id,
        discountId: discountId,
        quantity: n.quantity,
        seniorPax: n.seniorPax,
        netDiscount: n.netDiscount,
        remark: n.remark,
        userId: user.id,
        isPrinted: createTransaction.sendToKitchen,
      };
      console.log(obj);
      objArray.push(obj);
    });

    return objArray;
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
