import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { List } from "@material-ui/core";
import AListItem from "./../../common/antd/AListItem";
import ActiveButton from "./../../common/form/ActiveButton";

const DbByGuest = ({ rHeaders }) => {
  return (
    <Card className="db-card-list__wrapper" hoverable>
      <div className="db-cl-span__wrapper">
        <span className="db-cl__span">Active Booking By Guest</span>
        <span className="db-cl__span">
          <ActiveButton textTrue={rHeaders.length} value={true} />
        </span>
      </div>
      <div className="db-cl-body__container">
        <List component="nav" aria-label="mailbox folders">
          {rHeaders.map((d) => (
            <AListItem
              key={d._id}
              txtLbl={
                <Link to={`/a/reservation-management/reservations/${d._id}`}>
                  {d.customer.firstName + " " + d.customer.lastName}
                </Link>
              }
              txtValue={d.reservationType.name}
            />
          ))}
        </List>
      </div>
    </Card>
  );
};

export default DbByGuest;
