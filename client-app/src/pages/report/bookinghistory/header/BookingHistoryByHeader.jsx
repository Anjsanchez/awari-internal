import moment from "moment";
import "./../css/BookingHistory.css";
import { useSnackbar } from "notistack";
import { useMountedState } from "react-use";
import BhByHeaderBody from "./BhByHeaderBody";
import BhByHeaderDrawer from "./BhByHeaderDrawer";
import React, { useState, useEffect } from "react";
import SpinLoader from "./../../../../common/Spin";
import BookingHistoryHeader from "./../../Common/BookingHistoryHeader";
import { getCustomers } from "./../../../../utils/services/pages/CustomerService";
import { getTransHeaders } from "./../../../../utils/services/pages/trans/TransHeaderService";
import { GetReservationTypes } from "./../../../../utils/services/pages/reservation/ReservationType";

const BookingHistoryByHeader = () => {
  const isMounted = useMountedState();
  const { enqueueSnackbar } = useSnackbar();
  const [customers, setCustomers] = useState([]);
  const [transHeader, setTransHeader] = useState([]);
  const [reservationType, setReservationType] = useState([]);
  const [initialLoadForm, setInitialLoadForm] = useState(false);
  const [filteredTransHeader, setFilteredTransHeader] = useState([]);
  const [isFilterDrawerShow, setIsFilterDrawerShow] = useState(false);

  //Filters

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [selectedProfit, setSelectedProfit] = useState({
    from: 0,
    to: 500000,
  });
  const [selectedDate, setSelectedDate] = useState({
    fromDate: moment().startOf("month"),
    toDate: moment().endOf("month"),
  });

  const onFilterShow = () => setIsFilterDrawerShow(!isFilterDrawerShow);

  useEffect(() => {
    //..
    async function fetchCustomers() {
      try {
        const { data } = await getCustomers(true);
        const { listRecords } = data;

        const sorted = listRecords.sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        );

        const custData = [];

        sorted.map((n) => {
          custData.push({
            name: n.firstName + " " + n.lastName,
            key: n._id,
            text: n.firstName,
            value: n.firstName,
          });
        });

        if (!isMounted()) return;

        setCustomers(custData);
      } catch (error) {
        enqueueSnackbar("0011: An error occured while calling the server.", {
          variant: "error",
        });
      }
    }
    //..
    async function fetchTypes() {
      try {
        const { data } = await GetReservationTypes();
        const sorted = data.listRecords.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        if (!isMounted()) return;

        setReservationType(sorted);
      } catch (error) {
        enqueueSnackbar("0012: An error occured while calling the server.", {
          variant: "error",
        });
      }
    }

    async function GetTransHeader() {
      try {
        const { data } = await getTransHeaders();

        if (!isMounted()) return;

        setTransHeader(data.listRecords);
      } catch (error) {
        enqueueSnackbar("0013: An error occured while calling the server.", {
          variant: "error",
        });
      }
    }
    fetchTypes();
    fetchCustomers();
    GetTransHeader();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setInitialLoadForm(false);

    const tranx = [...transHeader];

    const filterDate = () => {
      const fromDateClone = selectedDate.fromDate
        .clone()
        .format("YYYY-MM-DD 00:00:00");
      const toDateClone = selectedDate.toDate
        .clone()
        .format("YYYY-MM-DD 23:59:00");

      const flteredDate = tranx.filter((item) =>
        moment(item.checkOutDate).isBetween(fromDateClone, toDateClone)
      );

      return flteredDate;
    };

    const filteredDate = filterDate();

    const filteredVoucher = filteredDate.filter((m) => {
      if (Object.keys(selectedVoucher).length === 0) return filteredDate;
      return m._id === selectedVoucher._id;
    });

    const filteredTypes = filteredVoucher.filter((item) => {
      if (selectedTypes.length === 0) return !selectedTypes.includes(null);
      return selectedTypes.includes(item.reservationType.name);
    });

    const filteredCustomer = filteredTypes.filter((item) => {
      if (selectedCustomer.length === 0) return filteredTypes;
      return selectedCustomer.includes(item.customer._id);
    });

    const filteredPrices = filteredCustomer.filter((item) => {
      return (
        Math.trunc(selectedProfit.from) <= Math.trunc(item.netAmount) &&
        Math.trunc(selectedProfit.to) >= Math.trunc(item.netAmount)
      );
    });

    setFilteredTransHeader(filteredPrices);
    setInitialLoadForm(true);
    //..
  }, [
    selectedDate,
    selectedTypes,
    selectedVoucher,
    selectedCustomer,
    selectedProfit,
    transHeader,
  ]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLoader = () => {
    if (!initialLoadForm) return <SpinLoader />;

    return <BhByHeaderBody filteredTransHeader={filteredTransHeader} />;
  };
  return (
    <>
      <BookingHistoryHeader onFilterShow={onFilterShow} />
      <BhByHeaderDrawer
        customers={customers}
        transHeader={transHeader}
        onFilterShow={onFilterShow}
        reservationType={reservationType}
        setSelectedDate={setSelectedDate}
        setSelectedRoom={setSelectedCustomer}
        setSelectedTypes={setSelectedTypes}
        isFilterDrawerShow={isFilterDrawerShow}
        setSelectedProfit={setSelectedProfit}
        setSelectedVoucher={setSelectedVoucher}
        setSelectedCustomer={setSelectedCustomer}
      />
      {handleLoader()}
    </>
  );
};

export default BookingHistoryByHeader;
