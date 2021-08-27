import React, { useState, useEffect } from "react";
import "./css/ReservationRoomPicker.css";
import { Collapse } from "antd";
import { store } from "../../../../../../utils/store/configureStore";
import moment from "moment";

const { Panel } = Collapse;
const ReservationRoomPicker = () => {
  const [dateRange, setDateRange] = useState([]);
  const storeData = store.getState().entities.createReservation.rooms.date;

  useEffect(() => {
    const { fromDate, toDate } = storeData;

    // var dates = [];

    // var currDate = moment(fromDate).startOf("day");
    // var lastDate = moment(toDate).startOf("day");

    // while (currDate.add(1, "days").diff(lastDate) <= 0) {
    //   console.log(currDate.toDate());
    //   dates.push(currDate.clone().toDate());
    // }

    var star = fromDate.clone().subtract(2, "days"),
      dates = [];
    var end = toDate.add(2, "day");

    while (star.isSameOrBefore(end)) {
      dates.push(Number(star.format("D")));
      star.add(1, "days");
    }
    console.log(dates);
    setDateRange(dates);
  }, []);

  const renderDates = (date) => {
    return (
      <div key={date} className="picker-body-rooms__dateBox ">
        <span className="picker-body-rooms__dateBox__span ">{date}</span>
      </div>
    );
  };

  return (
    <div className="roomPicker__container">
      <div className="counter-spanHeader__wrapper">
        <span className="counter-spanHeader">CLUSTER ROOM 1</span>
        <span className="counter-spanHeader rrPickerLbl">ROOM</span>
      </div>
      <div className="picker-body__container">
        <Collapse accordion>
          <Panel header="Banawe" key="1">
            <div className="picker-body__rooms">
              <span className="counter-spanHeader rrRoomLbl">
                CLUSTER ROOM 1
              </span>
              <div className="picker-body-rooms__dateWrapper on-scrollbar ">
                {dateRange.map((n) => renderDates(n))}
              </div>
            </div>
          </Panel>
          <Panel header="Cluster" key="2">
            <p>qweqwe</p>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default ReservationRoomPicker;
