import { Collapse, Spin } from "antd";
import { useSnackbar } from "notistack";
import "./css/ReservationRoomPicker.css";
import { useMountedState } from "react-use";
import React, { useState, useEffect } from "react";
import { store } from "../../../../../../utils/store/configureStore";
import { writeToken } from "../../../../../../utils/store/pages/users";
import { GetRoomVariantHeader } from "../../../../../../utils/services/pages/reservation/ReservationHeader";
import moment from "moment";

const { Panel } = Collapse;
const ReservationRoomPicker = () => {
  //
  const isMounted = useMountedState();
  const [rooms, setRooms] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [dateRange, setDateRange] = useState([]);
  const [roomVariants, setRoomVariants] = useState([]);
  const [initialLoadForm, setInitialLoadForm] = useState(false);
  const [currentReservations, setCurrentReservations] = useState(false);

  const storeData = store.getState().entities.createReservation.rooms.date;

  useEffect(() => {
    //..
    async function fetchData() {
      try {
        const { data } = await GetRoomVariantHeader(
          storeData.fromDate,
          storeData.toDate
        );
        const { token, variants, rooms, lines } = data;

        const sortedRooms = variants.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        store.dispatch(writeToken({ token }));

        setTimeout(() => {
          if (!isMounted()) return;

          setRoomVariants(sortedRooms);
          setRooms(rooms);
          setCurrentReservations(lines);
          setInitialLoadForm(true);
        }, 500);
      } catch (error) {
        enqueueSnackbar("An error occured while calling the server.", {
          variant: "error",
        });
        return () => {
          setRooms([]);
          setRoomVariants([]);
        };
      }
    }

    function setDateRangeOnLoad() {
      //
      const { fromDate, toDate } = storeData;

      const fromDateClone = fromDate.clone();
      const todateClone = toDate.clone();

      const dates = [];
      const start = fromDateClone.subtract(1, "days");
      const end = todateClone.add(1, "day");

      while (start.isSameOrBefore(end)) {
        dates.push(start.format("MM-DD"));
        start.add(1, "days");
      }
      setDateRange(dates);
      // dates.push(Number(start.format("YYYY-MM-DD")));
    }

    setDateRangeOnLoad();
    fetchData();
  }, []);

  const renderDates = (date, n) => {
    let isReserved = false;
    const dateInSubtring = date.substring(3, 5);

    const zxx = currentReservations.filter((z) => z.room._id === n._id);

    zxx.forEach((zx) => {
      dateRange.forEach((n) => {
        const z = moment(zx.startDate).format("MM-DD");
        if (n === z) {
          if (z === date) return (isReserved = true);
        }
      });
    });

    return (
      <div
        key={date}
        className={`picker-body-rooms__dateBox ${isReserved ? "disabled" : ""}`}
      >
        <span className="picker-body-rooms__dateBox__span">
          {dateInSubtring}
        </span>
      </div>
    );
  };

  const renderVariantPanels = (data) => {
    const { _id, name } = data;

    const roomsFiltered = rooms.filter((n) => n.roomVariantId === _id);

    return (
      <Panel header={name} key={_id}>
        {roomsFiltered.map((n) => {
          return (
            <div className="picker-body__rooms" key={n._id}>
              <span className="counter-spanHeader rrRoomLbl">
                {n.roomLongName}
              </span>
              <div className="picker-body-rooms__dateWrapper on-scrollbar">
                {dateRange.map((dates) => renderDates(dates, n))}
              </div>
            </div>
          );
        })}
      </Panel>
    );
  };

  if (!initialLoadForm)
    return (
      <div className="roomPicker__container">
        <Spin className="spin-loader__center " />
      </div>
    );

  return (
    <div className="roomPicker__container">
      <div className="counter-spanHeader__wrapper">
        <span className="counter-spanHeader">CLUSTER ROOM 1</span>
        <span className="counter-spanHeader rrPickerLbl">ROOM</span>
      </div>

      <div className="picker-body__container">
        <Collapse accordion>
          {roomVariants.map((n) => renderVariantPanels(n))}
        </Collapse>
      </div>
    </div>
  );
};

export default ReservationRoomPicker;
