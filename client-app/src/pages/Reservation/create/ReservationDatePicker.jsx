import moment from "moment";
import { DatePicker } from "antd";
import "./css/ReservationDatePicker.css";
import { useSelector } from "react-redux";
import { BsArrowRight } from "react-icons/bs";
import React, { useState, useEffect } from "react";
const { RangePicker } = DatePicker;

const ReservationDatePicker = () => {
  //
  const [date, setDate] = useState({
    fromDate: moment(),
    toDate: moment(),
  });

  useEffect(() => {
    function loadDate() {
      const { fromDate, toDate } = typeInStore.date;

      const fDate = moment(fromDate, "yyyy-MM-DD");
      const tDate = moment(toDate, "yyyy-MM-DD");

      setDate({ fromDate: fDate, toDate: tDate });
    }

    loadDate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const typeInStore = useSelector(
    (state) => state.entities.createReservation.header
  );

  const onChangeDatePicker = (d) => setDate({ fromDate: d, toDate: d });

  const onChangeRangePicker = (d) => {
    setDate({ fromDate: d[0], toDate: d[1] });
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
    const { name } = typeInStore.type;

    if (name === "Day Tour" || name === "Restaurant") return RenderDatePicker();

    return RenderRangePicker();
  };

  return <>{typeCondition()}</>;
};

export default ReservationDatePicker;
