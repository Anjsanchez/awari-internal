import moment from "moment";
import { Modal } from "antd";
import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MDialog from "./../../../../../common/MDialog";
import EcoTwoToneIcon from "@material-ui/icons/EcoTwoTone";
import { ButtonGroup, Grid, List } from "@material-ui/core";
import AListItem from "../../../../../common/antd/AListItem";
import { store } from "../../../../../utils/store/configureStore";
import MaterialButton from "./../../../../../common/MaterialButton";
import ActiveButton from "./../../../../../common/form/ActiveButton";
import ScheduleTwoToneIcon from "@material-ui/icons/ScheduleTwoTone";
import AssignmentIndTwoToneIcon from "@material-ui/icons/AssignmentIndTwoTone";
import MonetizationOnTwoToneIcon from "@material-ui/icons/MonetizationOnTwoTone";
import ShoppingBasketTwoToneIcon from "@material-ui/icons/ShoppingBasketTwoTone";
import ReservationApprovalRemark from "./../../../../../common/ReservationApprovalRemark";
import { deleteTransLine } from "../../../../../utils/services/pages/reservation/ReservationTrans";
import AirlineSeatIndividualSuiteTwoToneIcon from "@material-ui/icons/AirlineSeatIndividualSuiteTwoTone";
import GetApprovalStatus from "./../../../../../common/GetApprovalStatus";

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

