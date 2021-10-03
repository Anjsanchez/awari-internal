import React from "react";
import { Card, Empty } from "antd";
import ReactApexChart from "react-apexcharts";
const ByHeaderChartTrans = ({ filteredTransHeader }) => {
  const options = {
    labels: [],
    series: [],
  };

  var result = [];

  filteredTransHeader.reduce(function (res, value) {
    if (!res[value.reservationType.name]) {
      res[value.reservationType.name] = {
        name: value.reservationType.name,
        amount: 0,
      };
      result.push(res[value.reservationType.name]);
    }

    res[value.reservationType.name].amount += value.netAmount;

    return res;
  }, {});

  result.map((n) => {
    options.labels.push(n.name);
    return options.series.push(n.amount);
  });

  const renderBody = () => {
    if (options.series.length === 0) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }

    return (
      <ReactApexChart
        options={options}
        series={options.series}
        type="pie"
        width="400px"
      />
    );
  };
  return (
    <Card className="db-card-list__wrapper rac db" hoverable>
      <div className="db-cl-span__wrapper">
        <span className="db-cl__span">Reservation Type Chart</span>
      </div>

      <div className="db-cl-body__container rac" style={{ marginTop: "65px" }}>
        {renderBody()}
      </div>
    </Card>
  );
};

export default ByHeaderChartTrans;
