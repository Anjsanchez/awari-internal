import moment from "moment";
import { Spin } from "antd";
import { useSnackbar } from "notistack";
import { Grid, List } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AInput from "../../../common/antd/AInput";
import AListItem from "../../../common/antd/AListItem";
import ActiveButton from "../../../common/form/ActiveButton";
import GetApprovalStatus from "../../../common/GetApprovalStatus";
import { getApprovalRoomById } from "./../../../utils/services/pages/approvals/ApprovalRoomService";

const RoomBody = ({ selectedData }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [room, setRoom] = useState({});
  const [initialLoad, setInitialLoad] = useState(false);

  useEffect(() => {
    if (selectedData === null || selectedData === undefined) return null;

    async function getRoomInDb() {
      try {
        const { data } = await getApprovalRoomById(selectedData.tmpTblId);
        setRoom(data.singleRecord);
        setInitialLoad(true);
      } catch (error) {
        enqueueSnackbar("0043: An error occured.", {
          variant: "error",
        });
      }
    }

    getRoomInDb();
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
    const formatNumber = (num) =>
      Intl.NumberFormat().format(Number(num).toFixed(2));

    const discName = room.discount === null ? "NA" : room.discount.name;

    return (
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <AListItem txtLbl="Room" txtValue={room.room.roomLongName} />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={6}>
          <AListItem
            txtLbl="IN"
            txtValue={moment(room.startDate, "YYYY-MM-DD").format("YYYY-MM-DD")}
          />
        </Grid>
        <Grid item xs={6}>
          <AListItem
            txtLbl="OUT"
            txtValue={moment(room.endDate, "YYYY-MM-DD").format("YYYY-MM-DD")}
          />
        </Grid>
        <Grid item xs={6}>
          <AListItem txtLbl="Adult" txtValue={room.adultPax} />
        </Grid>
        <Grid item xs={6}>
          <AListItem txtLbl="Senior/PWD" txtValue={room.seniorPax} />
        </Grid>
        <Grid item xs={6}>
          <AListItem txtLbl="Children" txtValue={room.childrenPax} />
        </Grid>
        <Grid item xs={6}>
          <AListItem txtLbl="Mattress" txtValue={room.mattress} />
        </Grid>

        <Grid item xs={6}>
          <AListItem txtLbl="Discount" txtValue={discName} />
        </Grid>
        <Grid item xs={6}>
          <AListItem
            txtLbl="Gross Amount"
            txtValue={formatNumber(room.grossAmount)}
          />
        </Grid>
        <Grid item xs={6}>
          <AListItem
            txtLbl="Net Discount"
            txtValue={formatNumber(room.totalDiscount)}
            hasDivider={false}
          />
        </Grid>

        <Grid item xs={6}>
          <AListItem
            txtLbl="Net Amount"
            hasDivider={false}
            txtValue={formatNumber(room.totalAmount)}
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
            <AListItem txtLbl="Type" txtValue="Room" />
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

export default RoomBody;
