import { Modal } from "antd";
import MDialog from "./MDialog";
import AInput from "./antd/AInput";
import React, { useState } from "react";
import { useSnackbar } from "notistack";
import "./css/ReservationApprovalRemark.css";
import MaterialButton from "./MaterialButton";
import { ButtonGroup } from "@material-ui/core";
import { store } from "../utils/store/configureStore";
import { PostCreatePaymentApproval } from "./../utils/services/pages/reservation/ReservationPayment";

const ReservationApprovalRemark = ({
  visible,
  onVisible,
  onCancel,
  onCancelWholeDialog,
  values,
  onSuccessRequestApproval,
}) => {
  const [remark, setRemark] = useState("");
  const [error, setError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [askConfirmation, setAskConfirmation] = useState(false);

  const handleRemarkChange = (e) => setRemark(e.target.value);
  const handleDialogCancel = () => setAskConfirmation(false);

  const handleValidate = () => {
    if (!remark.trim()) return setError("Remark is a required field");
    else setError(false);

    setAskConfirmation(true);
  };

  const setObjDbModel = () => {
    const currentUser = store.getState().entities.user.user;

    return {
      transId: values.id,
      approvalType: "payment",
      action: visible.action,
      requestedById: currentUser.id,
      remark: remark,
      approvalPayment: {
        _id: values.id,
        type: values.remark,
        amount: values.amount,
        paymentId: values.key,
        paymentRefNum: values.referenceNumber,
        userId: values.userId,
        createdDate: values.createdDate,
      },
    };
  };

  const handleDialogOkay = async () => {
    setAskConfirmation(false);

    try {
      const obj = setObjDbModel();

      await PostCreatePaymentApproval(obj);

      setTimeout(() => {
        onCancel();
        onCancelWholeDialog();
        onSuccessRequestApproval(obj);
        enqueueSnackbar("Successfully updated records!", {
          variant: "success",
        });
      }, 50);
    } catch (ex) {
      enqueueSnackbar("0039: An error occured while calling the server.", {
        variant: "error",
      });
    } finally {
    }
  };

  const Footer = () => {
    return (
      <div>
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="text primary button group"
        >
          <MaterialButton
            onClick={onCancel}
            size="small"
            color="secondary"
            text="CANCEL"
          />

          <MaterialButton
            size="small"
            onClick={handleValidate}
            text={visible.action}
          />
        </ButtonGroup>
      </div>
    );
  };

  return (
    <Modal
      title="Approval Request"
      centered
      visible={visible.value}
      onOk={onVisible}
      onCancel={onCancel}
      footer={<Footer />}
    >
      {askConfirmation && (
        <MDialog
          openDialog={askConfirmation}
          handleClose={handleDialogCancel}
          handleOk={handleDialogOkay}
        />
      )}
      <div className="rar-container">
        <div className="remark__container">
          <div className="remark__wrapper">
            <div className="header-label__wrapper rar">
              <label>ACTION</label>
            </div>
            <div className="remark-input__wrapper">{visible.action}</div>
          </div>
        </div>

        <AInput
          label="REMARK"
          id="amount"
          multiline={true}
          errors={error}
          values={remark}
          handleChange={handleRemarkChange}
        />
      </div>
    </Modal>
  );
};

export default ReservationApprovalRemark;
