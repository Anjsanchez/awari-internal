import { Spin } from "antd";
import { useSnackbar } from "notistack";
import { useMountedState } from "react-use";
import "../css/ReservationDetailsPaymentTable.css";
import React, { useEffect, useState } from "react";
import MTable from "../../../../../components/table/MTable";
import { store } from "../../../../../utils/store/configureStore";
import { writeToken } from "../../../../../utils/store/pages/users";
import ReservationDetailsRoomTableRow from "./ReservationDetailsRoomTableRow";
import { GetRoomLines } from "./../../../../../utils/services/pages/reservation/ReservationLines";

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
    enableSort: true,
  },
  {
    id: "pax",
    numeric: true,
    disablePadding: false,
    label: "Pax",
    enableSort: false,
  },
  {
    id: "amount",
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

const ReservationDetailsPaymentTable = () => {
  //..
  const isMounted = useMountedState();
  const [page, setPage] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [rooms, setRooms] = useState([]);
  const [initialLoadForm, setInitialLoadForm] = useState(false);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleResetPage = () => setPage(0);

  useEffect(() => {
    //..
    async function fetchData() {
      try {
        const { data } = await GetRoomLines();
        const { token, listRecords } = data;

        console.log(data);
        store.dispatch(writeToken({ token }));
        setTimeout(() => {
          if (isMounted()) {
            setRooms(listRecords);
            setInitialLoadForm(true);
          }
        }, 500);
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

export default ReservationDetailsPaymentTable;
