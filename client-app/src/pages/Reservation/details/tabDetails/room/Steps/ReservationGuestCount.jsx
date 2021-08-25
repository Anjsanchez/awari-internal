import React, { useState, useEffect } from "react";
import Counter from "../../../../../../common/Counter";
import { store } from "../../../../../../utils/store/configureStore";
import { roomLinesHeadsAdded } from "../../../../../../utils/store/pages/RoomReservation";

const ReservationGuestCount = () => {
  const [counter, setCounter] = useState({
    adult: 0,
    children: 0,
    senior: 0,
  });

  const storeData = store.getState().entities.createReservation.rooms.heads;

  useEffect(() => {
    function initialLoadValues() {
      const { adult, children, senior } = storeData;

      if (adult === 0) return;

      setCounter({
        adult,
        children,
        senior,
      });
    }
    initialLoadValues();
  }, []);

  useEffect(() => {
    store.dispatch(roomLinesHeadsAdded(counter));
  }, [counter]);

  const handleIncrement = (obj) =>
    setCounter((p) => {
      if (obj === "senior") if (p.senior >= p.adult) return p;
      return { ...p, [obj]: p[obj] + 1 };
    });

  const handleDecrement = (obj) =>
    setCounter((p) => {
      if (p[obj] <= 0) return p;

      if (obj === "adult")
        if (p.adult <= p.senior)
          return { ...p, adult: p.adult - 1, senior: p.senior - 1 };
      return { ...p, [obj]: p[obj] - 1 };
    });

  return (
    <div>
      <Counter
        name="adult"
        onIncrement={handleIncrement}
        counterV={counter.adult}
        onDecrement={handleDecrement}
      />
      <Counter
        name="children"
        onIncrement={handleIncrement}
        counterV={counter.children}
        onDecrement={handleDecrement}
      />
      <Counter
        onDecrement={handleDecrement}
        name="senior"
        onIncrement={handleIncrement}
        counterV={counter.senior}
      />
    </div>
  );
};

export default ReservationGuestCount;
