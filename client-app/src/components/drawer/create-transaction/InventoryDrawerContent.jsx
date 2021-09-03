import React, { useState } from "react";
import { useSelector } from "react-redux";
import InventoryDrawerTabs from "./InventoryDrawerTabs";
import CreateInventoryHeader from "./CreateInventoryHeader";
import ReservationCustomer from "./../../../pages/Reservation/create/ReservationCustomer";
import SelectTransactionLinesRooms from "./../../../common/select/SelectTransactionLinesRooms";

const InventoryDrawerContent = () => {
  const [tabValue, setTabValue] = useState(0);

  const createTransaction = useSelector(
    (state) => state.entities.createTransaction
  );

  const handleSelectTabs = (event, newValue) => setTabValue(newValue);

  return (
    <div className="id-drawer__container">
      <CreateInventoryHeader />

      <div className="id-reservationCustomer__container">
        <ReservationCustomer action="inventoryTransaction" />
      </div>

      {Object.keys(createTransaction.customer).length !== 0 && (
        <div className="id-reservationCustomer__container">
          <SelectTransactionLinesRooms />
        </div>
      )}

      <div style={{ marginTop: "50px" }}></div>

      <InventoryDrawerTabs
        value={tabValue}
        onChange={handleSelectTabs}
        items={createTransaction.productCategory}
      />

      <p>Some contents...</p>
      <p>Some contents...</p>
    </div>
  );
};

export default InventoryDrawerContent;
