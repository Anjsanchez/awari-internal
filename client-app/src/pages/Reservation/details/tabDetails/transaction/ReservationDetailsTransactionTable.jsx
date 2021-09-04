import { Spin } from "antd";
import { useSnackbar } from "notistack";
import { useMountedState } from "react-use";
import "../css/ReservationDetailsPaymentTable.css";
import React, { useEffect, useState } from "react";
import MTable from "../../../../../components/table/MTable";
import { store } from "../../../../../utils/store/configureStore";
import { writeToken } from "../../../../../utils/store/pages/users";
import ReservationDetailsRoomTableRow from "./ReservationDetailsTransactionTableRow";
import { GetRoomLines } from "../../../../../utils/services/pages/reservation/ReservationLines";

const headCells = [
  {
    id: "1",
    numeric: false,
    disablePadding: true,
    label: "",
    enableSort: true,
  },
  {
    id: "type",
    numeric: false,
    disablePadding: true,
    label: "Remark",
    enableSort: true,
  },
  {
    id: "paymentType",
    numeric: true,
    disablePadding: false,
    label: "Type",
    enableSort: false,
  },
  {
    id: "Amount",
    numeric: true,
    disablePadding: false,
    label: "Amount",
    enableSort: true,
  },
  {
    id: "isDiscounted",
    numeric: true,
    disablePadding: false,
    label: "Is Discounted",
    enableSort: true,
  },
  {
    id: "createdDate",
    numeric: true,
    disablePadding: false,
    label: "Payment Date",
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

export default ReservationDetailsTransactionTable;
