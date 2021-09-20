import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import "./css/Dashboard.css";
import { Card, Table } from "antd";
import { List } from "@material-ui/core";
import AListItem from "./../../common/antd/AListItem";
import ActiveButton from "../../common/form/ActiveButton";
import ReactApexChart from "react-apexcharts";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "55%",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Room",
    key: "room",
    width: "10%",
  },
  {
    title: "Pax",
    key: "pax",
    width: "10%",
  },
  {
    title: "Tran",
    key: "trans",
    width: "10%",
  },
  {
    title: "Net",
    key: "net",
    width: "10%",
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
const series1 = [44, 55, 123, 43, 42];
const options1 = {
  chart: {
    width: 380,
    type: "pie",
  },
  labels: ["Restaurant", "SkyBar", "Cafe Bay", "Activities", "GameRoom"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

const Dashboard = () => {
  const [series, setSeries] = useState(series1);
  const [options, setoptions] = useState(options1);

  return (
    <div className="container__wrapper db">
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <Card className="db-card__wrapper" hoverable>
                <span className="db-title__span">₱10,200</span>
                <span className="db-title__subSpan">Today's Total Earning</span>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Card className="db-card__wrapper nog" hoverable>
                <span className="db-title__span">520</span>
                <span className="db-title__subSpan nog">Number of Guests</span>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Card className="db-card-list__wrapper" hoverable>
                <div className="db-cl-span__wrapper">
                  <span className="db-cl__span">Today's Checkout</span>
                  <span className="db-cl__span">
                    <ActiveButton textTrue="5" value={true} />
                  </span>
                </div>
                <div className="db-cl-body__container">
                  <Table
                    columns={columns}
                    className="db-cl-body__table"
                    dataSource={data}
                    size="small"
                    pagination={false}
                    footer={null}
                  />
                </div>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Card className="db-card-list__wrapper rac" hoverable>
                <ReactApexChart
                  options={options}
                  series={series}
                  type="pie"
                  width="380"
                />
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={12} lg={4}>
          <Grid item xs={12}>
            <Card className="db-card-list__wrapper" hoverable>
              <div className="db-cl-span__wrapper">
                <span className="db-cl__span">Active Booking By Guest</span>
                <span className="db-cl__span">
                  <ActiveButton textTrue="5" value={true} />
                </span>
              </div>
              <div className="db-cl-body__container">
                <List component="nav" aria-label="mailbox folders">
                  <AListItem
                    txtLbl="Angelo Sanchez"
                    txtValue={<ActiveButton textTrue="₱ 15,200" value={true} />}
                  />
                  <AListItem
                    txtLbl="Patricia Pangan"
                    txtValue={
                      <ActiveButton textTrue="₱ 8,200" isWarning={true} />
                    }
                  />
                  <AListItem
                    txtLbl="Austine Sanchez"
                    txtValue={<ActiveButton textFalse="₱ 4,200" />}
                  />
                  <AListItem txtLbl="Astrid Sanchez" txtValue="azxc" />
                  <AListItem txtLbl="Astrid Sanchez" txtValue="azxc" />
                  <AListItem txtLbl="Astrid Sanchez" txtValue="azxc" />
                  <AListItem txtLbl="Astrid Sanchez" txtValue="azxc" />
                </List>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className="db-card-list__wrapper rm" hoverable>
              <div className="db-cl-span__wrapper">
                <span className="db-cl__span">Active Booking By Room</span>
                <span className="db-cl__span">
                  <ActiveButton textTrue="5" value={true} />
                </span>
              </div>
              <div className="db-cl-body__container">
                <List component="nav" aria-label="mailbox folders">
                  <AListItem
                    txtLbl="Presidential Room 1"
                    txtValue={<ActiveButton textTrue="₱ 15,200" value={true} />}
                  />
                  <AListItem
                    txtLbl="Presidential Room 2"
                    txtValue={
                      <ActiveButton textTrue="₱ 8,200" isWarning={true} />
                    }
                  />
                  <AListItem
                    txtLbl="Cluster Room 1"
                    txtValue={<ActiveButton textFalse="₱ 4,200" />}
                  />
                </List>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className="db-card-list__wrapper rm" hoverable>
              <div className="db-cl-span__wrapper">
                <span className="db-cl__span">Transaction Today</span>
                <span className="db-cl__span">
                  <ActiveButton textTrue="5" value={true} />
                </span>
              </div>
              <div className="db-cl-body__container">
                <List component="nav" aria-label="mailbox folders">
                  <AListItem
                    txtLbl="Adobo Anilao"
                    txtValue={<ActiveButton textTrue="₱ 15,200" value={true} />}
                  />
                  <AListItem
                    txtLbl="Grilled Salmon"
                    txtValue={
                      <ActiveButton textTrue="₱ 8,200" isWarning={true} />
                    }
                  />
                  <AListItem
                    txtLbl="Jetski"
                    txtValue={<ActiveButton textFalse="₱ 4,200" />}
                  />
                </List>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="db-card__wrapper" hoverable>
            <span className="db-title__span">₱10,200</span>
            <span className="db-title__subSpan">Today's Total Earning</span>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="db-card__wrapper nog" hoverable>
            <span className="db-title__span">520</span>
            <span className="db-title__subSpan nog">Number of Guests</span>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Card className="db-card-list__wrapper" hoverable>
            <div className="db-cl-span__wrapper">
              <span className="db-cl__span">Active Booking By Guest</span>
              <span className="db-cl__span">5</span>
            </div>
            <div className="db-cl-body__container">
              <List component="nav" aria-label="mailbox folders">
                <AListItem
                  txtLbl="Angelo Sanchez"
                  txtValue={<ActiveButton textTrue="₱ 15,200" value={true} />}
                />
                <AListItem
                  txtLbl="Patricia Pangan"
                  txtValue={
                    <ActiveButton textTrue="₱ 8,200" isWarning={true} />
                  }
                />
                <AListItem
                  txtLbl="Austine Sanchez"
                  txtValue={<ActiveButton textFalse="₱ 4,200" />}
                />
                <AListItem txtLbl="Astrid Sanchez" txtValue="azxc" />
                <AListItem txtLbl="Astrid Sanchez" txtValue="azxc" />
                <AListItem txtLbl="Astrid Sanchez" txtValue="azxc" />
                <AListItem txtLbl="Astrid Sanchez" txtValue="azxc" />
              </List>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <Card className="db-card-list__wrapper" hoverable>
            asd
          </Card>
        </Grid>
      </Grid> */}
    </div>
  );
};

export default Dashboard;
