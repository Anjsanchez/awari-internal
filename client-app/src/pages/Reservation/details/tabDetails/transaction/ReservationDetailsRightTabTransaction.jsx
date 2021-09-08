import React from "react";
import { Card, Tooltip } from "antd";
import { useHistory } from "react-router-dom";
import "../css/ReservationDetailsRightTabPayment.css";
import { Divider, IconButton } from "@material-ui/core";
import BorderColorTwoToneIcon from "@material-ui/icons/BorderColorTwoTone";
import EditLocationTwoToneIcon from "@material-ui/icons/EditLocationTwoTone";
import ReservationDetailsRoomTable from "./ReservationDetailsTransactionTable";
import { store } from "../../../../../utils/store/configureStore";
import { toggleResetValues } from "../../../../../utils/store/pages/createTransaction";

const ReservationDetailsRightTabTransaction = ({ header }) => {
  const hist = useHistory();
  const onClickCreate = () => {
    store.dispatch(toggleResetValues());
    hist.push(`/a/commerce-management/shop/${header}`);
  };

  return (
    <div className="reservationdetails-grid__wrapper">
      <Card className="reservationDetails-card__wrapper" hoverable>
        <div className="reservationDetails-title__wrapper">
          <div className="reservationDetails-title-avatar__wrapper">
            <div className="reservationDetails-title-span__wrapper">
              <span className="reservationDetails-title__spanHeader">
                Transactions
              </span>
            </div>
          </div>
          <div>
            <Tooltip placement="topLeft" title="Modify" arrowPointAtCenter>
              <IconButton
                aria-label="Modify"
                size="small"
                // onClick={() =>
                //   handleVisibleModal({ value: true, action: "update" })
                // }
              >
                <EditLocationTwoToneIcon />
              </IconButton>
            </Tooltip>

            <Tooltip placement="topLeft" title="Create" arrowPointAtCenter>
              <IconButton
                size="small"
                aria-label="create"
                onClick={onClickCreate}
              >
                <BorderColorTwoToneIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <Divider light />
        <div className="reservationDetails-body__wrapper">
          <ReservationDetailsRoomTable />
        </div>
      </Card>
    </div>
  );
};

export default ReservationDetailsRightTabTransaction;
