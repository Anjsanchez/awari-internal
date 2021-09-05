import React from "react";
import { Card, Button } from "antd";
import ShoppingBasketTwoToneIcon from "@material-ui/icons/ShoppingBasketTwoTone";
import { IconButton, Grid } from "@material-ui/core";
import { Badge, Avatar } from "antd";
const { Meta } = Card;

const CommerceBody = () => {
  const ur =
    "https://images.pexels.com/photos/6896058/pexels-photo-6896058.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
  return (
    <div className="com-body__wrapper">
      <Button
        type="primary"
        id="commerceAddToCard"
        icon={
          <Badge count={0}>
            <ShoppingBasketTwoToneIcon />
          </Badge>
        }
      />
      <Grid container spacing={2}>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <Card hoverable bordered={false} className="com-body__card">
            <div
              href="#"
              className="com-body__cardImg"
              style={{
                backgroundImage: `url(${ur})`,
              }}
            ></div>
            <div className="com-content__wrapper">
              <div className="com-body__title">
                <span>Anilao Special Adobo</span>
              </div>
              <div className="com-body__pricing">
                <span className="com-body__pricing-label">PHP 400.40</span>
                <Button type="primary" icon={<ShoppingBasketTwoToneIcon />} />
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default CommerceBody;
