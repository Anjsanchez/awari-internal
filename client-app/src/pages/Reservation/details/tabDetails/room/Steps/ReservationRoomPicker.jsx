import { Collapse, Spin } from "antd";
import { useSnackbar } from "notistack";
import "./css/ReservationRoomPicker.css";
import { useMountedState } from "react-use";
import React, { useState, useEffect } from "react";
import { store } from "../../../../../../utils/store/configureStore";
import { writeToken } from "../../../../../../utils/store/pages/users";
import { GetRoomVariantHeader } from "../../../../../../utils/services/pages/reservation/ReservationHeader";
import moment from "moment";
import { Tooltip, Button } from "antd";
import {
  roomLinesSelectedEndDateAdded,
  roomLinesSelectedStartDateAdded,
} from "../../../../../../utils/store/pages/createReservation";
import { Grid } from "@material-ui/core";

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
  const [selectedStartDate, setSelectedStartDate] = useState({
    room: {},
    date: "",
  });
  const [selectedEndDate, setSelectedEndDate] = useState({
    room: {},
    date: "",
  });

  const storeData = store.getState().entities.createReservation.rooms;

  useEffect(() => {
    //..
    async function fetchData() {
      const { adult, senior } = storeData.heads;
      const totalPax = adult + senior;

      try {
        const { data } = await GetRoomVariantHeader(
          storeData.date.fromDate,
          storeData.date.toDate,
          totalPax
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
      const { fromDate, toDate } = storeData.date;

      const fromDateClone = fromDate.clone();
      const todateClone = toDate.clone();

      const dates = [];
      const start = fromDateClone.subtract(1, "days");
      const end = todateClone.add(1, "day");

      while (start.isSameOrBefore(end)) {
        dates.push(start.format("MM-DD-YYYY"));
        start.add(1, "days");
      }
      setDateRange(dates);
      // dates.push(Number(start.format("YYYY-MM-DD")));
    }

    function loadDefaultValue() {
      if (Object.keys(storeData.selectedStartDate.room).length !== 0) {
        setSelectedStartDate({
          room: storeData.selectedStartDate.room,
          date: storeData.selectedStartDate.date,
        });
      }

      if (Object.keys(storeData.selectedEndDate.room).length !== 0) {
        setSelectedEndDate({
          room: storeData.selectedEndDate.room,
          date: storeData.selectedEndDate.date,
        });
      }
    }

    setDateRangeOnLoad();
    fetchData();
    loadDefaultValue();
  }, []);

  useEffect(() => {
    store.dispatch(roomLinesSelectedStartDateAdded(selectedStartDate));
  }, [selectedStartDate]);

  useEffect(() => {
    store.dispatch(roomLinesSelectedEndDateAdded(selectedEndDate));
  }, [selectedEndDate]);

  let xEndDate = "";

  const checkIfStartGreaterThanEndDate = (endDate, currentDate) => {
    const zStart = moment(endDate);
    const zEnd = moment(currentDate);

    if (zStart.isSameOrAfter(zEnd)) return true;

    return false;
  };

  const getTag = (isCheckInOnly, isCheckOutOnly, isContResult) => {
    if (isCheckInOnly) return "OUT";

    if (isCheckOutOnly) return "IN";

    if (isContResult) return "CONT";

    return "";
  };

  const getClosest = (room) => {
    const nn = new Date(selectedStartDate.date);
    let closest = Infinity;
    currentReservations.forEach((d) => {
      const date = new Date(d.startDate);

      if (date >= nn && (date < new Date(closest) || date < closest)) {
        if (d.room._id === room._id) closest = moment(d.startDate);
      }
    });

    return closest;
  };

  const GetClassString = (
    isContResult,
    isCheckInOnly,
    isCheckOutOnly,
    date
  ) => {
    if (isCheckInOnly || isCheckOutOnly) return " checkInOnly";
    if (isContResult) return " disabled";

    return "";
  };

  const GetClassActive = (
    isContResult,
    isCheckInOnly,
    isCheckOutOnly,
    room,
    date
  ) => {
    const dateInMoment = moment(date);
    const dateSelected = moment(selectedStartDate.date);
    const dateSelectedEndDate = moment(selectedEndDate.date);
    const { room: sRoom, date: sDate } = selectedEndDate;

    if (
      Object.keys(selectedStartDate.room).length != 0 &&
      Object.keys(selectedEndDate.room).length != 0
    ) {
      if (dateInMoment.isBetween(dateSelected, dateSelectedEndDate)) {
        if (selectedStartDate.room._id === room._id)
          return " middleSelectedDates";
      }
    }

    const closest = getClosest(room);

    if (Object.keys(selectedStartDate.room).length != 0) {
      if (dateInMoment.isAfter(closest))
        if (selectedStartDate.room._id === room._id) return " beforeStartDate";
    }

    if (Object.keys(selectedStartDate.room).length != 0)
      if (dateInMoment.isBefore(dateSelected))
        if (selectedStartDate.room._id === room._id) return " beforeStartDate";

    if (isContResult || isCheckInOnly || isCheckOutOnly) return "";

    if (Object.keys(sRoom).length != 0)
      if (sRoom._id === room._id && sDate === date) return " active";

    if (
      selectedStartDate.room._id === room._id &&
      selectedStartDate.date === date
    )
      return " active";
  };

  const renderDates = (date, n) => {
    let isCheckInOnly = false;
    let isCheckOutOnly = false;
    const dateInSubtring = date.substring(3, 5);

    const curRsrv = currentReservations.filter((z) => z.room._id === n._id);

    curRsrv.forEach((cur) => {
      dateRange.forEach((dRange) => {
        const zStart = moment(cur.startDate).format("MM-DD-YYYY");
        const zEnd = moment(cur.endDate).format("MM-DD-YYYY");

        if (dRange === zStart) {
          if (zStart === date) {
            isCheckInOnly = true;
            xEndDate = zEnd;
            return;
          }
        }
        if (dRange === zEnd) if (zEnd === date) return (isCheckOutOnly = true);
      });
    });

    const isContResult = checkIfStartGreaterThanEndDate(xEndDate, date);

    const className = GetClassString(
      isContResult,
      isCheckInOnly,
      isCheckOutOnly,
      date
    );

    const classActive = GetClassActive(
      isContResult,
      isCheckInOnly,
      isCheckOutOnly,
      n,
      date
    );

    if (isContResult === false) xEndDate = "";

    const renderItems = () => {
      return (
        <div
          key={date}
          onClick={() =>
            setSelectedDate(
              date,
              n,
              isCheckInOnly,
              isCheckOutOnly,
              isContResult
            )
          }
          className={`picker-body-rooms__dateBox ${className} ${classActive}`}
        >
          <span className="picker-body-rooms__dateBox__span">
            {dateInSubtring}
          </span>
        </div>
      );
    };

    const renderToolTip = () => {
      if (isCheckInOnly || isCheckOutOnly) {
        let toolTipMsg = "Check-OUT only";
        if (isCheckOutOnly) toolTipMsg = "Check-IN only";
        return (
          <Tooltip
            key={date}
            placement="topLeft"
            title={toolTipMsg}
            arrowPointAtCenter
          >
            {renderItems()}
          </Tooltip>
        );
      }

      return renderItems();
    };

    return renderToolTip();
  };

  const setSelectedDate = (
    date,
    room,
    isCheckInOnly,
    isCheckOutOnly,
    isContResult
  ) => {
    const dateInMoment = moment(date);
    const dateSelected = moment(selectedStartDate.date);

    if (Object.keys(selectedStartDate.room).length != 0)
      if (dateInMoment.isBefore(dateSelected))
        if (selectedStartDate.room._id === room._id) return;

    const tag = getTag(isCheckInOnly, isCheckOutOnly, isContResult);

    const closest = getClosest(room);

    if (closest !== Infinity) if (dateInMoment.isAfter(closest)) return;

    if (tag === "OUT")
      if (Object.keys(selectedEndDate.room).length === 0)
        return setSelectedEndDate({ room, date });

    if (tag === "IN")
      if (Object.keys(selectedStartDate.room).length === 0)
        return setSelectedStartDate({ room, date });

    if (tag === "IN" || tag === "OUT" || tag === "CONT") return;

    if (date === selectedStartDate.date && room === selectedStartDate.room) {
      setSelectedEndDate({ room: {}, date: "" });
      return setSelectedStartDate({ room: {}, date: "" });
    }

    //SELECTED-END-DATE
    if (Object.keys(selectedEndDate.room).length == 0)
      if (selectedStartDate.room._id === room._id)
        return setSelectedEndDate({ room, date });

    setSelectedEndDate({ room: {}, date: "" });
    setSelectedStartDate({ room, date });
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
                {(xEndDate = "")}
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
      <div className="roomSpin__container">
        <Spin className="spin-loader__center " />
      </div>
    );

  return (
    <div className="roomPicker__container">
      <Grid container>
        <Grid item xs={12}>
          {Object.keys(selectedStartDate.room).length !== 0 && (
            <div className="counter-spanHeader__wrapper">
              <div className="counter-spanHeader__headerContainer">
                <span className="counter-spanHeader">
                  {selectedStartDate.room.roomLongName}
                </span>
                <span className="counter-spanHeader rrPickerLbl">ROOM</span>
              </div>
              <div className="counter-spanInLabel__container">
                <div>
                  <span className="counter-spanHeader rrInLabel">IN : </span>
                  <span className="counter-spanHeader ">
                    {moment(selectedStartDate.date).format("MMM DD")}
                  </span>
                </div>
                {Object.keys(selectedEndDate.room).length !== 0 && (
                  <div>
                    <span className="counter-spanHeader rrInLabel">OUT : </span>
                    <span className="counter-spanHeader">
                      {moment(selectedEndDate.date).format("MMM DD")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="picker-body__container">
            <Collapse accordion>
              {roomVariants.map((n) => renderVariantPanels(n))}
            </Collapse>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ReservationRoomPicker;
