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
import { getApprovalTransById } from "./../../../utils/services/pages/approvals/ApprovalTransService";

const TransBody = ({ selectedData }) => {
  const hist = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [trans, setTrans] = useState({});
  const [initialLoad, setInitialLoad] = useState(false);

  useEffect(() => {
    if (selectedData === null || selectedData === undefined) return null;

    async function getData() {
      try {
        const { data } = await getApprovalTransById(selectedData.tmpTblId);
        setTrans(data.singleRecord);
        setInitialLoad(true);
      } catch (error) {
        enqueueSnackbar("0042: An error occured.", {
          variant: "error",
        });
      }
    }

    getData();
  }, [selectedData]); // eslint-disable-line react-hooks/exhaustive-deps

  if (selectedData === null || selectedData === undefined) return null;
  const renderAction = () => {
    let action = "Delete";
    if (selectedData.action === 1) action = "Modify";
    if (selectedData.action === 2) action = "Add";

    if (action === "Delete")
      return <ActiveButton textFalse="Delete" value={false} />;

    return <ActiveButton textTrue={action} value={true} />;
  };
  const handleNavigate = () =>
    hist.push(
      "/a/reservation-management/reservations/" + trans.reservationHeaderId
    );

  const renderPaymentDetail = () => {
    if (!initialLoad)
      return (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />;
        </div>
      );
    const discountText = trans.discount === null ? "NA" : trans.discount.name;
    const formatNumber = (num) =>
      Intl.NumberFormat().format(Number(num).toFixed(2));
    return (
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <AListItem txtLbl="Product" txtValue={trans.product.longName} />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={6}>
          <AListItem txtLbl="Quantity" txtValue={trans.quantity} />
        </Grid>
        <Grid item xs={6}>
          <AListItem
            txtLbl="Selling Price"
            txtValue={trans.product.sellingPrice}
          />
        </Grid>
        <Grid item xs={6}>
          <AListItem txtLbl="Senior/PWD Pax" txtValue={trans.seniorPax} />
        </Grid>
        <Grid item xs={6}>
          <AListItem txtLbl="Discount" txtValue={discountText} />
        </Grid>
        <Grid item xs={6}>
          <AListItem
            txtLbl="Gross Amount"
            txtValue={formatNumber(trans.grossAmount)}
          />
        </Grid>
        <Grid item xs={6}>
          <AListItem
            txtLbl="Net Discount"
            txtValue={formatNumber(trans.netDiscount)}
          />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <AListItem
            txtLbl="Net Amount"
            hasDivider={false}
            txtValue={formatNumber(trans.netAmount)}
          />
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    );
  };

  return (
    <div>
      <List component="nav" aria-label="mailbox folders">
        <Grid container>
          <Grid item xs={6}>
            <AListItem txtLbl="Type" txtValue="Transaction" />
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
            trans.reservationHeaderId !==
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

export default TransBody;
