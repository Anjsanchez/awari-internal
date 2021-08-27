import moment from "moment";
import { DatePicker } from "antd";
import "./css/ReservationDatePicker.css";
import { BsArrowRight } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { store } from "../../../../../../utils/store/configureStore";
import { roomLinesDateAdded } from "../../../../../../utils/store/pages/RoomReservation";

const { RangePicker } = DatePicker;

const ReservationDatePicker = () => {
  //
  const [date, setDate] = useState({
    fromDate: moment(),
    toDate: moment(),
  });

  const storeData = store.getState().entities;

  useEffect(() => {
    function initialLoadValues() {
      const { fromDate, toDate } = storeData.createReservation.rooms.date;

      const frDate = moment(fromDate);
      const tDate = moment(toDate);
      var isSameDayFrom = moment(fromDate).isSame(moment(), "day");
      var isSameDayTo = moment(toDate).isSame(moment(), "day");

      if (isSameDayFrom && isSameDayTo) return;

      setDate({
        fromDate: frDate,
        toDate: tDate,
      });
    }
    initialLoadValues();
  }, []);

  useEffect(() => {
    store.dispatch(roomLinesDateAdded(date));
  }, [date]);

  const onChangeDatePicker = (d) => setDate({ fromDate: d, toDate: d });

  const onChangeRangePicker = (d) =>
    d === null ? null : setDate({ fromDate: d[0], toDate: d[1] });

  const disabledDate = (d) => d && d < moment().startOf("day");

  const RenderRangePicker = () => {
    return (
      <div className="header__wrapper">
        <div className="header-label__wrapper">
          <label htmlFor="rangePicker">CHECK-IN</label>
          <label htmlFor="rangePicker">CHECKOUT</label>
        </div>
        <RangePicker
          value={[date.fromDate, date.toDate]}
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
      </div>
    );
  };

  const RenderDatePicker = () => {
    return (
      <div className="header__wrapper">
        <div className="header-label__wrapper">
          <label htmlFor="datePicker">CHECK-IN</label>
        </div>
        <DatePicker
          value={date.fromDate}
          format="yyyy-MM-DD"
          onChange={onChangeDatePicker}
          id="datePicker"
          suffixIcon={null}
          separator={<BsArrowRight />}
          disabledDate={disabledDate}
        />
      </div>
    );
  };

  const typeCondition = () => {
    const { name } = storeData.reservationDetails.header.reservationType;

    if (name === "Day Tour" || name === "Restaurant") return RenderDatePicker();

    return RenderRangePicker();
  };

  return <>{typeCondition()}</>;
};

export default ReservationDatePicker;
