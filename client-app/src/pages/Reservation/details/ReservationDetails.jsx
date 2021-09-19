import { useSnackbar } from "notistack";
import { useMountedState } from "react-use";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Loader from "./../../../common/Loader";
import { BsAspectRatioFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import FormHeader from "./../../../common/form/FormHeader";
import { store } from "../../../utils/store/configureStore";
import ReservationDetailsTabs from "./ReservationDetailsTabs";
import { addRDetails } from "../../../utils/store/pages/reservationDetails";
import { GetHeadersWithFullDetails } from "./../../../utils/services/pages/reservation/ReservationHeader";

const ReservationDetails = () => {
  const hist = useHistory();
  const isMounted = useMountedState();
  const { enqueueSnackbar } = useSnackbar();
  const { id: reservationId } = useParams();
  const [initialLoadForm, setInitialLoadForm] = useState(false);

  useEffect(() => {
    //..
    async function fetchData() {
      try {
        const { data } = await GetHeadersWithFullDetails(reservationId);

        if (data.header === null || data.header === undefined)
          hist.replace("/a/reservation-management/reservations");

        store.dispatch(addRDetails(data));

        setTimeout(() => {
          if (isMounted()) {
            setInitialLoadForm(true);
          }
        }, 500);
        //
      } catch (error) {
        console.log(error);
        enqueueSnackbar("0004: An error occured while calling the server.", {
          variant: "error",
        });
      }
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!initialLoadForm) return <Loader />;

  return (
    <div className="container__wrapper">
      <FormHeader
        header="Active Bookings"
        second="Reservation Management"
        third="Bookings"
        navigate="/"
        SecondIcon={BsAspectRatioFill}
        isVisibleBtn={false}
      />

      <ReservationDetailsTabs />
    </div>
  );
};

export default ReservationDetails;
