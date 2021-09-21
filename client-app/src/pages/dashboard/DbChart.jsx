import React from "react";
import { Card } from "antd";
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

  return (
    <Card className="db-card-list__wrapper rac" hoverable>
      <ReactApexChart
        options={options}
        series={options.series}
        type="pie"
        width="380"
      />
    </Card>
  );
};

export default DbChart;
