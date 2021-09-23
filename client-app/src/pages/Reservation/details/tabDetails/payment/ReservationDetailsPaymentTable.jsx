import { Spin } from "antd";
import { useSnackbar } from "notistack";
import { useMountedState } from "react-use";
import "../css/ReservationDetailsPaymentTable.css";
import React, { useEffect, useState } from "react";
import MTable from "./../../../../../components/table/MTable";
import { store } from "../../../../../utils/store/configureStore";
import ReservationDetailsPaymentModal from "./ReservationDetailsPaymentModal";
import { addRPayments } from "../../../../../utils/store/pages/reservationDetails";
import ReservationDetailsPaymentTableRow from "./ReservationDetailsPaymentTableRow";

const headCells = [
  {
    id: "1",
    numeric: false,
    disablePadding: true,
    label: "",
    enableSort: false,
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

const ReservationDetailsPaymentTable = (props) => {
  //..
  const isMounted = useMountedState();
  const [page, setPage] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState([]);
  const [initialLoadForm, setInitialLoadForm] = useState(false);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleResetPage = () => setPage(0);

  const onSuccessEdit = (obj) => {
    const paymentsx = [...payments];
    const index = paymentsx.findIndex((x) => x._id === obj._id);

    paymentsx[index] = { ...paymentsx[index] };
    paymentsx[index].amount = obj.amount;
    paymentsx[index].type = obj.type;
    paymentsx[index].payment = obj.payment;

    store.dispatch(addRPayments(paymentsx));
    setPayments(paymentsx);
  };

  const onSuccessAdd = (obj) => {
    setPayments((prevState) => {
      const o = [...prevState, obj];
      store.dispatch(addRPayments(o));
      return o;
    });
  };

  const onSuccessDelete = (obj) => {
    const paymentsx = [...payments];

    const p = paymentsx.filter((m) => m._id !== obj._id);
    store.dispatch(addRPayments(p));
    setPayments(p);
  };

  const headerInStore = store.getState().entities.reservationDetails;
  const selectedRow = (obj) => {
    props.onVisible({ value: false, action: "cancel" });
    setSelectedPayment(obj);
  };

  useEffect(() => {
    //..
    async function fetchData() {
      try {
        setTimeout(() => {
          if (isMounted()) {
            setPayments(headerInStore.payments);
            setInitialLoadForm(true);
          }
        }, 300);
        //
      } catch (error) {
        enqueueSnackbar("0002: An error occured while calling the server.", {
          variant: "error",
        });
        return () => {
          setPayments({});
        };
      }
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (props.visible.action === "cancel") return;

    if (!headerInStore.header.isActive) {
      enqueueSnackbar("This reservation is not yet active.", {
        variant: "warning",
      });
      return;
    }

    if (props.visible.action !== "add" && selectedPayment.length === 0) {
      enqueueSnackbar("Please select a payment to update.", {
        variant: "info",
      });
      return;
    }
  }, [props.visible]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!initialLoadForm) return <Spin className="spin-loader__center " />;

  const renderModal = () => {
    const { action } = props.visible;

    if (!headerInStore.header.isActive) return null;

    if (
      (action === "update" && selectedPayment.length === 0) ||
      (action === "view" && selectedPayment.length === 0)
    ) {
      return null;
    }

    return (
      <ReservationDetailsPaymentModal
        headerId={headerInStore.header._id}
        selectedPayment={selectedPayment}
        onVisible={props.onVisible}
        visible={props.visible}
        onSuccessEdit={onSuccessEdit}
        onSuccessAdd={onSuccessAdd}
        onSuccessDelete={onSuccessDelete}
      />
    );
  };

  return (
    <>
      {renderModal()}
      <MTable
        rows={payments}
        xCells={headCells}
        TblBody={ReservationDetailsPaymentTableRow}
        page={page}
        onChangePage={handleChangePage}
        onResetPage={handleResetPage}
        isSubTable={true}
        selectedRow={selectedRow}
      />
    </>
  );
};

export default ReservationDetailsPaymentTable;
