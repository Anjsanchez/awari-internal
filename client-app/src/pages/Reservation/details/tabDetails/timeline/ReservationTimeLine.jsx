import { Card, Timeline } from "antd";
import React from "react";
import "./css/ReservationTimeLine.css";
import { useSelector } from "react-redux";
import moment from "moment";
const ReservationTimeLine = () => {
  const typeInStore = useSelector((state) => state.entities.reservationDetails);

  console.log(typeInStore);

  const data = [];

  return (
    <div className="reservationdetails-grid__wrapper rtl">
      <Card className="reservationDetails-card__wrapper" hoverable>
        <div className="rtl__wrapper">
          <Timeline mode="left">
            <Timeline.Item
              label={moment(typeInStore.header.createdDate).format(
                "YYYY-MM-DD hh:mm A"
              )}
              color="green"
            >
              Booking Created
            </Timeline.Item>
            <Timeline.Item label="2015-09-01 09:12:11">
              Solve initial network problems
            </Timeline.Item>
            <Timeline.Item label="2015-09-01 09:12:11">
              Network problems being solved
            </Timeline.Item>
          </Timeline>
        </div>
      </Card>
    </div>
  );
};

export default ReservationTimeLine;
