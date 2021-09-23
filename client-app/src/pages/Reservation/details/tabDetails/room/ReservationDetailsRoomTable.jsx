import { Spin } from "antd";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { useMountedState } from "react-use";
import React, { useEffect, useState } from "react";
import "../css/ReservationDetailsPaymentTable.css";
import MTable from "../../../../../components/table/MTable";
import { store } from "../../../../../utils/store/configureStore";
import { writeToken } from "../../../../../utils/store/pages/users";
import ReservationDetailsRoomModal from "./ReservationDetailsRoomModal";
import ReservationDetailsRoomTableRow from "./ReservationDetailsRoomTableRow";
import { toggleLoadingGlobal } from "../../../../../utils/store/pages/globalSettings";
import { saveHeaderLines } from "./../../../../../utils/services/pages/reservation/ReservationLines";
import { deleteReservationLine } from "../../../../../utils/services/pages/reservation/ReservationLines";
import {
  addRRooms,
  editRRooms,
} from "../../../../../utils/store/pages/reservationDetails";

const headCells = [
  {
    id: "1",
    numeric: false,
    disablePadding: true,
    label: "",
    enableSort: false,
  },
  {
    id: "room",
    numeric: false,
    disablePadding: true,
    label: "Room",
    enableSort: false,
  },
  {
    id: "pax",
    numeric: true,
    disablePadding: false,
    label: "Pax",
    enableSort: true,
  },
  {
    id: "totalAmount",
    numeric: true,
    disablePadding: false,
    label: "Total",
    enableSort: true,
  },
  {
    id: "startDate",
    numeric: true,
    disablePadding: false,
    label: "IN",
    enableSort: true,
  },
  {
    id: "endDate",
    numeric: true,
    disablePadding: false,
    label: "OUT",
    enableSort: true,
  },
  {
    id: "12",
    numeric: true,
    disablePadding: false,
    label: "",
    enableSort: false,
  },
];

