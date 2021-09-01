import React, { useState } from "react";
import { Badge, Avatar } from "antd";
import ShoppingBasketTwoToneIcon from "@material-ui/icons/ShoppingBasketTwoTone";
const CreateInventoryHeader = () => {
  const [c, cc] = useState(0);
  return (
    <>
      <div className="id-reservation-title__container">
        <div className="header-label__wrapper">
          <label>Inventory Transaction</label>
        </div>
        <div>
          <Badge count={c}>
            <Avatar
              size="default"
              className="idr-title__avatar"
              shape="square"
              icon={<ShoppingBasketTwoToneIcon />}
            />
          </Badge>
        </div>
      </div>
    </>
  );
};

export default CreateInventoryHeader;
