import React from "react";
import { Modal, Table } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

const BhByTransModal = ({ showModal, setShowModal, trans, prodId }) => {
  const columns = [
    {
      title: "Customer",
      dataIndex: "Customer",
      width: "40%",
      render: (text, h) => (
        <Link
          to={`/a/reservation-management/reservations/${h.headerId}&istrans=true`}
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Room",
      dataIndex: "Room",
      width: "40%",
    },
    {
      title: "Date",
      dataIndex: "Date",
      width: "20%",
    },
  ];

  const filtered = trans.filter((n) => n.product._id === prodId);
  filtered.sort(function (a, b) {
    return new Date(b.createdDate) - new Date(a.createdDate);
  });

  const data = [];
  filtered.map((n, i) => {
    const room =
      n.transRoom === null
        ? n.transHeader.reservationType.name
        : n.transRoom.room.roomLongName;
    return data.push({
      key: i + n.product._id,
      headerId: n.transHeader._id,
      productId: n.product._id,
      Room: room,
      Customer:
        n.transHeader.customer.firstName +
        " " +
        n.transHeader.customer.lastName,
      Date: moment(n.createdDate).format("MM-DD-YY"),
    });
  });

  return (
    <>
      <Modal
        title="Transactions"
        centered
        visible={showModal}
        // onOk={onVisible}
        onCancel={() => setShowModal(!showModal)}
        // footer={<Footer />}
      >
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
      </Modal>
    </>
  );
};

export default BhByTransModal;
