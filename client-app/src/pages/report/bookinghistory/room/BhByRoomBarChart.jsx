import React from "react";
import { Card, Empty } from "antd";
import ReactApexChart from "react-apexcharts";
const BhByRoomBarChart = ({ filteredTrans }) => {
  //..
  const item = [...filteredTrans];

  var result = [];
  item.reduce(function (res, value) {
    if (!res[value.room._id]) {
      res[value.room._id] = { value, totalAmount: 0 };
      result.push(res[value.room._id]);
    }
    res[value.room._id].totalAmount += value.totalAmount;
    return res;
  }, {});

  const sortedByAmt = result
    .sort(function (a, b) {
      return b.totalAmount - a.totalAmount;
    })
    .slice(0, 12);

  const options = {
    labels: [],
    series: [],
    legend: {
      position: "bottom",
    },
  };

  const series = {
    series: [],
    options: {
      chart: {
        height: 220,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },
      xaxis: {
        categories: [],
        position: "top",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return "₱ " + val;
          },
        },
      },
    },
  };

  const objSeriesData = [];
  sortedByAmt.map((n) => {
    objSeriesData.push(n.totalAmount);
    return series.options.xaxis.categories.push(n.value.room.roomLongName);
  });

  series.series.push({ name: "products", data: objSeriesData });

  filteredTrans.reduce(function (res, value) {
    if (!res[value.room.roomVariant.name]) {
      res[value.room.roomVariant.name] = {
        name: value.room.roomVariant.name,
        amount: 0,
      };
      result.push(res[value.room.roomVariant.name]);
    }
    res[value.room.roomVariant.name].amount += value.totalAmount;

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
        options={series.options}
        series={series.series}
        type="bar"
        width="480px"
      />
    );
  };
  return (
    <Card
      className="db-card-list__wrapper rac db"
      hoverable
      style={{ height: "355px" }}
    >
      <div className="db-cl-span__wrapper">
        <span className="db-cl__span">Best Selling Rooms</span>
      </div>

      <div className="db-cl-body__container rac" style={{ marginTop: "10px" }}>
        {renderBody()}
      </div>
    </Card>
  );
};

export default BhByRoomBarChart;
