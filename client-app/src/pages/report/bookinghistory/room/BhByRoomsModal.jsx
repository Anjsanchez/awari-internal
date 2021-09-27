import React from "react";
import moment from "moment";
import { Modal, Table } from "antd";

const BhByRoomsModal = ({ showModal, setShowModal, trans, prodId }) => {
  const columns = [
    {
      title: "Customer",
      dataIndex: "Customer",
      width: "40%",
      //   render: (text, h) => <a onClick={() => tryBtn(h)}>{text}</a>,
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

  const filtered = trans.filter((n) => n.room._id === prodId);
  filtered.sort(function (a, b) {
    return new Date(b.createdDate) - new Date(a.createdDate);
  });

  const data = [];
  filtered.map((n, i) => {
    return data.push({
      key: i + n.room._id,
      roomId: n.room._id,
      Reservation: n.transHeader.reservationType.name,
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

export default BhByRoomsModal;