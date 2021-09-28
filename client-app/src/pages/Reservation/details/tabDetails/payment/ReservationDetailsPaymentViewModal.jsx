import React from "react";
import moment from "moment";
import { Grid, List } from "@material-ui/core";
import AListItem from "./../../../../../common/antd/AListItem";
import PaymentTwoToneIcon from "@material-ui/icons/PaymentTwoTone";
import ScheduleTwoToneIcon from "@material-ui/icons/ScheduleTwoTone";
import AttachMoneyTwoToneIcon from "@material-ui/icons/AttachMoneyTwoTone";
import AssignmentIndTwoToneIcon from "@material-ui/icons/AssignmentIndTwoTone";

const ReservationDetailsPaymentViewModal = ({ selectedPayment }) => {
  const { createdDate, amount, payment, paymentRefNum, type, user } =
    selectedPayment;

  const formatNumber = (num) =>
    Intl.NumberFormat().format(Number(num).toFixed(2));

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className="reservationtype-container">
          <List component="nav" aria-label="mailbox folders">
            <div style={{ width: "400px" }}></div>
            <AListItem
              txtLbl="Payment"
              txtValue={payment.name}
              Icon={PaymentTwoToneIcon}
            />
            <AListItem
              txtLbl="Amount"
              txtValue={formatNumber(amount)}
              Icon={AttachMoneyTwoToneIcon}
              hasDivider={false}
            />
          </List>

          <div className="reservationtype-container">
            <List component="nav" aria-label="mailbox folders">
              <AListItem txtLbl="Reference number" txtValue={paymentRefNum} />
              <AListItem
                txtLbl="Payment Remark"
                txtValue={type}
                hasDivider={false}
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
        </div>
      </Grid>
    </Grid>
  );
};

export default ReservationDetailsPaymentViewModal;
