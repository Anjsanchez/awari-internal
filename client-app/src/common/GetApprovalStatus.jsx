import React from "react";
import ActiveButton from "./form/ActiveButton";

const GetApprovalStatus = ({ status, onClick }) => {
  if (status === 1)
    return (
      <ActiveButton onClick={onClick} isWarning={true} textTrue="Pending" />
    );
  if (status === 2)
    return <ActiveButton onClick={onClick} value={true} textTrue="Approved" />;
  if (status === 3)
    return (
      <ActiveButton onClick={onClick} value={false} textFalse="Rejected" />
    );

  return null;
};

export default GetApprovalStatus;
