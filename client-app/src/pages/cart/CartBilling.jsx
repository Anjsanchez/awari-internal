import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { Divider, Grid, List, ListItem } from "@material-ui/core";
import { useSelector } from "react-redux";
const CartBilling = () => {
  const [grossAmount, setGrossAmount] = useState(0);
  const [netDiscount, setNetDiscount] = useState(0);
  const [netTotal, setNetTotal] = useState(0);

  const products = useSelector(
    (state) => state.entities.createTransaction.products
  );

  useEffect(() => {
    const gross = products.reduce((a, b) => a + b.sellingPrice * b.quantity, 0);
    const netDiscount = products.reduce((a, b) => a + b.netDiscount, 0);

    setGrossAmount(gross);
    setNetDiscount(netDiscount);
    setNetTotal(gross - netDiscount);
  }, [products]);

  return (
    <div className="cb-container__wrapper">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}></Grid>
        <Grid item xs={12} sm={6}>
          <div className="reservationdetails-grid__wrapper first">
            <Card className="reservationDetails-card__wrapper" hoverable>
              <div className="reservationDetails-body__wrapper cb">
                <List component="nav" aria-label="mailbox folders">
                  <ListItem
                    button
                    className="reservationDetails-body__span__wrapper"
                  >
                    <span className="reservationDetails-body__span__label">
                      Net Total
                    </span>
                  </ListItem>
                  <Divider />
                  <ListItem
                    button
                    className="reservationDetails-body__span__wrapper"
                  >
                    <span className="reservationDetails-body__span__label cb">
                      Gross Amount
                    </span>
                    <span className="reservationDetails-body__span__detail">
                      ₱
                      {Intl.NumberFormat().format(
                        Number(grossAmount).toFixed(2)
                      )}
                    </span>
                  </ListItem>
                  <Divider />
                  <ListItem
                    button
                    className="reservationDetails-body__span__wrapper"
                  >
                    <span className="reservationDetails-body__span__label  cb">
                      Net Discount
                    </span>
                    <span className="reservationDetails-body__span__detail">
                      ₱
                      {Intl.NumberFormat().format(
                        Number(netDiscount).toFixed(2)
                      )}
                    </span>
                  </ListItem>
                  <Divider />
                  <ListItem
                    button
                    className="reservationDetails-body__span__wrapper"
                  >
                    <span className="reservationDetails-body__span__label">
                      Net Total
                    </span>
                    <span className="reservationDetails-body__span__detail">
                      ₱{Intl.NumberFormat().format(Number(netTotal).toFixed(2))}
                    </span>
                  </ListItem>
                </List>
              </div>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default CartBilling;
