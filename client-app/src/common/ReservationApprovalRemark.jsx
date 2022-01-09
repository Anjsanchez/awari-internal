import { Modal } from "antd";
import MDialog from "./MDialog";
import AInput from "./antd/AInput";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import "./css/ReservationApprovalRemark.css";
import MaterialButton from "./MaterialButton";
import { ButtonGroup } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { store } from "../utils/store/configureStore";
import { PostCreateTransApproval } from "./../utils/services/pages/reservation/ReservationTrans";
import { PostCreateRoomLinesApproval } from "../utils/services/pages/reservation/ReservationLines";
import { PostCreatePaymentApproval } from "./../utils/services/pages/reservation/ReservationPayment";
import { PostCreateHeaderLinesApproval } from "../utils/services/pages/reservation/ReservationHeader";

const ReservationApprovalRemark = ({
  visible,
  onVisible,
  onCancel,
  onCancelWholeDialog,
  values,
  onSuccessRequestApproval,
  approvalType = "payment",
  isFromCommerce = false,
}) => {
  const [remark, setRemark] = useState("");
  const [error, setError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [askConfirmation, setAskConfirmation] = useState(false);

  const storeS = useSelector((state) => state.entities.createReservation.rooms);
  const handleRemarkChange = (e) => setRemark(e.target.value);
  const handleDialogCancel = () => setAskConfirmation(false);

  const handleValidate = () => {
    if (!remark.trim()) return setError("Remark is a required field");
    else setError(false);

    setAskConfirmation(true);
  };

  useEffect(() => {
    setRemark("");
  }, [visible]);
  const setObjDbModelPayment = () => {
    const currentUser = store.getState().entities.user.user;

    return {
      transId: values.id,
      approvalType: approvalType,
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

  const setObjDbModelTrans = () => {
    const currentUser = store.getState().entities.user.user;

    let transId = 0;
    let discId = null;

    if (visible.action === "MODIFY") {
      transId = values.transId;
      discId = values.discountId;
    } else {
      if (isFromCommerce) transId = values.transId;

      if (!isFromCommerce) {
        if (values.discount !== null) discId = values.discount._id;
        transId = values._id;
      }
    }

    return {
      transId: transId,
      approvalType: approvalType,
      action: visible.action,
      requestedById: currentUser.id,
      remark: remark,
      approvalTrans: {
        discountId: discId,
        seniorPax: values.seniorPax,
        transId: transId,
        netDiscount: values.netDiscount,
        netAmount: values.netAmount,
        grossAmount: values.grossAmount,
      },
    };
  };

  const setObjDbModeRooms = () => {
    const currentUser = store.getState().entities.user.user;

    const discId = storeS.discount._id === 0 ? null : storeS.discount._id;

    return {
      transId: values.rooms.id,
      approvalType: approvalType,
      action: visible.action,
      requestedById: currentUser.id,
      remark: remark,
      approvalRoom: {
        startDate: storeS.selectedStartDate.date,
        endDate: storeS.selectedEndDate.date,
        discountId: discId,
        roomId: storeS.selectedStartDate.room._id,
        grossAmount:
          storeS.amountPrice.grossAmount + storeS.addOns.mattress * 2420,
        totalDiscount: storeS.amountPrice.netDiscount,
        totalAmount: storeS.amountPrice.netAmount,
        adultPax: storeS.heads.adult,
        seniorPax: storeS.heads.senior,
        childrenPax: storeS.heads.children,
        mattress: storeS.addOns.mattress,
        remark: storeS.addOns.remarks,
        roomPricingId: storeS.amountPrice.paymentId,
      },
    };
  };

  const setObjDbModelHeader = () => {
    const currentUser = store.getState().entities.user.user;

    return {
      transId: values.header._id,
      approvalType: approvalType,
      action: visible.action,
      requestedById: currentUser.id,
      remark: remark,
      approvalHeader: {
        customerId: values.header.customer._id,
        voucher: values.header.voucher,
        agency: values.header.agency,
        reservationTypeId: values.header.reservationType._id,
        userId: values.header.user.id,
        createdDate: values.header.createdDate,
      },
    };
  };

  const handleDialogOkay = async () => {
    setIsLoading(true);
    setAskConfirmation(false);
    let obj = {};

    try {
      if (approvalType === "payment") {
        await PostCreatePaymentApproval(setObjDbModelPayment())
          .catch((a) => setIsLoading(false))
          .finally((b) => setIsLoading(false));
      }
      if (approvalType === "trans") {
        obj = setObjDbModelTrans();
        await PostCreateTransApproval(obj)
          .catch((a) => setIsLoading(false))
          .finally((b) => setIsLoading(false));
      }
      if (approvalType === "rooms") {
        obj = setObjDbModeRooms();
        await PostCreateRoomLinesApproval(obj).finally((b) =>
          setIsLoading(false)
        );
      }
      if (approvalType === "headers") {
        obj = setObjDbModelHeader();
        await PostCreateHeaderLinesApproval(obj)
          .catch((a) => setIsLoading(false))
          .finally((b) => setIsLoading(false));
      }

      setTimeout(() => {
        onCancel();
        onCancelWholeDialog();
        onSuccessRequestApproval(obj);
        enqueueSnackbar("Successfully updated records!", {
          variant: "success",
        });
      }, 50);
    } catch (ex) {
      if ((ex && ex.status === 400) || ex.status === 404)
        enqueueSnackbar("0039: " + ex.data, { variant: "error" });
    } finally {
      setIsLoading(false);
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
            disabled={isLoading}
            onClick={onCancel}
            size="small"
            color="secondary"
            text="CANCEL"
          />

          <MaterialButton
            disabled={isLoading}
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
