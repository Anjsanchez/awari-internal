import moment from "moment";
import React, { useState } from "react";
import { Modal, Table } from "antd";
import ReservationDetailsTransactionUpdateModal from "./../../Reservation/details/tabDetails/transaction/ReservationDetailsTransactionUpdateModal";
const CommerceTransaction = ({
  visible = false,
  setOnVisible,
  trans,
  setTrans,
}) => {
  const [showGuest, setShowGuest] = useState({ action: "update", value: true });
  const [selectedTrans, setSelectedTrans] = useState({});

  const columns = [
    {
      title: "Room",
      dataIndex: "Room",
      width: "35%",
      render: (text, h) => (
        <span
          style={{ color: "#1e88e5", cursor: "pointer" }}
          onClick={() => tryBtn(h)}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Product",
      dataIndex: "Product",
      width: "45%",
    },
    {
      title: "Date",
      dataIndex: "Date",
      width: "20%",
    },
  ];

  const tryBtn = (e) => {
    setSelectedTrans(e.data);
    setShowGuest({ action: "update", value: true });
  };

  trans.sort(function (a, b) {
    return new Date(b.createdDate) - new Date(a.createdDate);
  });

  const data = [];

  trans.map((n, i) => {
    let lbl = "";
    const { name } = n.reservationHeader.reservationType;
    if (name === "Restaurant" || name === "Day Tour" || name === "Night Tour") {
      let typeName = name;
      if (typeName === "Restaurant") typeName = "Resto";
      lbl = typeName + " - " + n.reservationHeader.customer.firstName;
    } else lbl = n.reservationRoomLine.room.roomLongName;

    return data.push({
      key: i + n._id,
      Room: lbl,
      data: n,
      Product: n.product.longName,
      Date: moment(n.createdDate).format("MM-DD-YY"),
    });
  });

  if (!visible) return null;

  const onSuccessRequestApproval = (obj) => {
    const { discountId, netDiscount, seniorPax, transId, discount, isAdmin } =
      obj;

    const reqsx = [...trans];
    const index = reqsx.findIndex((x) => x._id === transId);
    reqsx[index] = { ...reqsx[index] };

    reqsx[index].discountId = discountId;
    reqsx[index].seniorPax = seniorPax;
    reqsx[index].netDiscount = netDiscount;
    reqsx[index].discount = discount;
    if (!isAdmin) reqsx[index].approvalStatus = 1;
    setTrans(reqsx);
  };

  const onSuccessDelete = (obj) => {};

  return (
    <>
      <ReservationDetailsTransactionUpdateModal
        onSuccessRequestApproval={onSuccessRequestApproval}
        onVisible={setShowGuest}
        visible={showGuest}
        selectedTrans={selectedTrans}
        onSuccessDelete={onSuccessDelete}
        isTrans={false}
        isFromCommerce={true}
      />
      <Modal
        title="My Transactions"
        centered
        visible={visible}
        onOk={() => setOnVisible(false)}
        onCancel={() => setOnVisible(false)}
        footer={null}
      >
        <Table
          columns={columns}
          className="db-cl-body__table"
          dataSource={data}
          size="small"
          pagination={{ pageSize: 8 }}
          scroll={{ y: 400 }}
          footer={null}
        />
      </Modal>
    </>
  );
};

export default CommerceTransaction;
