import React from "react";
import { Card } from "antd";
import { Divider, Grid, List, ListItem } from "@material-ui/core";
import ActiveButton from "../../common/form/ActiveButton";
const CartBilling = () => {
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
                      202,150 PHP
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
                      50,401 PHP
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
                      821,321 PHP
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