const ReservationDetailsRoomTable = (props) => {
  //..
  const isMounted = useMountedState();
  const [page, setPage] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [initialLoadForm, setInitialLoadForm] = useState(false);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleResetPage = () => setPage(0);

  const headerInStore = store.getState().entities;
  const storeS = useSelector((state) => state.entities.createReservation.rooms);

  useEffect(() => {
    //..
    async function fetchData() {
      try {
        setTimeout(() => {
          if (isMounted()) {
            setRooms(headerInStore.reservationDetails.rooms);
            setInitialLoadForm(true);
          }
        }, 500);
        //
      } catch (error) {
        enqueueSnackbar("An error occured while calling the server.", {
          variant: "error",
        });
        return () => {
          setRooms([]);
        };
      }
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSuccessEdit = (obj) => {
    const roomsx = [...rooms];
    const index = roomsx.findIndex((x) => x._id === obj._id);

    roomsx[index] = { ...roomsx[index] };
    roomsx[index].adultPax = obj.adultPax;
    roomsx[index].childrenPax = obj.childrenPax;
    roomsx[index].discount = obj.discount;
    roomsx[index].startDate = obj.startDate;
    roomsx[index].endDate = obj.endDate;

    roomsx[index].grossAmount = obj.grossAmount;
    roomsx[index].mattress = obj.mattress;

    roomsx[index].remark = obj.remark;
    roomsx[index].reservationHeader = obj.reservationHeader;
    roomsx[index].room = obj.room;

    roomsx[index].seniorPax = obj.seniorPax;
    roomsx[index].startDate = obj.startDate;
    roomsx[index].totalAmount = obj.totalAmount;

    roomsx[index].totalDiscount = obj.totalDiscount;
    store.dispatch(editRRooms(roomsx));
    setRooms(roomsx);
  };

  const onSuccessAdd = (obj) => {
    store.dispatch(addRRooms(obj));
    setRooms((prevState) => {
      return [...prevState, obj];
    });
  };
  const onSuccessDelete = (obj) => {
    const roomsx = [...rooms];
    const p = roomsx.filter((m) => m._id !== obj.id);
    setRooms(p);
    store.dispatch(editRRooms(p));
  };
  const onProceedModalDeleteAction = async () => {
    store.dispatch(toggleLoadingGlobal(true));
    try {
      const obj = setObjDbModel();
      await deleteReservationLine(obj.id).finally(() =>
        store.dispatch(toggleLoadingGlobal(false))
      );

      store.dispatch(toggleLoadingGlobal(false));
      enqueueSnackbar("Successfully deleted the record!", {
        variant: "success",
      });

      setSelectedRoom([]);
      onSuccessDelete(obj);
    } catch (ex) {
      if (ex && ex.status === 400) {
        enqueueSnackbar(ex.data, { payment: "error" });
      }
      if (ex && ex.status === 500)
        enqueueSnackbar(ex.data, { payment: "error" });
    }
  };

  const setObjDbModel = () => {
    const {
      heads,
      selectedStartDate,
      selectedEndDate,
      discount,
      addOns,
      amountPrice,
      id,
    } = storeS;

    const discountId = discount._id === 0 ? null : discount._id;

    const objMdl = {
      reservationHeaderId: headerInStore.reservationDetails.header._id,
      startDate: selectedStartDate.date,
      endDate: selectedEndDate.date,
      roomId: selectedStartDate.room._id,
      grossAmount: amountPrice.grossAmount + addOns.mattress * 2420,
      totalDiscount: amountPrice.netDiscount,
      totalAmount: amountPrice.netAmount,
      mattress: addOns.mattress,
      remark: addOns.remarks,
      adultPax: heads.adult,
      seniorPax: heads.senior,
      childrenPax: heads.children,
      userId: headerInStore.user.user.id,
      discountId,
      id: id,
    };
    return objMdl;
  };

  const onProceedModalAddUpdateAction = async () => {
    store.dispatch(toggleLoadingGlobal(true));
    try {
      const obj = setObjDbModel();
      const { data } = await saveHeaderLines(obj).finally(() =>
        store.dispatch(toggleLoadingGlobal(false))
      );
      const { token, singleRecord } = data;
      store.dispatch(writeToken({ token }));

      store.dispatch(toggleLoadingGlobal(false));
      enqueueSnackbar("Successfully updated records!", {
        variant: "success",
      });

      setSelectedRoom([]);
      if (!obj.id) return onSuccessAdd(singleRecord);
      return onSuccessEdit(singleRecord);
    } catch (ex) {
      if (ex && ex.status === 400) {
        enqueueSnackbar(ex.data, { payment: "error" });
      }
      if (ex && ex.status === 500)
        enqueueSnackbar(ex.data, { payment: "error" });
    }
  };

  const onProceedWithModal = (action) => {
    if (action === "add" || action === "update" || action === "view")
      return onProceedModalAddUpdateAction();

    return onProceedModalDeleteAction();
  };

  const selectedRow = (obj) => {
    props.onVisible({ value: false, action: "cancel" });
    setSelectedRoom(obj);
  };

  useEffect(() => {
    if (props.visible.action === "cancel" || props.visible.action === "add")
      return;

    if (selectedRoom.length === 0) {
      enqueueSnackbar("Select a room to modify.", {
        variant: "info",
      });
    }
  }, [props.visible]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!initialLoadForm) return <Spin className="spin-loader__center " />;

  const renderModal = () => {
    const { action } = props.visible;

    if (action !== "add" && selectedRoom.length === 0) return null;

    return (
      <ReservationDetailsRoomModal
        selectedRoom={selectedRoom}
        onVisible={props.onVisible}
        visible={props.visible}
        onProceedWithModal={onProceedWithModal}
      />
    );
  };

  return (
    <>
      {renderModal()}
      <MTable
        rows={rooms}
        xCells={headCells}
        TblBody={ReservationDetailsRoomTableRow}
        page={page}
        onChangePage={handleChangePage}
        onResetPage={handleResetPage}
        isSubTable={true}
        selectedRow={selectedRow}
      />
    </>
  );
};

export default ReservationDetailsRoomTable;
