import { Modal, Select } from "antd";
import MaterialButton from "./../../../../common/MaterialButton";
import { ButtonGroup } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import MDialog from "../../../../common/MDialog";
import { UpdateAdditionalRates } from "./../../../../utils/services/pages/reservation/ReservationLines";
import { useSnackbar } from "notistack";
import { store } from "../../../../utils/store/configureStore";
import { toggleModifyLateCheckOutPenalty } from "../../../../utils/store/pages/reservationDetails";
import { useSelector } from "react-redux";

const roomRate = [
  {
    name: "Not Applicable",
    value: 0,
  },
  {
    name: "20%",
    value: 20,
  },
  {
    name: "30%",
    value: 30,
  },
  {
    name: "40%",
    value: 40,
  },
  {
    name: "50%",
    value: 50,
  },
  {
    name: "100%",
    value: 100,
  },
];
const ReservationDetailsLeftTabLateCheckOut = ({
  visible,
  onVisible,
  onCancel,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [selectedPrice, setSelectedPrice] = useState({});
  const [askConfirmation, setAskConfirmation] = useState(false);

  const rooms = useSelector((state) => state.entities.reservationDetails.rooms);

  useEffect(() => {
    if (visible === false) {
      setSelectedPrice({});
      return setSelectedRoom({});
    }
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (Object.keys(selectedRoom).length === 0) return;

    const findValue = roomRate.find(
      (n) => n.value === selectedRoom.values.lateCheckOutPenalty
    );
    setSelectedPrice(findValue);
  }, [selectedRoom]);

  const Footer = () => {
    return (
      <div>
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="text primary button group"
        >
          <MaterialButton
            disabled={isLoading}
            onClick={onCancel}
            size="small"
            color="secondary"
            text="CANCEL"
          />

          <MaterialButton
            disabled={isLoading}
            size="small"
            text="OK"
            onClick={handleValidateOkay}
          />
        </ButtonGroup>
      </div>
    );
  };

  const handleValidateOkay = () => {
    if (Object.keys(selectedRoom).length === 0) return;
    if (Object.keys(selectedPrice).length === 0) return;

    setAskConfirmation(true);
  };

  const handleChangeRoom = (s, e) => setSelectedRoom(e);
  const handleChangePrice = (s, e) => setSelectedPrice(e);

  const isTheRecordHasRoomPricingAvailable = () => {
    //checking for the old records.
    if (selectedRoom.values.roomPricing === null) return false;
    return true;
  };

  const handleExecuteUpdate = async () => {
    setAskConfirmation(false);
    if (!isTheRecordHasRoomPricingAvailable())
      return enqueueSnackbar(
        "Early Check-In/Late Check-Out is not available on this booking.",
        { variant: "error" }
      );

    setIsLoading(true);

    let obj = {
      transId: selectedRoom.key,
      lateCheckOutPenalty: selectedPrice.value,
    };

    try {
      await UpdateAdditionalRates(obj)
        .catch((a) => setIsLoading(false))
        .finally((b) => setIsLoading(false));

      store.dispatch(toggleModifyLateCheckOutPenalty(obj));

      setTimeout(() => {
        onCancel();
        enqueueSnackbar("Successfully updated records!", {
          variant: "success",
        });

        window.location.reload(false);
      }, 50);
    } catch (ex) {
      if (ex && ex.status === 400)
        enqueueSnackbar("0072: " + ex.data, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Early Check-In/Late Check-Out"
      centered
      visible={visible}
      onOk={onVisible}
      onCancel={onCancel}
      footer={<Footer />}
    >
      <div className="paymentModalVoucher__container">
        <div className="reservationtype-container">
          <div className="header-label__wrapper">
            <label htmlFor="name">ROOM</label>
          </div>
          <Select
            id="name"
            key="name"
            name="name"
            className="reservationtype__select"
            showSearch
            placeholder="Room"
            optionFilterProp="children"
            onChange={handleChangeRoom}
            value={selectedRoom.value}
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {rooms.map((n) => (
              <Select.Option value={n.room.roomLongName} key={n._id} values={n}>
                {n.room.roomLongName}
              </Select.Option>
            ))}
          </Select>
          {Object.keys(selectedRoom).length !== 0 && (
            <>
              <div className="header-label__wrapper" style={{ marginTop: 10 }}>
                <label htmlFor="name1">ADDITIONAL RATES</label>
              </div>

              <Select
                id="name1"
                key="name"
                name="name"
                className="reservationtype__select"
                showSearch
                placeholder="Room"
                optionFilterProp="children"
                onChange={handleChangePrice}
                value={selectedPrice.name}
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {roomRate.map((n) => (
                  <Select.Option value={n.value} key={n.value} name={n.name}>
                    {n.name}
                  </Select.Option>
                ))}
              </Select>
            </>
          )}
        </div>
      </div>

      <MDialog
        openDialog={askConfirmation}
        handleClose={() => setAskConfirmation(false)}
        handleOk={handleExecuteUpdate}
      />
    </Modal>
  );
};

export default ReservationDetailsLeftTabLateCheckOut;
