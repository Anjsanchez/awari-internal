import { Spin } from "antd";
import { useSnackbar } from "notistack";
import { useMountedState } from "react-use";
import { useHistory } from "react-router-dom";
import "../css/ReservationDetailsPaymentTable.css";
import React, { useEffect, useState } from "react";
import MTable from "../../../../../components/table/MTable";
import { store } from "../../../../../utils/store/configureStore";
import ReservationDetailsRoomTableRow from "./ReservationDetailsTransactionTableRow";
import ReservationDetailsTransactionModal from "./ReservationDetailsTransactionModal";
import { toggleRemoveProduct } from "../../../../../utils/store/pages/reservationDetails";
import { toggleResetValues } from "../../../../../utils/store/pages/createTransaction";

const headCells = [
  {
    id: "1",
    numeric: false,
    disablePadding: true,
    label: "",
    enableSort: false,
  },
  {
    id: "product",
    numeric: false,
    disablePadding: true,
    label: "Product",
    enableSort: false,
  },
  {
    id: "netAmount",
    numeric: true,
    disablePadding: true,
    label: "Net Amount",
    enableSort: false,
  },
  {
    id: "isDiscounted",
    numeric: true,
    disablePadding: true,
    label: "Is Discounted",
    enableSort: false,
  },
  {
    id: "createdDate",
    numeric: true,
    disablePadding: false,
    label: "Transaction Date",
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

const ReservationDetailsTransactionTable = (props) => {
  //..
  const hist = useHistory();
  const isMounted = useMountedState();
  const [page, setPage] = useState(0);
  const [rooms, setRooms] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [initialLoadForm, setInitialLoadForm] = useState(false);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleResetPage = () => setPage(0);

  const headerInStore = store.getState().entities.reservationDetails;
  const selectedRow = (obj) => {
    props.onVisible({ value: false, action: "cancel" });
    setSelectedRoom(obj);
  };
  useEffect(() => {
    //..
    async function fetchData() {
      try {
        setTimeout(() => {
          if (isMounted()) {
            setRooms(headerInStore.trans);
            setInitialLoadForm(true);
          }
        }, 300);
        //
      } catch (error) {
        enqueueSnackbar("0001: An error occured while calling the server.", {
          variant: "error",
        });
        return () => {
          setRooms({});
        };
      }
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSuccessDelete = () => {
    const removeLine = rooms.filter((n) => n._id !== selectedRoom._id);
    store.dispatch(toggleRemoveProduct(removeLine));
    setRooms(removeLine);
  };

  useEffect(() => {
    if (props.visible.action === "cancel") return;

    if (!headerInStore.header.isActive) {
      enqueueSnackbar("This reservation is not yet active.", {
        variant: "warning",
      });
      return;
    }

    if (props.visible.action !== "add" && selectedRoom.length === 0) {
      enqueueSnackbar("Please select a transaction to update.", {
        variant: "info",
      });
      return;
    }
    if (props.visible.action === "add") {
      store.dispatch(toggleResetValues());
      hist.push(`/a/commerce-management/shop/${props.header}`);
    }
  }, [props.visible]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!initialLoadForm) return <Spin className="spin-loader__center " />;

  const renderModal = () => {
    const { action } = props.visible;

    if (!headerInStore.header.isActive) return null;

    if (
      (action === "add" && selectedRoom.length === 0) ||
      (action === "update" && selectedRoom.length === 0)
    )
      return null;

    return (
      <ReservationDetailsTransactionModal
        onVisible={props.onVisible}
        visible={props.visible}
        selectedRoom={selectedRoom}
        onSuccessDelete={onSuccessDelete}
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

export default ReservationDetailsTransactionTable;
