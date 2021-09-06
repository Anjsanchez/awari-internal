import React from "react";
import { Card, Button } from "antd";
import { Grid } from "@material-ui/core";
import EmptyContent from "./../../common/EmptyContent";
import { store } from "../../utils/store/configureStore";
import { toggleProductsAdded } from "../../utils/store/pages/createTransaction";
import ShoppingBasketTwoToneIcon from "@material-ui/icons/ShoppingBasketTwoTone";

const CommerceBody = ({ products }) => {
  //

  if (products.length === 0)
    return (
      <EmptyContent
        text="THERE IS NO PRODUCT"
        subText="Try checking your filter or use more general search"
      />
    );

  return (
    <div className="com-body__wrapper">
      <Grid container spacing={2}>
        {products.map((n) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={n._id}>
            <Card hoverable bordered={false} className="com-body__card">
              <div
                href="#"
                className="com-body__cardImg"
                style={{
                  backgroundImage: `url(${n.imageSrc})`,
                }}
              ></div>
              <div className="com-content__wrapper">
                <div className="com-body__title">
                  <span>{n.longName}</span>
                </div>
                <div className="com-body__description">
                  <span>{n.productType.name}</span>
                </div>
                <div className="com-body__pricing">
                  <span className="com-body__pricing-label">
                    ₱{" "}
                    {Intl.NumberFormat().format(
                      Number(n.sellingPrice).toFixed(2)
                    )}
                  </span>
                  <Button
                    type="primary"
                    icon={<ShoppingBasketTwoToneIcon />}
                    onClick={() => store.dispatch(toggleProductsAdded(n))}
                  />
                </div>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CommerceBody;
