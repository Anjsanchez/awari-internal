import React, { useState, useEffect } from "react";
import BookingHistoryHeader from "./../Common/BookingHistoryHeader";
import { useSnackbar } from "notistack";
import { useMountedState } from "react-use";
import { getCustomers } from "./../../../utils/services/pages/CustomerService";
import BhByHeaderDrawer from "./BhByHeaderDrawer";
import { getProdCategory } from "./../../../utils/services/pages/products/ProductCategoryService";
import { GetReservationTypes } from "./../../../utils/services/pages/reservation/ReservationType";

const BookingHistoryByHeader = () => {
  const isMounted = useMountedState();
  const { enqueueSnackbar } = useSnackbar();
  const [customers, setCustomers] = useState([]);
  const [customersFiltr, setCustomersFiltr] = useState([]);
  const [reservationType, setReservationType] = useState([]);
  const [isFilterDrawerShow, setIsFilterDrawerShow] = useState(false);

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
        const custDataFlter = [];
        sorted.map((n) => {
          custData.push({
            name: n.firstName + " " + n.lastName,
            key: n._id,
            text: n.firstName,
            value: n.firstName,
          });
          return custDataFlter.push({
            text: n.firstName,
            value: n.firstName,
          });
        });

        if (!isMounted()) return;

        setCustomers(custData);
        setCustomersFiltr(custDataFlter);
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

    fetchTypes();
    fetchCustomers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onFilterShow = () => setIsFilterDrawerShow(!isFilterDrawerShow);

  return (
    <>
      <BookingHistoryHeader onFilterShow={onFilterShow} />
      <BhByHeaderDrawer
        reservationType={reservationType}
        customers={customers}
        isFilterDrawerShow={isFilterDrawerShow}
        onFilterShow={onFilterShow}
        customersFiltr={customersFiltr}
      />
    </>
    // <div className="container__wrapper">
    // </div>
  );
};

export default BookingHistoryByHeader;
