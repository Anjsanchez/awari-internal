import { Modal } from "antd";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import MDialog from "./../../common/MDialog";
import PaymentBody from "./body/PaymentBody";
import { ButtonGroup } from "@material-ui/core";
import { store } from "../../utils/store/configureStore";
import MaterialButton from "./../../common/MaterialButton";
import { updateApprovalPayment } from "../../utils/services/pages/approvals/ApprovalPaymentService";
import TransBody from "./body/TransBody";
import { updateApprovalTrans } from "../../utils/services/pages/approvals/ApprovalTransService";
import RoomBody from "./body/RoomBody";
import { updateApprovalRoom } from "../../utils/services/pages/approvals/ApprovalRoomService";
import HeaderBody from "./body/HeaderBody";
import { updateApprovalHeader } from "../../utils/services/pages/approvals/ApprovalHeaderService";

const ApprovalRequestModal = ({
  visible,
  onCancel,
  selectedData,
  onUpdateApprovals,
}) => {
  const [action, setAction] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [askDialog, setAskDialog] = useState(false);
  const [askConfirmation, setAskConfirmation] = useState(false);

  const viewMdlObj = () => {
    const { user } = store.getState().entities.user;

    return {
      id: selectedData._id,
      action: action,
      userId: user.id,
    };
  };

  const handleUpdatePayment = async () => {
    const obj = viewMdlObj();
    setIsLoading(true);
    try {
      const { data } = await updateApprovalPayment(obj)
        .catch((a) => setIsLoading(false))
        .finally((b) => setIsLoading(false));

      enqueueSnackbar("Successfully update records.", {
        variant: "success",
      });

      setAskConfirmation(false);
      setAskDialog(false);

      setTimeout(() => {
        const returnObj = {
          _id: selectedData._id,
          action: action,
          data: data,
        };
        onUpdateApprovals(returnObj);
      }, 100);
      onCancel();
    } catch (error) {
      enqueueSnackbar("0041: An error occured.", {
        variant: "error",
      });
    } finally {
    }
  };

  const handleUpdateTrans = async () => {
    const obj = viewMdlObj();
    setIsLoading(true);
    try {
      const { data } = await updateApprovalTrans(obj);

      enqueueSnackbar("Successfully update records.", {
        variant: "success",
      });

      setAskConfirmation(false);
      setAskDialog(false);

      setTimeout(() => {
        const returnObj = {
          _id: selectedData._id,
          action: action,
          data: data,
        };
        onUpdateApprovals(returnObj);
      }, 100);
      onCancel();
    } catch (error) {
      enqueueSnackbar("0041: An error occured.", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateHeader = async () => {
    const obj = viewMdlObj();
    setIsLoading(true);

    try {
      const { data } = await updateApprovalHeader(obj);

      enqueueSnackbar("Successfully update records.", {
        variant: "success",
      });

      setAskConfirmation(false);
      setAskDialog(false);

      setTimeout(() => {
        const returnObj = {
          _id: selectedData._id,
          action: action,
          data: data,
        };
        onUpdateApprovals(returnObj);
      }, 100);
      onCancel();
    } catch (error) {
      enqueueSnackbar("0048: An error occured.", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateRoom = async () => {
    const obj = viewMdlObj();
    setAskConfirmation(false);
    setAskDialog(false);
    setIsLoading(true);
    try {
      const { data } = await updateApprovalRoom(obj);

      enqueueSnackbar("Successfully update records.", {
        variant: "success",
      });

      setTimeout(() => {
        const returnObj = {
          _id: selectedData._id,
          action: action,
          data: data,
        };
        onUpdateApprovals(returnObj);
      }, 100);
      onCancel();
    } catch (ex) {
      if ((ex && ex.status === 400) || ex.status === 404)
        enqueueSnackbar("0073: " + ex.data, { variant: "error" });
    } finally {
      setIsLoading(false);
      setAskDialog(false);
    }
  };

  const Footer = () => {
    if (selectedData.approvedBy !== null) return null;

    const handleReject = () => {
      setAction("rejected");
      setAskDialog(true);
    };
    const handleApprove = () => {
      setAction("approved");
      setAskDialog(true);
    };

    return (
      <div>
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="text primary button group"
        >
          <MaterialButton
            disabled={isLoading}
            onClick={handleReject}
            size="small"
            color="secondary"
            text="REJECT"
          />
          <MaterialButton
            disabled={isLoading}
            size="small"
            onClick={handleApprove}
            text="APPROVE"
          />
        </ButtonGroup>
      </div>
    );
  };

  const renderBody = () => {
    if (selectedData.approvalType === 0)
      return <PaymentBody selectedData={selectedData} />;
    if (selectedData.approvalType === 1)
      return <RoomBody selectedData={selectedData} />;
    if (selectedData.approvalType === 2)
      return <TransBody selectedData={selectedData} />;
    if (selectedData.approvalType === 3)
      return <HeaderBody selectedData={selectedData} />;
    return null;
  };

  const handleDialogProceed = () => {
    if (selectedData.approvalType === 0) return handleUpdatePayment();
    if (selectedData.approvalType === 1) return handleUpdateRoom();
    if (selectedData.approvalType === 2) return handleUpdateTrans();
    if (selectedData.approvalType === 3) return handleUpdateHeader();
  };

  return (
    <>
      {askDialog && (
        <MDialog
          openDialog={askDialog}
          handleClose={() => setAskDialog(!askDialog)}
          handleOk={handleDialogProceed}
        />
      )}
      <Modal
        title="Approval Request"
        centered
        visible={visible}
        onCancel={onCancel}
        footer={<Footer />}
      >
        {askConfirmation && (
          <MDialog
            openDialog={askConfirmation}
            handleClose={() => setAskConfirmation(false)}
          />
        )}
        <div className="rar-container arm">{renderBody()}</div>
      </Modal>
    </>
  );
};

export default ApprovalRequestModal;
