import React from "react";
import { Card, Empty } from "antd";
import ReactApexChart from "react-apexcharts";

const DbChart = ({ rTrans }) => {
  const options = {
    labels: [],
    series: [],
  };

  var result = [];
  rTrans.reduce(function (res, value) {
    if (!res[value.product.productCategory.name]) {
      res[value.product.productCategory.name] = {
        name: value.product.productCategory.name,
        amount: 0,
      };
      result.push(res[value.product.productCategory.name]);
    }

    res[value.product.productCategory.name].amount +=
      value.product.sellingPrice * value.quantity - value.netDiscount;
    return res;
  }, {});

  result.map((n) => {
    options.labels.push(n.name);
    return options.series.push(n.amount);
  });

  const renderBody = () => {
    if (options.series.length === 0) {
      return (
        <Card className="db-card-list__wrapper rac" hoverable>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </Card>
      );
    }

    return (
      <ReactApexChart
        options={options}
        series={options.series}
        type="pie"
        width="380"
      />
    );
  };
  return (
    <Card className="db-card-list__wrapper rac" hoverable>
      <div className="db-cl-span__wrapper">
        <span className="db-cl__span">Transaction Chart</span>
      </div>
      <div className="db-cl-body__container rac">{renderBody()}</div>
    </Card>
  );
};

export default DbChart;