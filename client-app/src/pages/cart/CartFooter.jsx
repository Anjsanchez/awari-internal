import { Link } from "react-router-dom";
import CartCustomer from "./CartCustomer";
import { Grid, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { store } from "../../utils/store/configureStore";
import ArrowBackSharpIcon from "@material-ui/icons/ArrowBackSharp";
import { toggleResetValues } from "../../utils/store/pages/createTransaction";
const CartFooter = () => {
  //..
  const hist = useHistory();
  const { id: employeeIdFromUrl } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [navLink, setNavLink] = useState("/a/commerce-management/shop");

  const handleConfirmOrder = () => {
    setShowModal(false);
    setTimeout(() => {
      let linkHome = navLink;

      if (employeeIdFromUrl !== undefined)
        linkHome =
          "/a/reservation-management/reservations/" + employeeIdFromUrl;

      hist.replace(linkHome);
      store.dispatch(toggleResetValues());
    }, 200);
  };

  useEffect(() => {
    if (employeeIdFromUrl === undefined) return;

    setNavLink(navLink + "/" + employeeIdFromUrl);
  }, []);

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
          <Link to={navLink}>
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
