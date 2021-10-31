import { Card, Tooltip } from "antd";
import React, { useState } from "react";
import "../css/ReservationDetailsRightTabPayment.css";
import { Divider, IconButton } from "@material-ui/core";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import BorderColorTwoToneIcon from "@material-ui/icons/BorderColorTwoTone";
import ReservationDetailsRoomTable from "./ReservationDetailsTransactionTable";
import EditLocationTwoToneIcon from "@material-ui/icons/EditLocationTwoTone";

const ReservationDetailsRightTabTransaction = ({ header, isTrans }) => {
  const [visible, setVisible] = useState({ value: false, action: "cancel" });

  const handleVisibleModal = ({ value, action }) =>
    setVisible({ value, action });

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
                  handleVisibleModal({ value: true, action: "view" })
                }
              >
                <VisibilityTwoToneIcon />
              </IconButton>
            </Tooltip>
            {!isTrans && (
              <>
                <Tooltip placement="topLeft" title="Modify" arrowPointAtCenter>
                  <IconButton
                    aria-label="View"
                    size="small"
                    onClick={() =>
                      handleVisibleModal({ value: true, action: "update" })
                    }
                  >
                    <EditLocationTwoToneIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip placement="topLeft" title="Create" arrowPointAtCenter>
                  <IconButton
                    size="small"
                    aria-label="create"
                    onClick={() =>
                      handleVisibleModal({ value: true, action: "add" })
                    }
                  >
                    <BorderColorTwoToneIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </div>
        </div>

        <Divider light />
        <div className="reservationDetails-body__wrapper">
          <ReservationDetailsRoomTable
            header={header}
            onVisible={handleVisibleModal}
            visible={visible}
          />
        </div>
      </Card>
    </div>
  );
};

export default ReservationDetailsRightTabTransaction;
