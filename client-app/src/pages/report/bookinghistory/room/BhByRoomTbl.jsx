import { Card, Table } from "antd";
import React, { useState } from "react";
import BhByRoomsModal from "./BhByRoomsModal";
import ActiveButton from "../../../../common/form/ActiveButton";

const BhByRoomTbl = ({ trans }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProdId, setSelectedProdId] = useState({});
  //..
  const item = [...trans];

  var result = [];
  item.reduce(function (res, value, i) {
    if (!res[value.room._id]) {
      res[value.room._id] = { ...value, totalAmount: 0, timesSold: 0 };
      result.push(res[value.room._id]);
    }

    res[value.room._id].timesSold += 1;
    res[value.room._id].totalAmount += value.totalAmount;
    return res;
  }, {});

  const sortedByAmt = result.sort(function (a, b) {
    return b.totalAmount - a.totalAmount;
  });

  const data = [];
  sortedByAmt.map((n, i) => {
    return data.push({
      key: n.room._id,
      Room: n.room.roomLongName,
      Variant: n.room.roomVariant.name,
      Trans: n.timesSold,
      Net: n.totalAmount,
    });
  });

  const columns = [
    {
      title: "Room",
      dataIndex: "Room",
      width: "35%",
      render: (text, h) => (
        <span style={{ color: "#1e88e5" }} onClick={() => tryBtn(h)}>
          {text}
        </span>
      ),
    },
    {
      title: "Variant",
      dataIndex: "Variant",
      width: "13%",
    },
    {
      title: "Trans",
      dataIndex: "Trans",
      width: "8%",
    },
    {
      title: "Net",
      dataIndex: "Net",
      width: "8%",
    },
  ];

  const tryBtn = (e) => {
    setSelectedProdId(e.key);
    setShowModal(true);
  };

  return (
    <>
      <BhByRoomsModal
        showModal={showModal}
        setShowModal={setShowModal}
        trans={trans}
        prodId={selectedProdId}
      />

      <Card className="db-card-list__wrapper" hoverable>
        <div className="db-cl-span__wrapper">
          <span className="db-cl__span">Room Transactions</span>
          <span className="db-cl__span">
            <ActiveButton textTrue={sortedByAmt.length} value={true} />
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

export default BhByRoomTbl;
