import { Spin } from "antd";
import { useSnackbar } from "notistack";
import { useMountedState } from "react-use";
import "../css/ReservationDetailsPaymentTable.css";
import React, { useEffect, useState } from "react";
import MTable from "../../../../../components/table/MTable";
import { store } from "../../../../../utils/store/configureStore";
import { writeToken } from "../../../../../utils/store/pages/users";
import ReservationDetailsRoomModal from "./ReservationDetailsRoomModal";
import ReservationDetailsRoomTableRow from "./ReservationDetailsRoomTableRow";
import { GetPaymentByHeaderId } from "../../../../../utils/services/pages/reservation/ReservationPayment";
import { GetRoomLinesByHeaderId } from "../../../../../utils/services/pages/reservation/ReservationLines";
import {
  roomLinesResetValue,
  toggleLoading,
} from "../../../../../utils/store/pages/createReservation";
import { toggleLoadingGlobal } from "../../../../../utils/store/pages/globalSettings";
import moment from "moment";
import { saveHeaderLines } from "./../../../../../utils/services/pages/reservation/ReservationLines";

const headCells = [
  {
    id: "1",
    numeric: false,
    disablePadding: true,
    label: "",
    enableSort: true,
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

  useEffect(() => {
    //..
    async function fetchData() {
      try {
        setTimeout(() => {
          if (isMounted()) {
            setRooms(headerInStore.reservationDetails.rooms);
            setInitialLoadForm(true);
          }
        }, 600);
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
    console.log("edit", obj);
    // const paymentsx = [...payments];
    // const index = paymentsx.findIndex((x) => x._id === obj._id);

    // paymentsx[index] = { ...paymentsx[index] };
    // paymentsx[index].amount = obj.amount;
    // paymentsx[index].type = obj.type;
    // paymentsx[index].payment = obj.payment;

    // setPayments(paymentsx);
  };
  const onSuccessAdd = (obj) => {
    console.log("add", obj);

    // setPayments((prevState) => {
    //   return [...prevState, obj];
    // });
  };
  const onSuccessDelete = (obj) => {
    console.log("Delete", obj);
    // const paymentsx = [...payments];

    // const p = paymentsx.filter((m) => m._id !== obj._id);
    // setPayments(p);
  };

  const setObjDbModel = () => {
    const {
      heads,
      selectedStartDate,
      selectedEndDate,
      discount,
      addOns,
      amountPrice,
    } = headerInStore.createReservation.rooms;

    const discountId = discount._id === 0 ? null : discount._id;

    const objMdl = {
      reservationHeaderId: headerInStore.reservationDetails.header._id,
      startDate: selectedStartDate.date,
      endDate: selectedEndDate.date,
      roomId: selectedStartDate.room._id,
      grossAmount: amountPrice.grossAmount,
      totalDiscount: amountPrice.netDiscount,
      totalAmount: amountPrice.netAmount,
      mattress: addOns.mattress,
      remark: addOns.remarks,
      adultPax: heads.adult,
      seniorPax: heads.senior,
      childrenPax: heads.children,
      userId: headerInStore.user.user.id,
      discountId,
    };

    console.log(objMdl);
    return objMdl;
  };

  const onProceedWithModal = async () => {
    // store.dispatch(toggleLoadingGlobal(true));
    // try {
    //   const obj = setObjDbModel();
    //   // const { data } = await saveHeaderLines(obj);
    //   // const { token, singleRecord } = data;
    //   // store.dispatch(writeToken({ token }));
    //   setTimeout(() => {
    //     store.dispatch(toggleLoadingGlobal(false));
    //     enqueueSnackbar("Successfully updated records!", {
    //       variant: "success",
    //     });
    //     store.dispatch(roomLinesResetValue());
    //     // console.log("s", singleRecord);
    //     // if (obj.id) return onSuccessEdit(singleRecord);
    //     // return onSuccessAdd(singleRecord);
    //   }, 1000);
    // } catch (ex) {
    //   if (ex && ex.status === 400) {
    //     enqueueSnackbar(ex.data, { payment: "error" });
    //   }
    //   if (ex && ex.status === 500)
    //     enqueueSnackbar(ex.data, { payment: "error" });
    // } finally {
    // }
  };

  const selectedRow = (obj) => setSelectedRoom(obj);

  if (!initialLoadForm) return <Spin className="spin-loader__center " />;

  return (
    <>
      <ReservationDetailsRoomModal
        headerId={headerInStore.reservationDetails.header._id}
        selectedPayment={selectedRoom}
        onVisible={props.onVisible}
        visible={props.visible}
        onSuccessEdit={onSuccessEdit}
        onSuccessAdd={onSuccessAdd}
        onSuccessDelete={onSuccessDelete}
        onProceedWithModal={onProceedWithModal}
      />
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
