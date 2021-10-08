import "./css/ApprovalRequest.css";
import { useSnackbar } from "notistack";
import { useMountedState } from "react-use";
import SpinLoader from "./../../common/Spin";
import React, { useState, useEffect } from "react";
import ApprovalRequestBody from "./ApprovalRequestBody";
import BookingHistoryHeader from "./../report/Common/BookingHistoryHeader";
import { GetRequestApprovals } from "./../../utils/services/pages/approvals/RequestApprovalService";

const ApprovalRequest = () => {
  const isMounted = useMountedState();
  const { enqueueSnackbar } = useSnackbar();
  const [initialLoadForm, setInitialLoadForm] = useState(false);
  const [approvalRequests, setApprovalRequests] = useState([]);

  useEffect(() => {
    //..

    async function fetchApprovals() {
      try {
        const { data } = await GetRequestApprovals();
        const { listRecords } = data;

        if (!isMounted()) return;

        setInitialLoadForm(true);
        setApprovalRequests(listRecords);
      } catch (error) {
        enqueueSnackbar("0038: An error occured while calling the server.", {
          variant: "error",
        });
      }
    }

    fetchApprovals();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onUpdateApprovals = (obj) => {
    const reqsx = [...approvalRequests];
    const index = reqsx.findIndex((x) => x._id === obj.data._id);

    reqsx[index] = { ...reqsx[index] };
    reqsx[index].approvedBy = obj.data.approvedBy;
    reqsx[index].approvedDate = obj.data.approvedDate;
    reqsx[index].status = obj.data.status;

    setApprovalRequests(reqsx);
  };

  const renderBody = () => {
    if (!initialLoadForm) {
      return <SpinLoader />;
    }

    return (
      <ApprovalRequestBody
        onUpdateApprovals={onUpdateApprovals}
        approvalRequests={approvalRequests}
      />
    );
  };

  return (
    <>
      <BookingHistoryHeader title="Approval Request" />

      {renderBody()}
    </>
  );
};

export default ApprovalRequest;
