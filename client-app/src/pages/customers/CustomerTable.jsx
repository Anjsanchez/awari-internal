import { useSnackbar } from "notistack";
import { useMountedState } from "react-use";
import SpinLoader from "./../../common/Spin";
import CustomerTblRows from "./CustomerTblRows";
import React, { useEffect, useState } from "react";
import MTable from "./../../components/table/MTable";
import { store } from "../../utils/store/configureStore";
import { writeToken } from "../../utils/store/pages/users";
import { getCustomers } from "../../utils/services/pages/CustomerService";

const headCells = [
  {
    id: "firstName",
    numeric: false,
    disablePadding: true,
    label: "Name",
    enableSort: true,
  },
  {
    id: "points",
    numeric: true,
    disablePadding: false,
    label: "Points",
    enableSort: true,
  },
  {
    id: "cardAmount",
    numeric: true,
    disablePadding: false,
    label: "Card Amt",
    enableSort: true,
  },
  {
    id: "createdDate",
    numeric: true,
    disablePadding: false,
    label: "Join-Date",
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

const CustomerTable = () => {
  //..
  const [page, setPage] = useState(0);
  const isMounted = useMountedState();
  const { enqueueSnackbar } = useSnackbar();
  const [customers, setCustomers] = useState([]);
  const [initialLoadForm, setInitialLoadForm] = useState(false);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleResetPage = () => setPage(0);
  useEffect(() => {
    //..
    async function fetchData() {
      try {
        const { data } = await getCustomers();
        const { token, listRecords } = data;

        store.dispatch(writeToken({ token }));

        setTimeout(() => {
          if (isMounted()) {
            setCustomers(listRecords);
            setInitialLoadForm(true);
          }
        }, 500);
        //
      } catch (error) {
        enqueueSnackbar("An error occured while calling the server.", {
          variant: "error",
        });
        return () => {
          setCustomers({});
        };
      }
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!initialLoadForm) return <SpinLoader />;

  return (
    <>
      <MTable
        rows={customers}
        xCells={headCells}
        TblBody={CustomerTblRows}
        page={page}
        onChangePage={handleChangePage}
        onResetPage={handleResetPage}
      />
    </>
  );
};

export default CustomerTable;
