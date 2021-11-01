import moment from "moment";
import { Tooltip } from "antd";
import { Collapse, Spin } from "antd";
import { useSnackbar } from "notistack";
import { Grid } from "@material-ui/core";
import "./css/ReservationRoomPicker.css";
import { useMountedState } from "react-use";
import React, { useState, useEffect } from "react";
import { store } from "../../../../../../utils/store/configureStore";
import MaterialButton from "./../../../../../../common/MaterialButton";
import { writeToken } from "../../../../../../utils/store/pages/users";
import { GetRoomVariantHeader } from "../../../../../../utils/services/pages/reservation/ReservationHeader";
import {
  roomLinesSelectedEndDateAdded,
  roomLinesSelectedStartDateAdded,
} from "../../../../../../utils/store/pages/createReservation";

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

        const removeNullRooms = lines.filter((z) => z.room !== null);

        store.dispatch(writeToken({ token }));

        setTimeout(() => {
          if (!isMounted()) return;

          setRoomVariants(sortedRooms);
          setRooms(rooms);
          setCurrentReservations(removeNullRooms);
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
      const start = fromDateClone.subtract(4, "days");
      const end = todateClone.add(4, "day");

      while (start.isSameOrBefore(end)) {
        dates.push(start.format("MM-DD-YYYY"));
        start.add(1, "days");
      }
      setDateRange(dates);
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    store.dispatch(roomLinesSelectedStartDateAdded(selectedStartDate));
  }, [selectedStartDate]);

  useEffect(() => {
    store.dispatch(roomLinesSelectedEndDateAdded(selectedEndDate));
  }, [selectedEndDate]);

  let xEndDate = "";

  const checkIfStartGreaterThanEndDate = (endDate, currentDate) => {
    const zStart = moment(endDate, "MM-DD-YYYY");
    const zEnd = moment(currentDate, "MM-DD-YYYY");

    if (zStart.isSameOrAfter(zEnd)) return true;

    return false;
  };

  const checkIfLastCheckOutIsSameCheckIn = (
    lastEndDate,
    currentDate,
    isCheckInOnly
  ) => {
    const zEndDate = moment(lastEndDate, "MM-DD-YYYY");
    const zCurrent = moment(currentDate, "MM-DD-YYYY");

    if (isCheckInOnly) if (zEndDate.isSame(zCurrent)) return true;

    return false;
  };

  const getTag = (
    isCheckInOnly,
    isCheckOutOnly,
    isContResult,
    isLastCheckOutSameAsCheckIn
  ) => {
    if (isLastCheckOutSameAsCheckIn) return "SAME";

    if (isCheckInOnly) return "OUT";

    if (isCheckOutOnly) return "IN";

    if (isContResult) return "CONT";

    return "";
  };

  const getClosest = (room) => {
    const nn = new Date(selectedStartDate.date);
    let closest = Infinity;

    if (storeData.id !== "") return closest;

    currentReservations.forEach((d) => {
      const date = new Date(d.startDate);

      if (date >= nn && (date < new Date(closest) || date < closest)) {
        if (d.room._id === room._id) {
          if (store) closest = moment(d.startDate);
        }
      }
    });

    return closest;
  };

  const GetClassString = (
    isContResult,
    isCheckInOnly,
    isCheckOutOnly,
    date,
    isLastCheckOutSameAsCheckIn
  ) => {
    if (isLastCheckOutSameAsCheckIn) return " disabled";
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
    const dateInMoment = moment(date, "MM-DD-YYYY");
    const dateSelected = moment(selectedStartDate.date, "MM-DD-YYYY");
    const dateSelectedEndDate = moment(selectedEndDate.date, "MM-DD-YYYY");
    const { room: sRoom, date: sDate } = selectedEndDate;

    if (
      Object.keys(selectedStartDate.room).length !== 0 &&
      Object.keys(selectedEndDate.room).length !== 0
    ) {
      if (dateInMoment.isBetween(dateSelected, dateSelectedEndDate)) {
        if (selectedStartDate.room._id === room._id)
          return " middleSelectedDates";
      }
    }

    const closest = getClosest(room);

    if (Object.keys(selectedStartDate.room).length !== 0)
      if (dateInMoment.isAfter(closest))
        if (storeData.id === "")
          if (selectedStartDate.room._id === room._id)
            return " beforeStartDate";

    if (Object.keys(selectedStartDate.room).length !== 0)
      if (dateInMoment.isBefore(dateSelected))
        if (storeData.id === "")
          if (selectedStartDate.room._id === room._id)
            return " beforeStartDate";

    if (isContResult || isCheckInOnly || isCheckOutOnly) return "";

    if (Object.keys(sRoom).length !== 0)
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
    let isLastCheckOutSameAsCheckIn = false;
    let lastCheckOutDate = "";
    const dateInSubtring = date.substring(3, 5);

    const curRsrv = currentReservations.filter((z) => z.room._id === n._id);

    curRsrv.forEach((cur) => {
      dateRange.forEach((dRange) => {
        const zStart = moment(cur.startDate).format("MM-DD-YYYY");
        const zEnd = moment(cur.endDate).format("MM-DD-YYYY");

        if (cur._id === storeData.id) return;

        if (dRange === zStart) {
          if (zStart === date) {
            isCheckInOnly = true;
            xEndDate = zEnd;
            return;
          }
        }
        if (dRange === zEnd)
          if (zEnd === date) {
            lastCheckOutDate = dRange;
            return (isCheckOutOnly = true);
          }
      });
    });

    const isContResult = checkIfStartGreaterThanEndDate(xEndDate, date);

    isLastCheckOutSameAsCheckIn = checkIfLastCheckOutIsSameCheckIn(
      lastCheckOutDate,
      date,
      isCheckInOnly
    );

    const className = GetClassString(
      isContResult,
      isCheckInOnly,
      isCheckOutOnly,
      date,
      isLastCheckOutSameAsCheckIn
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
              isContResult,
              isLastCheckOutSameAsCheckIn
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
      if (!isLastCheckOutSameAsCheckIn)
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
    isContResult,
    isLastCheckOutSameAsCheckIn
  ) => {
    const dateInMoment = moment(date, "MM-DD-YYYY");
    const dateSelected = moment(selectedStartDate.date, "MM-DD-YYYY");

    if (
      Object.keys(selectedStartDate.room).length !== 0 &&
      Object.keys(selectedEndDate.room).length !== 0
    )
      return;

    if (Object.keys(selectedStartDate.room).length !== 0)
      if (dateInMoment.isBefore(dateSelected))
        if (selectedStartDate.room._id === room._id) return;

    const tag = getTag(
      isCheckInOnly,
      isCheckOutOnly,
      isContResult,
      isLastCheckOutSameAsCheckIn
    );

    const closest = getClosest(room);

    if (closest !== Infinity) if (dateInMoment.isAfter(closest)) return;

    if (tag === "OUT")
      if (
        Object.keys(selectedEndDate.room).length === 0 &&
        room === selectedStartDate.room
      )
        return setSelectedEndDate({ room, date });

    if (tag === "IN")
      if (Object.keys(selectedStartDate.room).length === 0)
        return setSelectedStartDate({ room, date });

    if (tag === "IN" || tag === "OUT" || tag === "CONT" || tag === "SAME")
      return;

    if (date === selectedStartDate.date && room === selectedStartDate.room) {
      setSelectedEndDate({ room: {}, date: "" });
      return setSelectedStartDate({ room: {}, date: "" });
    }

    //SELECTED-END-DATE
    if (Object.keys(selectedEndDate.room).length === 0)
      if (selectedStartDate.room._id === room._id)
        return setSelectedEndDate({ room, date });

    setSelectedEndDate({ room: {}, date: "" });
    setSelectedStartDate({ room, date });
  };

  const resetValues = () => {
    setSelectedEndDate({ room: {}, date: "" });
    setSelectedStartDate({ room: {}, date: "" });
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
                    {moment(selectedStartDate.date, "MM-DD-YYYY").format(
                      "MMM DD"
                    )}
                  </span>
                </div>
                {Object.keys(selectedEndDate.room).length !== 0 && (
                  <div>
                    <span className="counter-spanHeader rrInLabel">OUT : </span>
                    <span className="counter-spanHeader">
                      {moment(selectedEndDate.date, "MM-DD-YYYY").format(
                        "MMM DD"
                      )}
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
            <MaterialButton
              text="reset"
              size={"small"}
              style={{ marginTop: "5px" }}
              onClick={resetValues}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ReservationRoomPicker;
