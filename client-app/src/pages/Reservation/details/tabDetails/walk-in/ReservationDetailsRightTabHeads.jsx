import React, { useState } from "react";
import AListItem from "./../../../../../common/antd/AListItem";
import { List, Divider, IconButton } from "@material-ui/core";
import { Card, Tooltip } from "antd";
import EditLocationTwoToneIcon from "@material-ui/icons/EditLocationTwoTone";
import ReservationDetailsHeadsModal from "./ReservationDetailsHeadsModal";
import { useSelector } from "react-redux";
const ReservationDetailsRightTabHeads = () => {
  const [showModal, setShowmodal] = useState(false);

  const handleCancelModal = () => setShowmodal(!showModal);

  const typeInStore = useSelector((state) => state.entities.reservationDetails);

  return (
    <div className="reservationdetails-grid__wrapper">
      <Card className="reservationDetails-card__wrapper" hoverable>
        <div className="reservationDetails-title__wrapper">
          <div className="reservationDetails-title-avatar__wrapper">
            <div className="reservationDetails-title-span__wrapper">
              <span className="reservationDetails-title__spanHeader">
                Heads
              </span>
            </div>
          </div>
          <div>
            <Tooltip placement="topLeft" title="Modify" arrowPointAtCenter>
              <IconButton
                aria-label="Modify"
                size="small"
                onClick={() => setShowmodal(!showModal)}
              >
                <EditLocationTwoToneIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <Divider light />
        <div className="reservationDetails-body__wrapper">
          <ReservationDetailsHeadsModal
            data={typeInStore}
            onShowModal={showModal}
            handleCancelModal={handleCancelModal}
          />

          <List component="nav" aria-label="mailbox folders">
            <AListItem
              // key={d._id}
              txtLbl="Adult"
              txtValue={typeInStore.rooms[0].adultPax}
            />
            <AListItem
              // key={d._id}
              txtLbl="Senior"
              txtValue={typeInStore.rooms[0].seniorPax}
            />
            <AListItem
              // key={d._id}
              txtLbl="Children"
              txtValue={typeInStore.rooms[0].childrenPax}
              hasDivider={false}
            />
          </List>
        </div>
      </Card>
    </div>
  );
};

export default ReservationDetailsRightTabHeads;
