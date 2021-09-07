import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartCustomer from "./CartCustomer";
import { useHistory } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import ArrowBackSharpIcon from "@material-ui/icons/ArrowBackSharp";
const CartFooter = () => {
  //..
  const [showModal, setShowModal] = useState(false);
  const hist = useHistory();

  const handleConfirmOrder = () => {
    setShowModal(false);
    hist.replace("/a/commerce-management/shop");
  };
  const handleShowModal = () => setShowModal(true);

  return (
    <div className="cf-container__wrapper">
      <CartCustomer
        showModal={showModal}
        handleCancelModal={() => setShowModal(false)}
        handleConfirmOrder={handleConfirmOrder}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}></Grid>
        <Grid item xs={12} sm={6}>
          <div className="cf-button__container">
            <Button
              onClick={handleShowModal}
              variant="contained"
              color="primary"
            >
              CHECK OUT ORDERS
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Link to="/a/commerce-management/shop">
            <Button
              className="cf-btn__getOrders"
              variant="text"
              color="primary"
              startIcon={<ArrowBackSharpIcon />}
            >
              Continue Orders
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6}></Grid>
      </Grid>
    </div>
  );
};

export default CartFooter;
