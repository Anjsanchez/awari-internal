import moment from "moment";
import { Modal } from "antd";
import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MDialog from "./../../../../../common/MDialog";
import EcoTwoToneIcon from "@material-ui/icons/EcoTwoTone";
import { ButtonGroup, Grid, List } from "@material-ui/core";
import AListItem from "../../../../../common/antd/AListItem";
import MaterialButton from "./../../../../../common/MaterialButton";
import ActiveButton from "./../../../../../common/form/ActiveButton";
import ScheduleTwoToneIcon from "@material-ui/icons/ScheduleTwoTone";
import AssignmentIndTwoToneIcon from "@material-ui/icons/AssignmentIndTwoTone";
import MonetizationOnTwoToneIcon from "@material-ui/icons/MonetizationOnTwoTone";
import ShoppingBasketTwoToneIcon from "@material-ui/icons/ShoppingBasketTwoTone";
import { deleteTransLine } from "../../../../../utils/services/pages/reservation/ReservationTrans";
import AirlineSeatIndividualSuiteTwoToneIcon from "@material-ui/icons/AirlineSeatIndividualSuiteTwoTone";

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
  const [requestOnGoing, setRequestOnGoing] = useState(false);
  const [askConfirmation, setAskConfirmation] = useState(false);

  const { onVisible, visible, selectedRoom, onSuccessDelete } = props;
  const {
    createdDate,
    discount,
    netDiscount,
    product,
    quantity,
    reservationRoomLine,
    seniorPax,
    user,
    _id,
  } = selectedRoom;

  const handleOk = async () => {
    //
    setAskConfirmation(false);
    setRequestOnGoing(true);
  };
  useEffect(() => {
    async function execute() {
      try {
        await deleteTransLine(_id).finally((n) => setRequestOnGoing(false));

        enqueueSnackbar("Successfully deleted the record!", {
          variant: "success",
        });

        onVisible({ value: false, action: "cancel" });
        onSuccessDelete(selectedRoom);
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
    if (selectedRoom.length === 0 || selectedRoom === undefined) return null;
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
          onClick={() => setAskConfirmation(true)}
          color="secondary"
          text="DELETE"
        />
      </ButtonGroup>
    );
  };

  const renderBody = () => {
    if (selectedRoom.length === 0 || selectedRoom === undefined) {
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
              <AListItem
                txtLbl="Room"
                Icon={AirlineSeatIndividualSuiteTwoToneIcon}
                hasDivider={false}
                txtValue={reservationRoomLine.room.roomLongName}
              />
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
              <AListItem txtLbl="Senior Pax" txtValue={seniorPax} />
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
                hasDivider={false}
              />
            </List>
          </div>
        </Grid>
      </Grid>
    );
  };
  return (
    <Modal
      title="Product"
      centered
      visible={visible.value}
      onOk={onVisible}
      onCancel={() => onVisible({ value: false, action: "cancel" })}
      footer={<Footer />}
    >
      {askConfirmation && (
        <MDialog
          openDialog={askConfirmation}
          handleClose={() => setAskConfirmation(false)}
          handleOk={handleOk}
        />
      )}

      {renderBody()}
    </Modal>
  );
};

export default ReservationDetailsTransactionModal;
