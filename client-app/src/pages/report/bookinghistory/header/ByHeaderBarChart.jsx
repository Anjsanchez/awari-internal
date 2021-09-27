import React from "react";
import { Card, Empty } from "antd";
import ReactApexChart from "react-apexcharts";
const ByHeaderBarChart = ({ filteredTransHeader }) => {
  if (filteredTransHeader.length === 0) return null;
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

  filteredTransHeader.map((value) => {
    series.push({
      name: value.reservationType.name,
      data: [value.grossAmount, value.netAmount, value.netDiscount],
    });
  });

  const renderBody = () => {
    if (options.length === 0) {
      return (
        <Card className="db-card-list__wrapper rac" hoverable>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </Card>
      );
    }

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
        <span className="db-cl__span">Reservation Type Chart</span>
      </div>
      <div className="bh-body__container">{renderBody()}</div>
    </Card>
  );
};

export default ByHeaderBarChart;
