import moment from "moment";
import { Select } from "antd";
import { Modal, Divider } from "antd";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import "../css/ReservationDetailsPaymentModal.css";
import MDialog from "./../../../../../common/MDialog";
import { makeStyles } from "@material-ui/core/styles";
import AInput from "./../../../../../common/antd/AInput";
import { ButtonGroup, List, ListItem } from "@material-ui/core";
import { store } from "../../../../../utils/store/configureStore";
import ActiveButton from "../../../../../common/form/ActiveButton";
import { writeToken } from "../../../../../utils/store/pages/users";
import MaterialButton from "./../../../../../common/MaterialButton";
import ScheduleTwoToneIcon from "@material-ui/icons/ScheduleTwoTone";
import UseDetailsPaymentForm from "./validation/UseDetailsPaymentForm";
import GetApprovalStatus from "./../../../../../common/GetApprovalStatus";
import AssignmentIndTwoToneIcon from "@material-ui/icons/AssignmentIndTwoTone";
import RDetailsPaymentFormValidate from "./validation/RDetailsPaymentFormValidate";
import { getPayments } from "./../../../../../utils/services/pages/functionality/PaymentService";
import ReservationApprovalRemark from "./../../../../../common/ReservationApprovalRemark";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    fontSize: "14px",
  },
  actionsContainer: {},
  resetContainer: {},
  button__wrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
  labelSpan: {
    fontWeight: 400,
    fontSize: "15px",
    fontFamily: `"Poppins", sans-serif`,
  },
}));

