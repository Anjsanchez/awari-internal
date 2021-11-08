import { Spin, Tooltip } from "antd";
import { useHistory } from "react-router-dom";
import { Grid, List, IconButton } from "@material-ui/core";
import ExploreTwoToneIcon from "@material-ui/icons/ExploreTwoTone";

import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import AInput from "./../../../common/antd/AInput";
import AListItem from "./../../../common/antd/AListItem";
import ActiveButton from "../../../common/form/ActiveButton";
import GetApprovalStatus from "./../../../common/GetApprovalStatus";
import { getApprovalPaymentById } from "./../../../utils/services/pages/approvals/ApprovalPaymentService";

const PaymentBody = ({ selectedData }) => {
  const hist = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [payment, setPayment] = useState({});
  const [initialLoad, setInitialLoad] = useState(false);

  useEffect(() => {
    if (selectedData === null || selectedData === undefined) return null;

    async function getPaymentInDb() {
      try {
        const { data } = await getApprovalPaymentById(selectedData.tmpTblId);

        setPayment(data.singleRecord);
        setInitialLoad(true);
      } catch (error) {
        enqueueSnackbar("0040: An error occured.", {
          variant: "error",
        });
      }
    }

    getPaymentInDb();
  }, [selectedData]); // eslint-disable-line react-hooks/exhaustive-deps

  if (selectedData === null || selectedData === undefined) return null;
  const renderAction = () => {
    const action = selectedData.action === 0 ? "Delete" : "Modify";

    if (action === "Delete")
      return <ActiveButton textFalse="Delete" value={false} />;

    return <ActiveButton textTrue="Modify" isWarning={true} />;
  };

  const handleNavigate = () =>
    hist.push(
      "/a/reservation-management/reservations/" + payment.reservationHeaderId
    );

  const renderPaymentDetail = () => {
    if (!initialLoad)
      return (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />;
        </div>
      );

    return (
      <Grid container>
        <Grid item xs={6}>
          <AListItem txtLbl="Type" txtValue={payment.payment.name} />
        </Grid>
        <Grid item xs={6}>
          <AListItem txtLbl="Amount" txtValue={payment.amount} />
        </Grid>
        <Grid item xs={6}>
          <AListItem
            txtLbl="Remark"
            txtValue={payment.type}
            hasDivider={false}
          />
        </Grid>
        <Grid item xs={6}>
          <AListItem
            txtLbl="Ref #"
            txtValue={payment.paymentRefNum}
            hasDivider={false}
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <div>
      <List component="nav" aria-label="mailbox folders">
        <Grid container>
          <Grid item xs={6}>
            <AListItem txtLbl="Type" txtValue="Payment" />
          </Grid>
          <Grid item xs={6}>
            <AListItem txtLbl="Action" txtValue={renderAction()} />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <AListItem
              txtLbl="Status"
              txtValue={<GetApprovalStatus status={selectedData.status} />}
            />
          </Grid>
          <Grid item xs={6}>
            <AListItem
              txtLbl="Requested By"
              txtValue={
                selectedData.requestedBy.firstName +
                " " +
                selectedData.requestedBy.lastName[0]
              }
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <AListItem
              txtLbl="Requested Date"
              txtValue={moment(selectedData.requestedDate).format(
                "YYYY-MM-DD hh:mm A"
              )}
              hasDivider={false}
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={12}>
            <AInput
              disabled={true}
              label="REMARK"
              id="amount"
              multiline={true}
              values={selectedData.remark}
            />
          </Grid>
        </Grid>

        <div className="details__container">
          <span className="pBody-title__wrapper">DETAILS</span>
          {selectedData.approvedBy === null &&
            payment.reservationHeaderId !==
              "00000000-0000-0000-0000-000000000000" && (
              <span className="hBody-btnIcon">
                <Tooltip
                  placement="topLeft"
                  title="Navigate"
                  arrowPointAtCenter
                >
                  <IconButton
                    aria-label="Navigate"
                    size="small"
                    onClick={() => handleNavigate()}
                  >
                    <ExploreTwoToneIcon />
                  </IconButton>
                </Tooltip>
              </span>
            )}
        </div>

        {renderPaymentDetail()}
      </List>
    </div>
  );
};

export default PaymentBody;
