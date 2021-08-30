import React from "react";
import { Divider } from "antd";
import { ListItem } from "@material-ui/core";

const AListItem = ({ txtLbl, txtValue, Icon, hasDivider = true }) => {
  return (
    <>
      <ListItem button className="reservationDetails-body__span__wrapper">
        {Icon && <Icon className="reservationDetails-body__span__icon" />}
        <span className="reservationDetails-body__span__label">{txtLbl}</span>
        <span className="reservationDetails-body__span__detail">
          {txtValue}
        </span>
      </ListItem>
      {hasDivider && <Divider className="paymentModalVoucher__divider" />}
    </>
  );
};

export default AListItem;
