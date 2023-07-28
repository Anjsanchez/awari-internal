import { Modal, Spin } from "antd";
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
import ReservationDetailsRoomViewModal from "./ReservationDetailsRoomViewModal";
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
  const [showPaymentPreviewModal, setShowPaymentPreviewModal] = useState(false);

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
      console.log("e", ex);
      if ((ex && ex.status === 400) || ex.status === 404)
        enqueueSnackbar("0061: " + ex.data, { variant: "error" });
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
      roomPricingId: amountPrice.paymentId,
    };
    return objMdl;
  };

  const onSuccessRequestApproval = (obj) => {
    const roomsx = [...rooms];
    const index = roomsx.findIndex((x) => x._id === obj.transId);

    roomsx[index] = { ...roomsx[index] };
    roomsx[index].approvalStatus = 1;

    setSelectedRoom([]);
    store.dispatch(editRRooms(roomsx));
    setRooms(roomsx);
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
      if (ex && ex.status === 400)
        enqueueSnackbar("0062: " + ex.data, { variant: "error" });
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

    if (headerInStore.reservationDetails.isTrans)
      return setShowPaymentPreviewModal(true);

    if (selectedRoom.length === 0) {
      enqueueSnackbar("Select a room to modify.", {
        variant: "info",
      });
    }
  }, [props.visible]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!initialLoadForm) return <Spin className="spin-loader__center " />;

  const renderModal = () => {
    const { action } = props.visible;

    if (!headerInStore.reservationDetails.isTrans)
      if (action !== "add" && selectedRoom.length === 0) return null;

    if (headerInStore.reservationDetails.isTrans) {
      return (
        <Modal
          title="Room"
          centered
          visible={showPaymentPreviewModal}
          onOk={() => setShowPaymentPreviewModal(false)}
          onCancel={() => setShowPaymentPreviewModal(false)}
          footer={null}
        >
          <ReservationDetailsRoomViewModal selectedRoom={selectedRoom} />
        </Modal>
      );
    }

    return (
      <ReservationDetailsRoomModal
        selectedRoom={selectedRoom}
        onVisible={props.onVisible}
        visible={props.visible}
        onProceedWithModal={onProceedWithModal}
        onSuccessRequestApproval={onSuccessRequestApproval}
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
