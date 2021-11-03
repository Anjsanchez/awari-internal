import React from "react";
import { Card, Button, Carousel, Image } from "antd";
import { Grid } from "@material-ui/core";
import { store } from "../../utils/store/configureStore";
import { toggleProductsAdded } from "../../utils/store/pages/createTransaction";
import ShoppingBasketTwoToneIcon from "@material-ui/icons/ShoppingBasketTwoTone";
import "./css/Commerce.css";

const CommerceBody = ({ products }) => {
  //

  if (products.length === 0)
    return (
      <Carousel dotPosition="left" className="cd-carousel__wrapper">
        <div className="cd-img__wrapper">
          <Image preview={false} src="/img/menu/p1.png" />
        </div>
        <div className="cd-img__wrapper">
          <Image preview={false} src="/img/menu/p2.png" />
        </div>
        <div className="cd-img__wrapper">
          <Image preview={false} src="/img/menu/p3.png" />
        </div>
        <div className="cd-img__wrapper">
          <Image preview={false} src="/img/menu/p4.png" />
        </div>
      </Carousel>
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
