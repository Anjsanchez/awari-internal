import React from "react";
import { Drawer } from "antd";
import "./css/InventoryDrawer.css";
import { useSelector } from "react-redux";
import { store } from "../../../utils/store/configureStore";
import { toggleOpenDrawer } from "../../../utils/store/pages/createTransaction";
import InventoryDrawerContent from "./InventoryDrawerContent";

const InventoryDrawer = () => {
  const createTransaction = useSelector(
    (state) => state.entities.createTransaction
  );

  const onClose = () => store.dispatch(toggleOpenDrawer(false));

  return (
    <>
      <Drawer
        placement="right"
        closable={false}
        width={"auto"}
        onClose={onClose}
        visible={createTransaction.isOpenDrawer}
      >
        <InventoryDrawerContent />
      </Drawer>
    </>
  );
};

export default InventoryDrawer;
