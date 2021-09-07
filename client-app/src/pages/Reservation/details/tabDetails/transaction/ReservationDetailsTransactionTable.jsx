import { Spin } from "antd";
import { useSnackbar } from "notistack";
import { useMountedState } from "react-use";
import "../css/ReservationDetailsPaymentTable.css";
import React, { useEffect, useState } from "react";
import MTable from "../../../../../components/table/MTable";
import { store } from "../../../../../utils/store/configureStore";
import { writeToken } from "../../../../../utils/store/pages/users";
import ReservationDetailsRoomTableRow from "./ReservationDetailsTransactionTableRow";
import { GetTransLine } from "./../../../../../utils/services/pages/reservation/ReservationTrans";

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

const ReservationDetailsTransactionTable = () => {
  //..
  const isMounted = useMountedState();
  const [page, setPage] = useState(0);
  const [rooms, setRooms] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [initialLoadForm, setInitialLoadForm] = useState(false);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleResetPage = () => setPage(0);

  const headerInStore = store.getState().entities.reservationDetails;

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
        enqueueSnackbar("An error occured while calling the server.", {
          variant: "error",
        });
        return () => {
          setRooms({});
        };
      }
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!initialLoadForm) return <Spin className="spin-loader__center " />;

  return (
    <>
      <MTable
        rows={rooms}
        xCells={headCells}
        TblBody={ReservationDetailsRoomTableRow}
        page={page}
        onChangePage={handleChangePage}
        onResetPage={handleResetPage}
        isSubTable={true}
      />
    </>
  );
};

export default ReservationDetailsTransactionTable;
