import React from "react";
import ReservationCustomer from "./../pages/Reservation/create/ReservationCustomer";
import { useSelector } from "react-redux";
import SelectTransactionLinesRooms from "./select/SelectTransactionLinesRooms";

const GuestChecker = () => {
  const createTransaction = useSelector(
    (state) => state.entities.createTransaction
  );

  return (
    <div>
      <div className="cd-mattress__autoComplete">
        <ReservationCustomer action="inventoryTransaction" />
        <SelectTransactionLinesRooms
          activeRoom={createTransaction.room}
          customer={createTransaction.customer}
        />
        {Object.keys(createTransaction.room).length !== 0 && (
          <>
            <div className="header-label__wrapper remark__wrapper">
              <div>
                <span>
                  ADULT
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                  &nbsp;{" "}
                </span>
                <span className="header-label__description">
                  {createTransaction.room.adultPax}
                </span>
              </div>
              <div>
                <span>
                  SENIOR/PWD
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <span className="header-label__description">
                  {createTransaction.room.seniorPax}
                </span>
              </div>
              <div>
                <span>
                  CHILDREN &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;
                  &nbsp;
                </span>
                <span className="header-label__description">
                  {createTransaction.room.childrenPax}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GuestChecker;
