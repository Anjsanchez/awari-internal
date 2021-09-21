import React from "react";
import { Card, Table } from "antd";
import ActiveButton from "./../../common/form/ActiveButton";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: "55%",
    // render: (text) => <a>{text}</a>,
  },

  {
    title: "Pax",
    dataIndex: "pax",
    width: "10%",
  },
  {
    title: "Gross",
    dataIndex: "Gross",
    width: "10%",
  },
  {
    title: "Discount",
    dataIndex: "Discount",
    width: "10%",
  },
  {
    title: "Net",
    dataIndex: "net",
    width: "10%",
  },
];

const DbCheckOutTbl = ({ headers }) => {
  const data = [];
  headers.map((n, i) => {
    return data.push({
      key: i + n._id,
      name: n.customer.firstName + " " + n.customer.lastName,
      Gross: n.grossAmount,
      pax: n.totalNumberOfGuest,
      Discount: n.netDiscount,
      net: n.netAmount,
    });
  });

  return (
    <Card className="db-card-list__wrapper" hoverable>
      <div className="db-cl-span__wrapper">
        <span className="db-cl__span">Today's Checkout</span>
        <span className="db-cl__span">
          <ActiveButton textTrue={headers.length} value={true} />
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
  );
};

export default DbCheckOutTbl;
