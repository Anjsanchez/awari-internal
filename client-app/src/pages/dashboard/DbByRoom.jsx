import React from "react";
import { Card } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import { List } from "@material-ui/core";
import AListItem from "./../../common/antd/AListItem";
import ActiveButton from "./../../common/form/ActiveButton";
const DbByRoom = ({ rLines }) => {
  const renderEndDate = (date) => {
    //
    var dateInMoment = moment(date).format("YYYY-MM-DD");

    var isSameDay = moment(date).isSame(moment(), "day");
    if (isSameDay)
      return (
        <ActiveButton value={true} isWarning={true} textTrue={dateInMoment} />
      );

    var isAfter = moment(date).isSameOrBefore(moment(), "day");
    if (isAfter) return <ActiveButton value={false} textFalse={dateInMoment} />;

    return <ActiveButton value={true} textTrue={dateInMoment} />;
  };

  const handleRoomName = (d) => {
    if (d.room) {
      return d.room.roomLongName;
    }
    return d.reservationHeader.reservationType.name;
  };
  return (
    <Card className="db-card-list__wrapper rm" hoverable>
      <div className="db-cl-span__wrapper">
        <span className="db-cl__span">Active Booking By Room</span>
        <span className="db-cl__span">
          <ActiveButton textTrue={rLines.length} value={true} />
        </span>
      </div>
      <div className="db-cl-body__container">
        <List component="nav" aria-label="mailbox folders">
          {rLines.map((d) => (
            <AListItem
              key={d._id}
              txtLbl={
                <Link
                  to={`/a/reservation-management/reservations/${d.reservationHeader._id}`}
                >
                  {handleRoomName(d)}
                </Link>
              }
              txtValue={renderEndDate(d.endDate)}
            />
          ))}
        </List>
      </div>
    </Card>
  );
};

export default DbByRoom;
