import { useSnackbar } from "notistack";
import { useState, useEffect, useRef } from "react";
import { store } from "../../../../../../utils/store/configureStore";
import { writeToken } from "../../../../../../utils/store/pages/users";
import {
  deleteReservationPayment,
  saveReservationPayment,
} from "../../../../../../utils/services/pages/reservation/ReservationPayment";

const UseDetailsRoomForm = (
  validate,
  headerId,
  onVisible,
  onSuccessEdit,
  onSuccessAdd,
  onSuccessDelete
) => {
  //..
  const didMount = useRef(false);
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [askConfirmation, setAskConfirmation] = useState(false);
  const [isRequestOnGoing, setIsRequestOnGoing] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

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
  });

  const handleValueOnLoad = (payment) => {
    setValues({
      isNeedRefNumber: payment.payment.isNeedRefNumber || false,
      amount: payment.amount || "",
      remark: payment.type || "",
      referenceNumber: payment.paymentRefNum || "",
      name: payment.payment.name || "",
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
    const currentUser = store.getState().entities.user.user.id;

    return {
      id: values.id,
      reservationHeaderId: headerId,
      type: values.remark,
      amount: values.amount,
      paymentId: values.key,
      paymentRefNum: values.referenceNumber,
      userId: currentUser,
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
      }, 1000);
    } catch (ex) {
      if (ex && ex.status === 400) {
        enqueueSnackbar(ex.data, { payment: "error" });
      }
      if (ex && ex.status === 500)
        enqueueSnackbar(ex.data, { payment: "error" });
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
      }, 1000);
    } catch (ex) {
      if (ex && ex.status === 400) {
        enqueueSnackbar(ex.data, { payment: "error" });
      }
      if (ex && ex.status === 500)
        enqueueSnackbar(ex.data, { payment: "error" });
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
    setAskConfirmation(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors(validate(values));
  };

  const handleDialogCancel = () => {
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
  };
};

export default UseDetailsRoomForm;
