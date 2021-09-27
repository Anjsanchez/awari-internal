import React, { useState } from "react";
import { Card, Table } from "antd";
import ActiveButton from "./../../../../common/form/ActiveButton";
import DbByHeaderModal from "./DbByHeaderModal";

const DbByHeaderTbl = ({ headers }) => {
  //..
  const [showModal, setShowModal] = useState(false);
  const [selectedProdId, setSelectedProdId] = useState({});
  const item = [...headers];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "35%",
      render: (text, h) => (
        <span style={{ color: "#1e88e5" }} onClick={() => tryBtn(h)}>
          {text}
        </span>
      ),
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

  const tryBtn = (e) => {
    setSelectedProdId(e.custId);
    setShowModal(true);
  };

  var result = [];
  item.reduce(function (res, value, i) {
    if (!res[value.customer._id]) {
      res[value.customer._id] = {
        ...value,
        netAmount: 0,
        timesSold: 0,
        netTrans: 0,
        netRooms: 0,
        Gross: 0,
        netPax: 0,
        netDiscount: 0,
      };
      result.push(res[value.customer._id]);
    }

    res[value.customer._id].timesSold += 1;
    res[value.customer._id].netRooms += value.totalNumberOfRooms;
    res[value.customer._id].netTrans += value.totalNumberOfTrans;
    res[value.customer._id].netPax += value.totalNumberOfGuest;
    res[value.customer._id].Gross += value.grossAmount;
    res[value.customer._id].netDiscount += value.netDiscount;
    res[value.customer._id].netAmount += value.netAmount;
    return res;
  }, {});

  const sortedByAmt = result.sort(function (a, b) {
    return b.netAmount - a.netAmount;
  });

  const data = [];
  sortedByAmt.map((n, i) => {
    return data.push({
      key: n._id,
      custId: n.customer._id,
      Type: n.reservationType.name,
      Rooms: n.totalNumberOfRooms,
      Trans: n.netTrans,
      name: n.customer.firstName + " " + n.customer.lastName,
      Gross: n.Gross,
      pax: n.netPax,
      Discount: n.netDiscount,
      net: n.netAmount,
    });
  });

  return (
    <>
      <DbByHeaderModal
        showModal={showModal}
        setShowModal={setShowModal}
        trans={headers}
        prodId={selectedProdId}
      />
      <Card className="db-card-list__wrapper" hoverable>
        <div className="db-cl-span__wrapper">
          <span className="db-cl__span">Guest Transactions</span>
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
    </>
  );
};

export default DbByHeaderTbl;
