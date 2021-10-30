import moment from "moment";
import { Spin } from "antd";
import { useSnackbar } from "notistack";
import { Grid, List } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AInput from "../../../common/antd/AInput";
import AListItem from "../../../common/antd/AListItem";
import ActiveButton from "../../../common/form/ActiveButton";
import GetApprovalStatus from "../../../common/GetApprovalStatus";
import { getApprovalHeaderById } from "./../../../utils/services/pages/approvals/ApprovalHeaderService";

const HeaderBody = ({ selectedData }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [header, setHeader] = useState({});
  const [initialLoad, setInitialLoad] = useState(false);

  useEffect(() => {
    if (selectedData === null || selectedData === undefined) return null;

    async function getPaymentInDb() {
      try {
        const { data } = await getApprovalHeaderById(selectedData.tmpTblId);
        setHeader(data.singleRecord);
        setInitialLoad(true);
      } catch (error) {
        enqueueSnackbar("0047: An error occured.", {
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

  const renderPaymentDetail = () => {
    if (!initialLoad)
      return (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />;
        </div>
      );

    const renderAgency = () => {
      if (header.reservationType.name.toLowerCase() === "ota/travel agency")
        return (
          <Grid item xs={6}>
            <AListItem txtLbl="Agency" txtValue={header.agency} />
          </Grid>
        );
      return null;
    };

    const renderVoucher = () => {
      if (
        header.reservationType.name.toLowerCase() === "website" ||
        header.reservationType.name.toLowerCase() === "ota/travel agency"
      )
        return (
          <Grid item xs={6}>
            <AListItem txtLbl="Voucher" txtValue={header.voucher} />
          </Grid>
        );
      return null;
    };

    return (
      <Grid container>
        <Grid item xs={6}>
          <AListItem
            txtLbl="Guest"
            txtValue={
              header.customer.firstName + " " + header.customer.lastName
            }
          />
        </Grid>
        <Grid item xs={6}>
          <AListItem txtLbl="Type" txtValue={header.reservationType.name} />
        </Grid>

        {renderAgency()}
        {renderVoucher()}
        <Grid item xs={6}>
          <AListItem
            txtLbl="User"
            txtValue={header.user.firstName + " " + header.user.lastName[0]}
            hasDivider={false}
          />
        </Grid>
        <Grid item xs={6}>
          <AListItem
            txtLbl="Created Date"
            txtValue={moment(header.createdDate).format("YYYY-MM-DD")}
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
            <AListItem txtLbl="Type" txtValue="Header" />
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

        <span className="pBody-title__wrapper">DETAILS</span>

        {renderPaymentDetail()}
      </List>
    </div>
  );
};

export default HeaderBody;
