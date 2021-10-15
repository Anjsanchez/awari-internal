import React from "react";
import { Card, Empty } from "antd";
import ReactApexChart from "react-apexcharts";
const ByHeaderBarChart = ({ filteredTransHeader }) => {
  //..
  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: true,
      },
    },

    xaxis: {
      type: "string",
      categories: ["GROSS AMT", "NET AMT", "NET DISC"],
    },

    fill: {
      opacity: 1,
    },
  };

  const series = [];

  const item = [...filteredTransHeader];

  var result = [];
  item.reduce(function (res, value, i) {
    if (!res[value.reservationType._id]) {
      res[value.reservationType._id] = {
        ...value,
        netAmount: 0,
        timesSold: 0,
        grossAmount: 0,
        netDiscount: 0,
      };
      result.push(res[value.reservationType._id]);
    }
    res[value.reservationType._id].timesSold += 1;
    res[value.reservationType._id].netAmount += value.netAmount;
    res[value.reservationType._id].netDiscount += value.netDiscount;
    res[value.reservationType._id].grossAmount += value.grossAmount;
    return res;
  }, {});

  result.map((value) => {
    return series.push({
      name: value.reservationType.name,
      data: [value.grossAmount, value.netAmount, value.netDiscount],
    });
  });

  const renderBody = () => {
    if (options.length === 0 || filteredTransHeader.length === 0)
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ marginTop: "73px" }}
        />
      );

    return (
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height="365px"
      />
    );
  };
  return (
    <Card className="db-card-list__wrapper rac db" hoverable>
      <div className="db-cl-span__wrapper">
        <span className="db-cl__span">Bar Chart</span>
      </div>
      <div className="bh-body__container">{renderBody()}</div>
    </Card>
  );
};

export default ByHeaderBarChart;
