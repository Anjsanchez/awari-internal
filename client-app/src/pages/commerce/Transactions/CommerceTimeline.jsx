import moment from "moment";
import React from "react";
import { Modal, Timeline } from "antd";

const CommerceTimeline = ({ visible = false, setOnVisible, trans }) => {
  let lastDate = "";
  const renderBody = (d, i) => {
    let dateLbl = null;

    const newDate = moment(d.createdDate).format("DD-MM-YY hh:mm A");

    if (lastDate !== newDate) {
      dateLbl = newDate;
      lastDate = newDate;
    }

    let lbl = "";
    const { name } = d.reservationHeader.reservationType;
    if (name === "Restaurant" || name === "Day Tour" || name === "Night Tour") {
      lbl = name;
    } else lbl = d.reservationRoomLine.room.roomLongName;

    return (
      <Timeline.Item color="red" label={dateLbl} key={i}>
        {d.product.longName} - {lbl}
      </Timeline.Item>
    );
  };

  if (!visible) return null;

  return (
    <Modal
      title="Transaction Timeline"
      centered
      visible={visible}
      onOk={() => setOnVisible(false)}
      onCancel={() => setOnVisible(false)}
      footer={null}
    >
      <div className="ct-container__wrapper">
        <Timeline mode="left">{trans.map((n, i) => renderBody(n, i))}</Timeline>
      </div>
    </Modal>
  );
};

export default CommerceTimeline;
