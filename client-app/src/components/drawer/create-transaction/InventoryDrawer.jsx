import { Drawer } from "antd";
import "./css/InventoryDrawer.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { store } from "../../../utils/store/configureStore";
import { toggleOpenDrawer } from "../../../utils/store/pages/createTransaction";
import ReservationCustomer from "./../../../pages/Reservation/create/ReservationCustomer";
import CreateInventoryHeader from "./CreateInventoryHeader";
import SelectTransactionLinesRooms from "./../../../common/select/SelectTransactionLinesRooms";

const InventoryDrawer = () => {
  const createTransaction = useSelector(
    (state) => state.entities.createTransaction
  );

  const [c, cc] = useState(0);
  const onClose = () => store.dispatch(toggleOpenDrawer(false));

  return (
    <>
      <Drawer
        placement="right"
        closable={false}
        width={"350px"}
        onClose={onClose}
        visible={createTransaction.isOpenDrawer}
      >
        <CreateInventoryHeader />

        <div className="id-reservationCustomer__container">
          <ReservationCustomer action="inventoryTransaction" />
        </div>

        {Object.keys(createTransaction.customer).length !== 0 && (
          <div className="id-reservationCustomer__container">
            <SelectTransactionLinesRooms />
          </div>
        )}

        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default InventoryDrawer;
