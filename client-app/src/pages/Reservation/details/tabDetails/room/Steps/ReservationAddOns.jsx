import "./css/ReservationAddOns.css";
import React, { useState, useEffect } from "react";
import Counter from "../../../../../../common/Counter";
import { store } from "../../../../../../utils/store/configureStore";
import MaterialTextField from "../../../../../../common/MaterialTextField";
import {
  roomLinesSelectedAddOnsMattress,
  roomLinesSelectedAddOnsRemark,
} from "../../../../../../utils/store/pages/createReservation";
//
const ReservationAddOns = () => {
  //
  const [mattress, setMattress] = useState(0);
  const [remark, setRemark] = useState("");

  const storeData = store.getState().entities.createReservation.rooms;

  useEffect(() => {
    function initialLoadValues() {
      const { remarks, mattress } = storeData.addOns;

      setRemark(remarks);
      setMattress(mattress);
    }
    initialLoadValues();
  }, []);

  const handleIncrement = () => {
    setMattress((n) => {
      const value = n + 1;

      store.dispatch(roomLinesSelectedAddOnsMattress(value));
      return value;
    });
  };

  const handleDecrement = () => {
    setMattress((p) => {
      if (p <= 0) return p;

      const value = p - 1;
      store.dispatch(roomLinesSelectedAddOnsMattress(value));
      return value;
    });
  };

  const handleChange = (e) => {
    const { value } = e.target;

    store.dispatch(roomLinesSelectedAddOnsRemark(value));
    setRemark(value);
  };

  useEffect(() => {}, [mattress]);

  return (
    <div className="guestCount__container">
      <Counter
        name="mattress"
        onIncrement={handleIncrement}
        counterV={mattress}
        onDecrement={handleDecrement}
      />
      <div className="rPromotion__wrapper">
        <MaterialTextField
          id="remarks"
          label="Remarks"
          handleChange={handleChange}
          multiline={true}
          values={remark}
        />
      </div>
    </div>
  );
};

export default ReservationAddOns;
