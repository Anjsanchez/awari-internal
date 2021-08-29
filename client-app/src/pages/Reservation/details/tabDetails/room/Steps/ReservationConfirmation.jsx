import moment from "moment";
import { useSnackbar } from "notistack";
import "./css/ReservationConfirmation.css";
import { useMountedState } from "react-use";
import { Grid, List } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AListItem from "./../../../../../../common/antd/AListItem";
import KingBedTwoToneIcon from "@material-ui/icons/KingBedTwoTone";
import { store } from "../../../../../../utils/store/configureStore";
import { writeToken } from "../../../../../../utils/store/pages/users";
import ActiveButton from "./../../../../../../common/form/ActiveButton";
import LocalOfferTwoToneIcon from "@material-ui/icons/LocalOfferTwoTone";
import AccessAlarmTwoToneIcon from "@material-ui/icons/AccessAlarmTwoTone";
import QueryBuilderTwoToneIcon from "@material-ui/icons/QueryBuilderTwoTone";
import MonetizationOnTwoToneIcon from "@material-ui/icons/MonetizationOnTwoTone";
import { roomLinesSelectedAmountAdded } from "../../../../../../utils/store/pages/createReservation";
import { getRoomPricingsByRoomId } from "./../../../../../../utils/services/pages/rooms/RoomPricing";
import AirlineSeatIndividualSuiteTwoToneIcon from "@material-ui/icons/AirlineSeatIndividualSuiteTwoTone";
//
const ReservationConfirmation = () => {
  const isMounted = useMountedState();
  const { enqueueSnackbar } = useSnackbar();
  const [roomPrice, setRoomPrice] = useState([]);

  const storeData = store.getState().entities.createReservation.rooms;

  useEffect(() => {
    async function populatePricing() {
      try {
        const { data } = await getRoomPricingsByRoomId(
          storeData.selectedStartDate.room._id
        );

        const { token, listRecords } = data;

        const sortedPayment = listRecords.sort(
          (a, b) => b.capacity - a.capacity
        );

        if (isMounted()) {
          store.dispatch(writeToken({ token }));
          setRoomPrice(sortedPayment);
        }
      } catch (error) {
        console.log(error);
        enqueueSnackbar(
          "An error occured while fetching the reservation type in the server.",
          {
            variant: "error",
          }
        );
      }
    }

    populatePricing();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderDiscountValue = () => {
    const { _id, name, value } = storeData.discount;

    if (_id === 0) return "Not Available - 0%";

    return `${name} - ${value}%`;
  };

  const generateRoomPrice = () => {
    const { adult, senior } = storeData.heads;
    const totalPax = adult + senior;

    let price = roomPrice.find((n) => totalPax >= n.capacity);

    if (price === undefined) {
      price = roomPrice
        .sort((a, b) => a.capacity - b.capacity)
        .find((n) => totalPax <= n.capacity);
    }

    return price;
  };

  let grossAmount = 0,
    netDiscount = 0,
    netAmount = 0,
    mattressAmount = 0;

  const getNumberOfDays = () => {
    const sDate = moment(storeData.selectedStartDate.date);
    const eDate = moment(storeData.selectedEndDate.date);

    return eDate.diff(sDate, "days");
  };

  const getGrossAmount = () => {
    const price = generateRoomPrice();

    if (price === undefined) return "0.00";
    const daysNum = getNumberOfDays();

    grossAmount = price.sellingPrice * daysNum;

    return Intl.NumberFormat().format(
      Number(grossAmount + mattressAmount).toFixed(2)
    );
  };

  const getMattressAmount = () => {
    const { mattress } = storeData.addOns;

    if (mattress === 0) {
      mattressAmount = 0;
      return "0 - 0.00 PHP";
    }

    mattressAmount = mattress * 2420;
    return (
      mattress +
      " - " +
      Intl.NumberFormat().format(Number(mattressAmount).toFixed(2)) +
      " PHP"
    );
  };

  const getDiscount = () => {
    const { adult, senior } = storeData.heads;
    const { _id, value } = storeData.discount;
    const totalHeadsForDiscount = adult + senior;
    const amtHalf = grossAmount / totalHeadsForDiscount;

    let accumulatedDisc = 0;

    if (senior === 0 && _id === 0) {
      netDiscount = 0;
      return "0.00";
    }

    if (senior !== 0) {
      const amtMulSenior = amtHalf * senior;

      accumulatedDisc += Math.round(amtMulSenior * 0.2);
    }

    if (_id !== 0) {
      let amtMulAdult = amtHalf * adult;
      amtMulAdult += mattressAmount;
      accumulatedDisc += Math.round(amtMulAdult * (value / 100));
    }

    netDiscount = accumulatedDisc;
    return Intl.NumberFormat().format(Number(netDiscount).toFixed(2));
  };

  const getNetAmount = () => {
    netAmount = grossAmount + mattressAmount - netDiscount;

    const amt = {
      grossAmount,
      netAmount,
      netDiscount,
    };

    if (isMounted()) {
      store.dispatch(roomLinesSelectedAmountAdded(amt));
    }

    return Intl.NumberFormat().format(Number(netAmount).toFixed(2));
  };

  const getRoomName = () => {
    const price = generateRoomPrice();

    if (price === undefined)
      return storeData.selectedStartDate.room.roomLongName;

    const priceFormat = Intl.NumberFormat().format(
      Number(price.sellingPrice).toFixed(2)
    );
    return (
      storeData.selectedStartDate.room.roomLongName +
      " - " +
      priceFormat +
      " PHP"
    );
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className="reservationtype-container">
          <List component="nav" aria-label="mailbox folders">
            <div style={{ width: "400px" }}></div>
            <AListItem
              txtLbl="In"
              txtValue={moment(storeData.selectedStartDate.date).format(
                "MMM Do, YY"
              )}
              Icon={QueryBuilderTwoToneIcon}
            />
            <AListItem
              txtLbl="Out"
              Icon={AccessAlarmTwoToneIcon}
              hasDivider={false}
              txtValue={moment(storeData.selectedEndDate.date).format(
                "MMM Do, YY"
              )}
            />
          </List>
        </div>
        <div className="reservationtype-container">
          <List component="nav" aria-label="mailbox folders">
            <AListItem txtLbl="Adult" txtValue={storeData.heads.adult} />
            <AListItem txtLbl="Senior" txtValue={storeData.heads.senior} />
            <AListItem txtLbl="Children" txtValue={storeData.heads.children} />
          </List>
        </div>
        <div className="reservationtype-container">
          <List component="nav" aria-label="mailbox folders">
            <AListItem
              txtLbl="Discount"
              txtValue={renderDiscountValue()}
              Icon={LocalOfferTwoToneIcon}
            />
            <AListItem
              txtLbl="Room"
              txtValue={getRoomName()}
              Icon={KingBedTwoToneIcon}
            />
            <AListItem
              txtLbl="Mattress"
              txtValue={getMattressAmount()}
              hasDivider={false}
              Icon={AirlineSeatIndividualSuiteTwoToneIcon}
            />
          </List>
        </div>

        <div className="reservationtype-container">
          <List component="nav" aria-label="mailbox folders">
            <AListItem
              txtLbl="Gross Amount"
              txtValue={
                <ActiveButton
                  value={true}
                  textTrue={getGrossAmount() + " PHP"}
                />
              }
            />

            <AListItem
              txtLbl="Net Discount"
              txtValue={
                <ActiveButton
                  isWarning={true}
                  textTrue={getDiscount() + " PHP"}
                />
              }
            />
            <AListItem
              Icon={MonetizationOnTwoToneIcon}
              txtLbl="Net Amount"
              txtValue={<ActiveButton textFalse={getNetAmount() + " PHP"} />}
            />
          </List>
        </div>
      </Grid>
    </Grid>
  );
};

export default ReservationConfirmation;
