import React from "react";
import { Card, Button } from "antd";
import ShoppingBasketTwoToneIcon from "@material-ui/icons/ShoppingBasketTwoTone";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import Icon from "@material-ui/core/Icon";
import { IconButton, Grid } from "@material-ui/core";
const { Meta } = Card;
const CommerceBody = () => {
  const ur =
    "https://images.pexels.com/photos/6896058/pexels-photo-6896058.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
  const ur1 =
    "https://images.pexels.com/photos/2451082/pexels-photo-2451082.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
  const ur2 =
    "https://images.pexels.com/photos/5103656/pexels-photo-5103656.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
  return (
    <div className="com-body__wrapper">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={4} xl={3}>
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
              <div className="com-body__description">
                <span>Enjoy the jetski in the breeze ocean of Awari.</span>
              </div>
              <div className="com-body__pricing">
                <span className="com-body__pricing-label">PHP 400.40</span>
                <Button type="primary" icon={<ShoppingBasketTwoToneIcon />} />
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Card hoverable bordered={false} className="com-body__card">
            <div
              href="#"
              className="com-body__cardImg"
              style={{
                backgroundImage: `url(${ur2})`,
              }}
            ></div>
            <div className="com-content__wrapper">
              <div className="com-body__title">
                <span>Jetski</span>
              </div>
              <div className="com-body__description">
                <span>
                  A salmon soured with lemon, and marinated for a whole week.
                </span>
              </div>
              <div className="com-body__pricing">
                <span className="com-body__pricing-label">PHP 5,340.40</span>
                <Button type="primary" icon={<ShoppingBasketTwoToneIcon />} />
              </div>
            </div>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Card hoverable bordered={false} className="com-body__card">
            <div
              href="#"
              className="com-body__cardImg"
              style={{
                backgroundImage: `url(${ur1})`,
              }}
            ></div>
            <div className="com-content__wrapper">
              <div className="com-body__title">
                <span>Special Salmon Grill</span>
              </div>
              <div className="com-body__description">
                <span>
                  A salmon soured with lemon, and marinated for a whole week.
                </span>
              </div>
              <div className="com-body__pricing">
                <span className="com-body__pricing-label">PHP 540.40</span>
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
