import { Modal } from "antd";
import { ButtonGroup } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Counter from "./../../../../../common/Counter";
import MaterialButton from "./../../../../../common/MaterialButton";
import { updateReservationLineWalkInHeads } from "./../../../../../utils/services/pages/reservation/ReservationLines";
import { useSnackbar } from "notistack";
import { store } from "../../../../../utils/store/configureStore";
import { editRRooms } from "../../../../../utils/store/pages/reservationDetails";

const ReservationDetailsHeadsModal = ({
  onShowModal,
  handleCancelModal,
  data,
}) => {
  const [counter, setCounter] = useState({
    adult: 0,
    children: 0,
    senior: 0,
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setCounter({
      adult: data.rooms[0].adultPax,
      children: data.rooms[0].childrenPax,
      senior: data.rooms[0].seniorPax,
    });
  }, [data.rooms]);

  const handleIncrement = (obj) => {
    setCounter((p) => {
      return { ...p, [obj]: p[obj] + 1 };
    });
  };

  const handleDecrement = (obj) => {
    setCounter((p) => {
      if (p[obj] <= 0) return p;
      return { ...p, [obj]: p[obj] - 1 };
    });
  };

  const Footer = () => {
    return (
      <div>
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="text primary button group"
          onClick={() => handleOkModal()}
        >
          <MaterialButton
            size="small"
            color="secondary"
            text="Cancel"
            onClick={() => handleCancelModal()}
          />
          <MaterialButton size="small" text="Okay" />
        </ButtonGroup>
      </div>
    );
  };

  const handleOkModal = async () => {
    const objMdl = {
      _id: data.rooms[0]._id,
      adultPax: counter.adult,
      childrenPax: counter.children,
      seniorPax: counter.senior,
    };

    try {
      const { data } = await updateReservationLineWalkInHeads(objMdl);

      const { singleRecord } = data;

      store.dispatch(editRRooms([{ ...singleRecord }]));
      handleCancelModal();
    } catch (error) {
      enqueueSnackbar("0009: An error occured while calling the server.", {
        variant: "error",
      });
    }
  };

  return (
    <>
      <Modal
        title="Heads"
        centered
        visible={onShowModal}
        onCancel={() => handleCancelModal()}
        footer={<Footer />}
      >
        <div className="guestCount__container">
          <Counter
            name="adult"
            onIncrement={handleIncrement}
            counterV={counter.adult}
            onDecrement={handleDecrement}
          />
          <Counter
            onDecrement={handleDecrement}
            name="senior"
            label="senior/PWD"
            onIncrement={handleIncrement}
            counterV={counter.senior}
          />
          <Counter
            name="children"
            onIncrement={handleIncrement}
            counterV={counter.children}
            onDecrement={handleDecrement}
          />
        </div>
      </Modal>
    </>
  );
};

export default ReservationDetailsHeadsModal;
