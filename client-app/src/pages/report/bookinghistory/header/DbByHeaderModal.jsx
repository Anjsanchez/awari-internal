import React from "react";
import moment from "moment";
import { Modal, Table } from "antd";
import { Link } from "react-router-dom";

const DbByHeaderModal = ({ showModal, setShowModal, trans, prodId }) => {
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
      title: "Reservation",
      dataIndex: "Reservation",
      width: "40%",
    },
    {
      title: "Date",
      dataIndex: "Date",
      width: "20%",
    },
  ];

  const filtered = trans.filter((n) => n.customer._id === prodId);

  filtered.sort(function (a, b) {
    return new Date(b.createdDate) - new Date(a.createdDate);
  });

  const data = [];
  filtered.map((n, i) => {
    return data.push({
      key: i + n._id,
      headerId: n._id,
      Reservation: n.reservationType.name,
      Customer: n.customer.firstName + " " + n.customer.lastName,
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
        footer={<span>Click the record to view the whole transaction</span>}
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

export default DbByHeaderModal;
