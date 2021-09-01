import "moment-timezone";
import React from "react";
import moment from "moment";
import { DatePicker } from "antd";
import "./css/ReservationDatePicker.css";
import { useSelector } from "react-redux";
import { BsArrowRight } from "react-icons/bs";
import { store } from "../../../../../../utils/store/configureStore";

import {
  roomLinesDateAdded,
  roomLinesSelectedReset,
} from "../../../../../../utils/store/pages/createReservation";

const ReservationDatePicker = ({ visible }) => {
  const { RangePicker } = DatePicker;

  const storeData = useSelector(
    (state) => state.entities.createReservation.rooms
  );

  const onChangeRangePicker = (d) => {
    store.dispatch(roomLinesSelectedReset());
    store.dispatch(roomLinesDateAdded({ fromDate: d[0], toDate: d[1] }));
  };

  const disabledDate = (d) => d && d < moment().startOf("day");

  const RenderRangePicker = () => {
    return (
      <div className="header__wrapper">
        <div className="header-label__wrapper">
          <label htmlFor="rangePicker">CHECK-IN</label>
          <label htmlFor="rangePicker">CHECKOUT</label>
        </div>
        <RangePicker
          value={[
            moment(storeData.date.fromDate),
            moment(storeData.date.toDate),
          ]}
          onChange={onChangeRangePicker}
          id="rangePicker"
          suffixIcon={null}
          format="yyyy-MM-DD"
          separator={<BsArrowRight />}
          disabledDate={disabledDate}
          dateRender={(current) => {
            return (
              <div className="ant-picker-cell-inner">{current.date()}</div>
            );
          }}
        />
        {storeData.id !== "" && (
          <div className="header-label__wrapper warning">
            <label>
              Modifying the dates above will reset the selected start, and end
              date.
            </label>
          </div>
        )}
      </div>
    );
  };

  return <>{RenderRangePicker()}</>;
};

export default ReservationDatePicker;
