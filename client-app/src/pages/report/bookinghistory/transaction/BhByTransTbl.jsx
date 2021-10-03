import React, { useState } from "react";
import { Card, Table } from "antd";
import ActiveButton from "./../../../../common/form/ActiveButton";
import BhByTransModal from "./BhByTransModal";

const BhByTransTbl = ({ trans }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProdId, setSelectedProdId] = useState({});
  //..
  const item = [...trans];

  var result = [];
  item.reduce(function (res, value, i) {
    if (!res[value.product._id]) {
      res[value.product._id] = { ...value, netAmount: 0, timesSold: 0 };
      result.push(res[value.product._id]);
    }

    res[value.product._id].timesSold += 1;
    res[value.product._id].netAmount += value.netAmount;
    return res;
  }, {});

  const sortedByAmt = result.sort(function (a, b) {
    return b.netAmount - a.netAmount;
  });

  const data = [];
  sortedByAmt.map((n, i) => {
    return data.push({
      key: n.product._id,
      Product: n.product.longName,
      Category: n.product.productCategory.name,
      Trans: n.timesSold,
      Net: n.netAmount,
    });
  });

  const columns = [
    {
      title: "Product",
      dataIndex: "Product",
      width: "35%",
      render: (text, h) => (
        <span style={{ color: "#1e88e5" }} onClick={() => tryBtn(h)}>
          {text}
        </span>
      ),
    },
    {
      title: "Category",
      dataIndex: "Category",
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
      <BhByTransModal
        showModal={showModal}
        setShowModal={setShowModal}
        trans={trans}
        prodId={selectedProdId}
      />

      <Card className="db-card-list__wrapper" hoverable>
        <div className="db-cl-span__wrapper">
          <span className="db-cl__span">Product Transactions</span>
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

export default BhByTransTbl;
