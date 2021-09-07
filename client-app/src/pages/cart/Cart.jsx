import React from "react";
import "./css/CommerceCart.css";
import CartTable from "./CartTable";
import CartFooter from "./CartFooter";
import CartBilling from "./CartBilling";
import { Divider } from "@material-ui/core";
const Cart = () => {
  return (
    <div className="container__wrapper cc">
      <div className="cc-header__container">
        <div>
          <span className="cc-title__leftSpan">Cart Items</span>
        </div>
      </div>
      <Divider className="cc-title_divider" />
      <CartTable />
      <CartBilling />
      <CartFooter />
    </div>
  );
};

export default Cart;
