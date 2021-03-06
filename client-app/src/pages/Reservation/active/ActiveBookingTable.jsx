import { useSnackbar } from "notistack";
import { useMountedState } from "react-use";
import SpinLoader from "../../../common/Spin";
import React, { useEffect, useState } from "react";
import MTable from "./../../../components/table/MTable";
import ActiveBookingTblRows from "./ActiveBookingTblRows";
import { store } from "../../../utils/store/configureStore";
import { writeToken } from "../../../utils/store/pages/users";
import ActiveBookingHeaderTabs from "./ActiveBookingHeaderTabs";
import { GetHeaderWithRoomCount } from "../../../utils/services/pages/reservation/ReservationHeader";

const headCells = [
  {
    id: "customerName",
    numeric: false,
    disablePadding: true,
    label: "Name",
    enableSort: true,
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Type",
    enableSort: false,
  },
  {
    id: "roomCount",
    numeric: true,
    disablePadding: false,
    label: "Rooms",
    enableSort: true,
  },
  {
    id: "createdDate",
    numeric: true,
    disablePadding: false,
    label: "Date",
    enableSort: true,
  },
  {
    id: "isActive",
    numeric: true,
    disablePadding: false,
    label: "Status",
    enableSort: true,
  },
  {
    id: "Action",
    numeric: true,
    disablePadding: false,
    label: "Action",
    enableSort: false,
  },

  {
    id: "1",
    numeric: true,
    disablePadding: false,
    label: "",
    enableSort: false,
  },
];

const ActiveBookingTable = () => {
  //..
  const isMounted = useMountedState();
  const [page, setPage] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [headers, setHeaders] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [filteredHeaders, setFilteredHeaders] = useState([]);
  const [initialLoadForm, setInitialLoadForm] = useState(false);

  const handleSelectTabs = (event, newValue) => setTabValue(newValue);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleResetPage = () => setPage(0);

  useEffect(() => {
    setPage(0);

    if (tabValue === 0) return setFilteredHeaders(headers);

    const datas = headers.filter((c) => c.reservationType._id === tabValue);

    setFilteredHeaders(datas);
  }, [tabValue]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    //..
    async function fetchData() {
      try {
        const { data } = await GetHeaderWithRoomCount();
        const { token, listRecords } = data;
        store.dispatch(writeToken({ token }));

        setTimeout(() => {
          if (isMounted()) {
            setHeaders(listRecords);
            setFilteredHeaders(listRecords);
            setInitialLoadForm(true);
          }
        }, 500);

        //
      } catch (error) {
        enqueueSnackbar("An error occured while calling the server.", {
          variant: "error",
        });
        return () => {
          setHeaders([]);
          setFilteredHeaders([]);
        };
      }
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!initialLoadForm) return <SpinLoader />;

  return (
    <>
      <ActiveBookingHeaderTabs onSelect={handleSelectTabs} value={tabValue} />
      <MTable
        origin="customer"
        rows={filteredHeaders}
        xCells={headCells}
        TblBody={ActiveBookingTblRows}
        page={page}
        onChangePage={handleChangePage}
        onResetPage={handleResetPage}
      />
    </>
  );
};

export default ActiveBookingTable;
