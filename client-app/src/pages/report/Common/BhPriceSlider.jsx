import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Slider, InputNumber, Row, Col } from "antd";

const BhPriceSlider = ({ sLProfit, setSLProfit }) => {
  const onChangeFromValue = (value) => {
    setSLProfit((n) => {
      if (n.to < value) value = 5000;
      return {
        ...n,
        from: value,
      };
    });
  };

  const onChangeToValue = (value) => {
    if (isNaN(value)) return;

    setSLProfit((n) => {
      if (n.from > value) value = 500000;
      return {
        ...n,
        to: value,
      };
    });
  };

  const intStep = () => {
    return (
      <Row>
        <Col span={24}>
          <Slider
            min={0}
            max={500000}
            onChange={onChangeFromValue}
            step={5000}
            value={typeof sLProfit.from === "number" ? sLProfit.from : 0}
          />
        </Col>
        <Col span={24} style={{ textAlign: "right" }}>
          <InputNumber
            min={0}
            max={500000}
            step={5000}
            style={{ margin: "0 16px" }}
            value={sLProfit.from}
            onChange={onChangeFromValue}
          />
        </Col>
      </Row>
    );
  };

  const decimalStep = () => {
    return (
      <Row>
        <Col span={24}>
          <Slider
            min={0}
            max={500000}
            onChange={onChangeToValue}
            value={typeof sLProfit.to === "number" ? sLProfit.to : 0}
            step={5000}
          />
        </Col>
        <Col span={24} style={{ textAlign: "right" }}>
          <InputNumber
            min={0}
            max={500000}
            style={{ margin: "0 16px" }}
            step={5000}
            value={sLProfit.to}
            onChange={onChangeToValue}
          />
        </Col>
      </Row>
    );
  };
  return (
    <div>
      {intStep()}
      {decimalStep()}
    </div>
  );
};

export default BhPriceSlider;