const ReservationDetailsTransactionModal = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isDayTour, setIsDayTour] = useState(false);
  const [requestOnGoing, setRequestOnGoing] = useState(false);
  const [askConfirmation, setAskConfirmation] = useState(false);
  const [selectedTransWithAmount, setSelectedTransWithAmount] = useState({});
  const [askConfirmationApproval, setAskConfirmationApproval] = useState({
    value: false,
    action: "DELETE",
  });

  const {
    onVisible,
    visible,
    selectedTrans,
    onSuccessDelete,
    isTrans,
    onSuccessRequestApproval,
  } = props;
  const {
    createdDate,
    discount,
    netDiscount,
    product,
    quantity,
    reservationRoomLine,
    seniorPax,
    reservationHeader,
    user,
    _id,
  } = selectedTrans;
  const currentUser = store.getState().entities.user.user;

  useEffect(() => {
    if (reservationHeader === undefined) return;

    if (
      reservationHeader.reservationType.name === "Day Tour" ||
      reservationHeader.reservationType.name === "Restaurant"
    )
      setIsDayTour(true);
  }, [reservationHeader]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDialogCancel = () => {
    if (visible.action !== "add")
      setAskConfirmationApproval({
        action: "DELETE",
        value: false,
      });
    setAskConfirmation(false);
  };

  const handleOk = async () => {
    //
    setAskConfirmation(false);
    setRequestOnGoing(true);
  };

  const handleDelete = (e) => {
    e.preventDefault();

    if (currentUser.role.rolename !== "Administrator")
      return setAskConfirmationApproval({
        action: "DELETE",
        value: true,
      });

    setAskConfirmation(true);
  };

  useEffect(() => {
    async function execute() {
      try {
        await deleteTransLine(_id).finally((n) => setRequestOnGoing(false));

        enqueueSnackbar("Successfully deleted the record!", {
          variant: "success",
        });

        onVisible({ value: false, action: "cancel" });
        onSuccessDelete(selectedTrans);
      } catch (ex) {
        if ((ex && ex.status === 400) || ex.status === 500 || ex.status === 404)
          enqueueSnackbar(ex.data, { variant: "error" });
      }
    }

    if (requestOnGoing) execute();
  }, [requestOnGoing]); // eslint-disable-line react-hooks/exhaustive-deps

  const formatNumber = (num) =>
    Intl.NumberFormat().format(Number(num).toFixed(2));

  const Footer = () => {
    const classes = useStyles();
    if (isTrans) return null;
    if (selectedTrans.length === 0 || selectedTrans === undefined) return null;

    if (selectedTrans.approvalStatus === 1) return null;

    return (
      <ButtonGroup
        className={classes.button}
        variant="text"
        color="primary"
        aria-label="text primary button group"
      >
        <MaterialButton
          className={classes.button}
          size="small"
          disabled={requestOnGoing}
          onClick={handleDelete}
          color="secondary"
          text="DELETE"
        />
      </ButtonGroup>
    );
  };

  useEffect(() => {
    if (selectedTrans.length === 0 || selectedTrans === undefined) return;
    const gross = product.sellingPrice * quantity;
    const total = product.sellingPrice * quantity - netDiscount;
    setSelectedTransWithAmount({
      ...selectedTrans,
      netAmount: total,
      grossAmount: gross,
    });
  }, [selectedTrans]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderBody = () => {
    if (selectedTrans.length === 0 || selectedTrans === undefined) {
      return (
        <div className="errorSpan">
          <ActiveButton
            value={false}
            textFalse="Please select a row to modify."
          />
        </div>
      );
    }

    const discountText = discount === null ? "NA" : discount.name;

    return (
      <Grid container>
        <Grid item xs={12}>
          <div className="reservationtype-container">
            <List component="nav" aria-label="mailbox folders">
              <div style={{ width: "400px" }}></div>
              <AListItem
                txtLbl="Product"
                txtValue={product.longName}
                Icon={ShoppingBasketTwoToneIcon}
              />
              {!isDayTour && (
                <AListItem
                  txtLbl="Room"
                  Icon={AirlineSeatIndividualSuiteTwoToneIcon}
                  hasDivider={false}
                  txtValue={
                    reservationRoomLine && reservationRoomLine.room.roomLongName
                  }
                />
              )}
            </List>
          </div>

          <div className="reservationtype-container">
            <List component="nav" aria-label="mailbox folders">
              <AListItem
                txtLbl="Selling Price"
                txtValue={Intl.NumberFormat().format(
                  Number(product.sellingPrice).toFixed(2)
                )}
                Icon={MonetizationOnTwoToneIcon}
              />
              <AListItem
                txtLbl="Quantity"
                txtValue={quantity}
                Icon={EcoTwoToneIcon}
                hasDivider={false}
              />
            </List>
          </div>

          <div className="reservationtype-container">
            <List component="nav" aria-label="mailbox folders">
              <AListItem txtLbl="Senior/PWD Pax" txtValue={seniorPax} />
              <AListItem
                txtLbl="Discount"
                txtValue={discountText}
                hasDivider={false}
              />
            </List>
          </div>

          <div className="reservationtype-container">
            <List component="nav" aria-label="mailbox folders">
              <AListItem
                txtLbl="Gross Amount"
                txtValue={
                  <ActiveButton
                    value={true}
                    textTrue={
                      formatNumber(product.sellingPrice * quantity) + " PHP"
                    }
                  />
                }
              />
              <AListItem
                txtLbl="Net Discount"
                txtValue={
                  <ActiveButton
                    isWarning={true}
                    textTrue={formatNumber(netDiscount) + " PHP"}
                  />
                }
              />
              <AListItem
                txtLbl="Net Amount"
                hasDivider={false}
                txtValue={
                  <ActiveButton
                    textFalse={
                      formatNumber(
                        product.sellingPrice * quantity - netDiscount
                      ) + " PHP"
                    }
                  />
                }
              />
            </List>
          </div>

          <div className="reservationtype-container">
            <List component="nav" aria-label="mailbox folders">
              <AListItem
                txtLbl="Created By"
                txtValue={user.firstName + " " + user.lastName}
                Icon={AssignmentIndTwoToneIcon}
              />
              <AListItem
                txtLbl="Created Date"
                txtValue={moment(createdDate).format("YYYY-MM-DD hh:mm A")}
                Icon={ScheduleTwoToneIcon}
              />
              {selectedTrans.approvalStatus !== 0 && (
                <AListItem
                  txtLbl="Approval Status"
                  txtValue={
                    <GetApprovalStatus status={selectedTrans.approvalStatus} />
                  }
                  hasDivider={false}
                />
              )}
            </List>
          </div>
        </Grid>
      </Grid>
    );
  };
  return (
    <>
      <ReservationApprovalRemark
        approvalType="trans"
        visible={askConfirmationApproval}
        onSuccessRequestApproval={onSuccessRequestApproval}
        onCancel={handleDialogCancel}
        onCancelWholeDialog={() =>
          onVisible({ value: false, action: "cancel" })
        }
        values={selectedTransWithAmount}
      />
      {askConfirmation && (
        <MDialog
          openDialog={askConfirmation}
          handleClose={() => setAskConfirmation(false)}
          handleOk={handleOk}
        />
      )}
      <Modal
        title="Product"
        centered
        visible={visible.value}
        onOk={onVisible}
        onCancel={() => onVisible({ value: false, action: "cancel" })}
        footer={<Footer />}
      >
        {renderBody()}
      </Modal>
    </>
  );
};

export default ReservationDetailsTransactionModal;
