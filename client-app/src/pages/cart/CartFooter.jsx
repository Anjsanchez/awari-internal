import React from "react";
import { Link } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import ArrowBackSharpIcon from "@material-ui/icons/ArrowBackSharp";
const CartFooter = () => {
  return (
    <div className="cf-container__wrapper">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}></Grid>
        <Grid item xs={12} sm={6}>
          <div className="cf-button__container">
            <Button variant="contained" color="primary">
              Print Orders
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
