import { Card } from "antd";
import React, { useState } from "react";
import { List } from "@material-ui/core";
import AListItem from "./../../common/antd/AListItem";
import ApprovalRequestModal from "./ApprovalRequestModal";
import ActiveButton from "./../../common/form/ActiveButton";

const ApprovalRequestPendings = ({ pendings, onUpdateApprovals }) => {
  const [visible, setVisible] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const renderAction = (e) => {
    const { action, approvalType } = e;
    let returnText = "";
    let type = "Payment";

    if (approvalType === 1) type = "Room";
    if (approvalType === 2) type = "Transaction";
    if (approvalType === 3) type = "Header";

    if (action === 0) returnText = "Delete - " + type;
    else if(action === 2) returnText = "Add - " + type;
    else returnText = "Modify - " + type;
    return (
      <span className="arp__span" onClick={() => spanOnClick(e)}>
        {returnText}
      </span>
    );
  };

  const spanOnClick = (e) => {
    setVisible(true);
    setSelectedData(e);
  };

  return (
    <>
      <ApprovalRequestModal
        visible={visible}
        onCancel={() => setVisible(!visible)}
        selectedData={selectedData}
        onUpdateApprovals={onUpdateApprovals}
      />
      <Card className="db-card-list__wrapper arp" hoverable>
        <div className="db-cl-span__wrapper">
          <span className="db-cl__span">Pending Approvals</span>
          <span className="db-cl__span">
            <ActiveButton textTrue={pendings.length} value={true} />
          </span>
        </div>
        <div className="db-cl-body__container arp">
          <List component="nav" aria-label="mailbox folders">
            {pendings.map((d) => (
              <AListItem
                key={d._id}
                txtLbl={renderAction(d)}
                txtValue={
                  d.requestedBy.firstName + " " + d.requestedBy.lastName[0]
                }
              />
            ))}
          </List>
        </div>
      </Card>
    </>
  );
};

export default ApprovalRequestPendings;
