import React from "react";
import "./css/CommerceCart.css";
import { Divider } from "@material-ui/core";
import CartTable from "./CartTable";
import CartBilling from "./CartBilling";
import CartFooter from "./CartFooter";
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