const ReservationDetailsPaymentModal = (props) => {
  const classes = useStyles();
  const {
    onVisible,
    visible,
    headerId,
    onSuccessEdit,
    onSuccessAdd,
    selectedPayment,
    onSuccessDelete,
    onSuccessRequestApproval,
  } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [reservationTypes, setReservationTypes] = useState([]);

  const {
    askConfirmation,
    handleChange,
    values,
    handleChangeInput,
    handleSubmit,
    errors,
    isRequestOnGoing,
    handleDelete,
    handleValueOnLoad,
    onDecideOfAction,
    handleResetValue,
    handleDialogCancel,
    askConfirmationApproval,
  } = UseDetailsPaymentForm(
    RDetailsPaymentFormValidate,
    headerId,
    onVisible,
    onSuccessEdit,
    onSuccessAdd,
    onSuccessDelete,
    visible
  );

  useEffect(() => {
    async function populateReservationTypes() {
      try {
        const { data } = await getPayments();

        const { token, listRecords } = data;

        const sortedPayment = listRecords.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        store.dispatch(writeToken({ token }));

        setReservationTypes(sortedPayment);
      } catch (error) {
        enqueueSnackbar("0030: An error occured in the server.", {
          variant: "error",
        });
      }
    }

    populateReservationTypes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (visible.action === "add") return handleResetValue();
    if (selectedPayment.length === 0) return;
    if (visible.action === "update") return handleValueOnLoad(selectedPayment);
  }, [visible.action]); // eslint-disable-line react-hooks/exhaustive-deps

  const conditionA = () => {
    if (!values.isNeedRefNumber) return null;

    return (
      <AInput
        label="REFERENCE NUMBER"
        id="referenceNumber"
        errors={errors.referenceNumber}
        values={values.referenceNumber}
        handleChange={handleChange}
      />
    );
  };

  const renderUserInfo = () => {
    if (visible.action !== "update") return null;

    if (selectedPayment.length === 0) return null;

    return (
      <>
        <List component="nav" aria-label="mailbox folders">
          <ListItem button className="reservationDetails-body__span__wrapper">
            <AssignmentIndTwoToneIcon className="reservationDetails-body__span__icon" />
            <span className="reservationDetails-body__span__label">
              Created By
            </span>
            <span className="reservationDetails-body__span__detail">
              {values.createdBy}
            </span>
          </ListItem>
          <Divider className="paymentModalVoucher__divider" />
          <ListItem button className="reservationDetails-body__span__wrapper">
            <ScheduleTwoToneIcon className="reservationDetails-body__span__icon" />
            <span className="reservationDetails-body__span__label">
              Created Date
            </span>
            <span className="reservationDetails-body__span__detail">
              {moment(values.createdDate).format("YYYY-MM-DD hh:mm A")}
            </span>
          </ListItem>
          {values.approvalStatus !== 0 && (
            <ListItem button className="reservationDetails-body__span__wrapper">
              <span className="reservationDetails-body__span__label">
                Approval Status
              </span>
              <span className="reservationDetails-body__span__detail">
                <GetApprovalStatus status={values.approvalStatus} />
              </span>
            </ListItem>
          )}
        </List>
      </>
    );
  };

  const renderErrorSpan = () => {
    if (visible.action === "add") return null;

    if (visible.action !== "add") if (selectedPayment.length !== 0) return null;

    return (
      <div className="errorSpan">
        <ActiveButton
          value={false}
          textFalse="Please select a row to modify."
        />
      </div>
    );
  };
  const ModalContent = () => {
    return (
      <div className="paymentModalVoucher__container">
        <div className="reservationtype-container">
          <div className="header-label__wrapper">
            <label htmlFor="name">PAYMENT TYPE</label>
          </div>
          <Select
            id="name"
            key="name"
            name="name"
            className="reservationtype__select"
            showSearch
            placeholder="Select a payment"
            optionFilterProp="children"
            onChange={handleChangeInput}
            value={values.name}
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {reservationTypes.map((n) => (
              <Select.Option
                value={n.name}
                values={n.name}
                key={n._id}
                isneedrefnumber={n.isNeedRefNumber.toString().toLowerCase()}
              >
                {n.name}
              </Select.Option>
            ))}
          </Select>
          <div className="rdp-textField__wrapper">
            {conditionA()}
            <AInput
              label="REMARK"
              id="remark"
              errors={errors.remark}
              values={values.remark}
              handleChange={handleChange}
            />
            <AInput
              label="AMOUNT"
              id="amount"
              type="number"
              errors={errors.amount}
              values={values.amount}
              handleChange={handleChange}
            />
          </div>
          {renderUserInfo()}

          {renderErrorSpan()}
        </div>
      </div>
    );
  };

  const Footer = () => {
    const isAdd = visible.action === "add" ? true : false;
    const btnTextValue = isAdd ? "CREATE" : "MODIFY";

    if (visible.action !== "add") if (selectedPayment.length === 0) return null;

    if (values.approvalStatus === 1) return null;
    return (
      <div>
        <ButtonGroup
          className={classes.button}
          variant="text"
          color="primary"
          aria-label="text primary button group"
        >
          {!isAdd && !isRequestOnGoing && (
            <MaterialButton
              onClick={handleDelete}
              className={classes.button}
              size="small"
              color="secondary"
              text="DELETE"
            />
          )}
          <MaterialButton
            size="small"
            className={classes.button}
            onClick={handleSubmit}
            disabled={isRequestOnGoing}
            text={btnTextValue}
          />
        </ButtonGroup>
      </div>
    );
  };
  return (
    <>
      <ReservationApprovalRemark
        visible={askConfirmationApproval}
        onSuccessRequestApproval={onSuccessRequestApproval}
        onCancel={handleDialogCancel}
        onCancelWholeDialog={() =>
          onVisible({ value: false, action: "cancel" })
        }
        values={values}
      />
      {askConfirmation && (
        <MDialog
          openDialog={askConfirmation}
          handleClose={handleDialogCancel}
          handleOk={onDecideOfAction}
        />
      )}

      <Modal
        title="Payment"
        centered
        visible={visible.value}
        onOk={onVisible}
        onCancel={() => onVisible({ value: false, action: "cancel" })}
        footer={<Footer />}
      >
        {ModalContent()}
      </Modal>
    </>
  );
};

export default ReservationDetailsPaymentModal;
