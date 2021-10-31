import { useSnackbar } from "notistack";
import { useState, useEffect, useRef } from "react";
import { store } from "../../../../../../utils/store/configureStore";
import { writeToken } from "../../../../../../utils/store/pages/users";
import {
  deleteReservationPayment,
  saveReservationPayment,
} from "../../../../../../utils/services/pages/reservation/ReservationPayment";

const UseDetailsPaymentForm = (
  validate,
  headerId,
  onVisible,
  onSuccessEdit,
  onSuccessAdd,
  onSuccessDelete,
  visible
) => {
  //..
  const didMount = useRef(false);
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [askConfirmation, setAskConfirmation] = useState(false);
  const [askConfirmationApproval, setAskConfirmationApproval] = useState({
    value: false,
    action: "DELETE",
  });
  const [isRequestOnGoing, setIsRequestOnGoing] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const currentUser = store.getState().entities.user.user;

  const [values, setValues] = useState({
    id: "",
    name: "",
    key: "",
    isNeedRefNumber: false,
    referenceNumber: "",
    amount: "",
    remark: "",
    createdBy: "",
    createdDate: "",
    approvalStatus: 0,
    paymentId: "",
    userId: "",
  });

  const handleValueOnLoad = (payment) => {
    setValues({
      isNeedRefNumber: payment.payment.isNeedRefNumber || false,
      amount: payment.amount || "",
      remark: payment.type || "",
      approvalStatus: payment.approvalStatus || 0,
      referenceNumber: payment.paymentRefNum || "",
      name: payment.payment.name || "",
      paymentId: payment.payment._id || "",
      userId: payment.user.id || "",
      id: payment._id || "",
      key: payment.payment._id || "",
      createdDate: payment.createdDate || "",
      createdBy: payment.user.firstName + " " + payment.user.lastName || "",
    });
  };

  const handleResetValue = (payment) => {
    setValues({
      isNeedRefNumber: false,
      amount: "",
      remark: "",
      referenceNumber: "",
      name: "",
      id: "",
      createdDate: "",
      createdBy: "",
    });
  };

  const setObjDbModel = () => {
    return {
      id: values.id,
      reservationHeaderId: headerId,
      type: values.remark,
      amount: values.amount,
      paymentId: values.key,
      paymentRefNum: values.referenceNumber,
      userId: currentUser.id,
    };
  };

  const handleDialogProceed = async () => {
    //
    setAskConfirmation(false);
    setIsRequestOnGoing(true);
    try {
      const obj = setObjDbModel();
      const { data } = await saveReservationPayment(obj);
      const { token, singleRecord } = data;
      store.dispatch(writeToken({ token }));

      setTimeout(() => {
        setIsRequestOnGoing(false);
        enqueueSnackbar("Successfully updated records!", {
          variant: "success",
        });

        onVisible({ value: false, action: "cancel" });

        if (obj.id) return onSuccessEdit(singleRecord);
        return onSuccessAdd(singleRecord);
      }, 500);
    } catch (ex) {
      if (ex && ex.status === 400)
        enqueueSnackbar("0059: " + ex.data, { variant: "error" });
    } finally {
    }
  };

  const executeDeleteAction = async () => {
    //
    setAskConfirmation(false);
    setIsRequestOnGoing(true);
    try {
      const obj = setObjDbModel();
      const { data } = await deleteReservationPayment(obj.id);
      const { token, singleRecord } = data;
      store.dispatch(writeToken({ token }));

      setTimeout(() => {
        setIsRequestOnGoing(false);
        enqueueSnackbar("Successfully deleted the record!", {
          variant: "success",
        });

        onVisible({ value: false, action: "cancel" });

        onSuccessDelete(singleRecord);
      }, 500);
    } catch (ex) {
      if (ex && ex.status === 400)
        enqueueSnackbar("0060: " + ex.data, { variant: "error" });
    } finally {
    }
  };

  const onDecideOfAction = async () =>
    isDelete ? executeDeleteAction() : handleDialogProceed();

  const handleChange = (e, hey) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleChangeInput = (value, e) => {
    const isNeedRefvalue = e.isneedrefnumber === "false" ? false : true;

    setValues((n) => ({
      ...n,
      name: e.value,
      key: e.key,
      referenceNumber: "",
      isNeedRefNumber: isNeedRefvalue,
    }));
  };

  useEffect(() => {
    //..
    async function doSubmit() {
      //..
      if (!didMount.current) {
        didMount.current = true;
        return;
      }

      if (Object.keys(errors).length === 0) {
        setIsDelete(false);
        setAskConfirmation(true);
      }
    }
    doSubmit();
    // eslint-disable-next-line
  }, [errors]);

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsDelete(true);

    if (currentUser.role.rolename !== "Administrator")
      return setAskConfirmationApproval({
        action: "DELETE",
        value: true,
      });

    setAskConfirmation(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (visible.action !== "add")
      if (currentUser.role.rolename !== "Administrator")
        return setAskConfirmationApproval({
          action: "MODIFY",
          value: true,
        });

    setErrors(validate(values));
  };

  const handleDialogCancel = () => {
    if (visible.action !== "add")
      setAskConfirmationApproval({
        action: "DELETE",
        value: false,
      });
    setAskConfirmation(false);
  };
  return {
    handleChange,
    handleDelete,
    values,
    handleSubmit,
    handleChangeInput,
    errors,
    handleValueOnLoad,
    onDecideOfAction,
    askConfirmation,
    isRequestOnGoing,
    handleResetValue,
    handleDialogCancel,
    askConfirmationApproval,
  };
};

export default UseDetailsPaymentForm;
