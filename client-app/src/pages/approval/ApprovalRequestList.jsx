import moment from "moment";
import { Card, Table } from "antd";
import React, { useState } from "react";
import ApprovalRequestModal from "./ApprovalRequestModal";
import ActiveButton from "./../../common/form/ActiveButton";
import GetApprovalStatus from "../../common/GetApprovalStatus";

const ApprovalRequestList = ({ approvalRequests, onUpdateApprovals }) => {
  const [visible, setVisible] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const spanOnClick = (e) => {
    setVisible(true);
    setSelectedData(e.data);
  };

  const columns = [
    {
      title: "Status",
      dataIndex: "Status",
      width: "5%",
      render: (text, h) => (
        <GetApprovalStatus
          status={h.statusInt}
          onClick={() => spanOnClick(h)}
        />
      ),
    },
    {
      title: "Requester",
      dataIndex: "Requester",
      width: "20%",
    },
    {
      title: "Request Date",
      dataIndex: "RequestDate",
      width: "15%",
    },
    {
      title: "Approver",
      dataIndex: "Approver",
      width: "20%",
    },
    {
      title: "Approved Date",
      dataIndex: "ApprovedDate",
      width: "15%",
    },
  ];

  const renderStatus = (n) => {
    if (n === 1) return "Pending";
    if (n === 2) return "Approved";
    if (n === 3) return "Rejected";
  };

  const data = [];
  approvalRequests.map((n, i) => {
    return data.push({
      data: n,
      key: n._id,
      statusInt: n.status,
      Status: renderStatus(n.status),
      Requester: n.requestedBy.firstName + " " + n.requestedBy.lastName[0],
      RequestDate: moment(n.requestedDate).format("MM-DD-YY"),
      Approver:
        n.approvedBy !== null &&
        n.approvedBy.firstName + " " + n.approvedBy.lastName[0],
      ApprovedDate:
        n.approvedBy !== null && moment(n.approvedDate).format("MM-DD-YY"),
    });
  });

  return (
    <div>
      <ApprovalRequestModal
        visible={visible}
        onCancel={() => setVisible(!visible)}
        selectedData={selectedData}
        onUpdateApprovals={onUpdateApprovals}
      />
      <Card className="db-card-list__wrapper" hoverable>
        <div className="db-cl-span__wrapper">
          <span className="db-cl__span">Room Transactions</span>
          <span className="db-cl__span">
            <ActiveButton textTrue={approvalRequests.length} value={true} />
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
    </div>
  );
};

export default ApprovalRequestList;
