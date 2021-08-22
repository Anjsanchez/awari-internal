import { useSnackbar } from "notistack";
import { useMountedState } from "react-use";
import SpinLoader from "./../../common/Spin";
import EmployeeTblRows from "./EmployeeTblRows";
import MTable from "../../components/table/MTable";
import React, { useEffect, useState } from "react";
import { store } from "../../utils/store/configureStore";
import { writeToken } from "../../utils/store/pages/users";
import { getEmployees } from "../../utils/services/pages/EmployeeService";
const headCells = [
  {
    id: "firstName",
    numeric: false,
    disablePadding: true,
    label: "Full name",
    enableSort: true,
  },
  {
    id: "username",
    numeric: true,
    disablePadding: false,
    label: "Username",
    enableSort: true,
  },
  {
    id: "rolename",
    numeric: true,
    disablePadding: false,
    label: "Role",
    enableSort: false,
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

const EmployeeTable = () => {
  //..
  const isMounted = useMountedState();
  const [page, setPage] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [employees, setEmployees] = useState([]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleResetPage = () => setPage(0);

  useEffect(() => {
    //..
    async function fetchData() {
      try {
        const { data } = await getEmployees();
        const { token, listRecords } = data;

        store.dispatch(writeToken({ token }));

        setTimeout(() => {
          if (isMounted()) setEmployees(listRecords);
        }, 500);
        //
      } catch (error) {
        enqueueSnackbar("An error occured while calling the server.", {
          variant: "error",
        });
        return () => {
          setEmployees({});
        };
      }
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (employees.length === 0) return <SpinLoader />;

  return (
    <>
      <MTable
        rows={employees}
        xCells={headCells}
        TblBody={EmployeeTblRows}
        page={page}
        onChangePage={handleChangePage}
        onResetPage={handleResetPage}
      />
    </>
  );
};

export default EmployeeTable;
