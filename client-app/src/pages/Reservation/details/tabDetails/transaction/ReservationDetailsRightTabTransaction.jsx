import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { useHistory } from "react-router-dom";
import "../css/ReservationDetailsRightTabPayment.css";
import { Divider, IconButton } from "@material-ui/core";
import BorderColorTwoToneIcon from "@material-ui/icons/BorderColorTwoTone";
import ReservationDetailsRoomTable from "./ReservationDetailsTransactionTable";
import { store } from "../../../../../utils/store/configureStore";
import { toggleResetValues } from "../../../../../utils/store/pages/createTransaction";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";

const ReservationDetailsRightTabTransaction = ({ header }) => {
  const [visible, setVisible] = useState({ value: false, action: "add" });

  const handleVisibleModal = ({ value, action }) =>
    setVisible({ value, action });

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
            <Tooltip placement="topLeft" title="View" arrowPointAtCenter>
              <IconButton
                aria-label="View"
                size="small"
                onClick={() =>
                  handleVisibleModal({ value: true, action: "update" })
                }
              >
                <VisibilityTwoToneIcon />
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
          <ReservationDetailsRoomTable
            onVisible={handleVisibleModal}
            visible={visible}
          />
        </div>
      </Card>
    </div>
  );
};

export default ReservationDetailsRightTabTransaction;
