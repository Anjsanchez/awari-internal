import React from "react";
import moment from "moment";
import { Card, Timeline } from "antd";
import "./css/ReservationTimeLine.css";
import { useSelector } from "react-redux";

const ReservationTimeLine = () => {
  const typeInStore = useSelector((state) => state.entities.reservationDetails);

  let data = [];

  const { name } = typeInStore.header.reservationType;
  if (name !== "Restaurant" && name !== "Day Tour") {
    typeInStore.rooms.map((n) =>
      data.push({
        type: "R",
        action: `R - ${n.room.roomLongName}`,
        date: n.createdDate,
      })
    );
  }

  typeInStore.payments.map((n) =>
    data.push({
      type: "P",
      action: `P - ${n.payment.name}`,
      date: n.createdDate,
    })
  );

  typeInStore.trans.map((n) =>
    data.push({
      type: "T",
      action: `T - ${n.product.longName}`,
      date: n.createdDate,
    })
  );

  const sorted = data.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });

  let lastDate = "";
  const renderBody = (d, i) => {
    let color = "red";
    let dateLbl = null;

    if (d.type === "R") color = "blue";
    if (d.type === "P") color = "yellow";

    const newDate = moment(d.date).format("YYYY-MM-DD hh:mm A");
    if (lastDate !== newDate) {
      dateLbl = newDate;
      lastDate = newDate;
    }

    return (
      <Timeline.Item color={color} label={dateLbl} key={i}>
        {d.action}
      </Timeline.Item>
    );
  };

  const renderCheckOut = () => {
    if (!typeInStore.isTrans) return null;

    return (
      <Timeline.Item
        label={moment(typeInStore.header.checkOutDate).format(
          "YYYY-MM-DD hh:mm A"
        )}
        color="green"
      >
        Check Out
      </Timeline.Item>
    );
  };

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
            {sorted.map((n, i) => renderBody(n, i))}
            {renderCheckOut()}
          </Timeline>
        </div>
      </Card>
    </div>
  );
};

export default ReservationTimeLine;
