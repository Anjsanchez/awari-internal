import React from "react";
import { Card, Table } from "antd";
import ActiveButton from "./../../../../common/form/ActiveButton";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: "35%",
  },
  {
    title: "Type",
    dataIndex: "Type",
    width: "13%",
  },
  {
    title: "Rooms",
    dataIndex: "Rooms",
    width: "8%",
  },
  {
    title: "Trans",
    dataIndex: "Trans",
    width: "8%",
  },
  {
    title: "Pax",
    dataIndex: "pax",
    width: "8%",
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

const DbByHeaderTbl = ({ headers }) => {
  const data = [];
  headers.map((n, i) => {
    return data.push({
      key: i + n._id,
      Type: n.reservationType.name,
      Rooms: n.totalNumberOfRooms,
      Trans: n.totalNumberOfTrans,
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
        <span className="db-cl__span">Checkouts</span>
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

export default DbByHeaderTbl;
