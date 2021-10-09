import { Card } from "antd";
import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ApprovalRequestList from "./ApprovalRequestList";
import ApprovalRequestPendings from "./ApprovalRequestPendings";

const ApprovalRequestBody = ({ approvalRequests, onUpdateApprovals }) => {
  const [pendings, setPendings] = useState([]);

  useEffect(() => {
    if (approvalRequests.length === 0) return setPendings([]);

    const pendingOnly = approvalRequests.filter((n) => n.status === 1);
    setPendings(pendingOnly);
  }, [approvalRequests]);

  return (
    <div className="container__wrapper db">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <Card className="db-card__wrapper hlf" hoverable>
                <span className="db-title__span hlf">{pendings.length}</span>
                <span className="db-title__subSpan hlf">
                  Total Pending Approvals
                </span>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <ApprovalRequestList
                onUpdateApprovals={onUpdateApprovals}
                approvalRequests={approvalRequests}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <ApprovalRequestPendings
                  onUpdateApprovals={onUpdateApprovals}
                  pendings={pendings}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ApprovalRequestBody;
