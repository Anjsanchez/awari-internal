import moment from "moment";
import { useSnackbar } from "notistack";
import { Grid, List } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import AListItem from "./../../../../../common/antd/AListItem";
import { store } from "../../../../../utils/store/configureStore";
import ActiveButton from "./../../../../../common/form/ActiveButton";
import { KingBedTwoToneIcon } from "@material-ui/icons/KingBedTwoTone";
import { ScheduleTwoToneIcon } from "@material-ui/icons/ScheduleTwoTone";
import AccessAlarmTwoToneIcon from "@material-ui/icons/AccessAlarmTwoTone";
import QueryBuilderTwoToneIcon from "@material-ui/icons/QueryBuilderTwoTone";
import { LocalOfferTwoToneIcon } from "@material-ui/icons/LocalOfferTwoTone";
import { AssignmentIndTwoToneIcon } from "@material-ui/icons/AssignmentIndTwoTone";
import { MonetizationOnTwoToneIcon } from "@material-ui/icons/MonetizationOnTwoTone";
import { getRoomPricingsByRoomId } from "../../../../../utils/services/pages/rooms/RoomPricing";
import { roomLinesSelectedAmountAdded } from "../../../../../utils/store/pages/createReservation";
import { AirlineSeatIndividualSuiteTwoToneIcon } from "@material-ui/icons/AirlineSeatIndividualSuiteTwoTone";

const ReservationDetailsRoomViewModal = ({ selectedRoom }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [cGrossAmt, setCGrossAmt] = useState(0);
  const [cNetAmount, setCNetAmount] = useState(0);
  const [cRoomPrice, setCRoomPrice] = useState({});
  const [cMattressAmt, setCMattressAmt] = useState(0);
  const [cNetDiscount, setCNetDiscount] = useState(0);
  const storeData = store.getState().entities.createReservation.rooms;

  useEffect(() => {
    async function populatePricing() {
      try {
        const { data } = await getRoomPricingsByRoomId(
          storeData.selectedStartDate.room._id
        );

        const { listRecords } = data;

        const sortedPayment = listRecords.sort(
          (a, b) => b.capacity - a.capacity
        );

        const { adult, senior } = storeData.heads;
        const totalPax = adult + senior;

        let price = sortedPayment.find((n) => totalPax >= n.capacity);

        if (price === undefined) {
          price = sortedPayment
            .sort((a, b) => a.capacity - b.capacity)
            .find((n) => totalPax <= n.capacity);
        }
        setCRoomPrice(price);
      } catch (error) {
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

  //..NET MATTRESS
  useEffect(() => {
    const { mattress } = storeData.addOns;

    if (mattress === 0) return setCMattressAmt(0);

    const total = mattress * 2420;
    setCMattressAmt(total);
  }, [cRoomPrice]); // eslint-disable-line react-hooks/exhaustive-deps

  //..GROSS AMOUNT
  useEffect(() => {
    const daysNum = getNumberOfDays();

    const total = cRoomPrice.sellingPrice * daysNum;

    setCGrossAmt(total);
  }, [cRoomPrice]); // eslint-disable-line react-hooks/exhaustive-deps

  //..NET DISCOUNT
  useEffect(() => {
    const { adult, senior } = storeData.heads;
    const { _id, value } = storeData.discount;
    const totalHeadsForDiscount = adult + senior;
    const amtHalf = cGrossAmt / totalHeadsForDiscount;

    let accumulatedDisc = 0;

    if (senior === 0 && _id === 0) return setCNetDiscount(0);

    if (senior !== 0) {
      const amtMulSenior = amtHalf * senior;

      accumulatedDisc += Math.round(amtMulSenior * 0.2);
    }

    if (_id !== 0) {
      let amtMulAdult = amtHalf * adult;
      amtMulAdult += cMattressAmt;
      accumulatedDisc += Math.round(amtMulAdult * (value / 100));
    }

    setCNetDiscount(accumulatedDisc);
  }, [cGrossAmt, cMattressAmt]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const total = cGrossAmt + cMattressAmt - cNetDiscount;

    setCNetAmount(total);

    const obj = {
      grossAmount: cGrossAmt,
      netAmount: total,
      netDiscount: cNetDiscount,
    };
    store.dispatch(roomLinesSelectedAmountAdded(obj));
  }, [cNetDiscount, cGrossAmt, cMattressAmt]); //..NET AMOUNT

  const renderDiscountValue = () => {
    const { _id, name, value } = storeData.discount;

    if (_id === 0) return "Not Available - 0%";

    return `${name} - ${value}%`;
  };

  const getNumberOfDays = () => {
    const sDate = moment(storeData.selectedStartDate.date, "MM-DD-YYYY");
    const eDate = moment(storeData.selectedEndDate.date, "MM-DD-YYYY");

    return eDate.diff(sDate, "days");
  };

  const setMattressFormat = () => {
    const { mattress } = storeData.addOns;

    return (
      mattress +
      " - " +
      Intl.NumberFormat().format(Number(cMattressAmt).toFixed(2)) +
      " PHP"
    );
  };

  const getRoomName = () => {
    const priceFormat = Intl.NumberFormat().format(
      Number(cRoomPrice.sellingPrice).toFixed(2)
    );

    return (
      storeData.selectedStartDate.room.roomLongName +
      " - " +
      priceFormat +
      " PHP"
    );
  };

  const formatNumber = (num) =>
    Intl.NumberFormat().format(Number(num).toFixed(2));

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className="reservationtype-container">
          <List component="nav" aria-label="mailbox folders">
            <div style={{ width: "400px" }}></div>
            <AListItem
              txtLbl="In"
              txtValue={moment(
                storeData.selectedStartDate.date,
                "MM-DD-YYYY"
              ).format("MMM Do, YY")}
              Icon={QueryBuilderTwoToneIcon}
            />
            <AListItem
              txtLbl="Out"
              Icon={AccessAlarmTwoToneIcon}
              hasDivider={false}
              txtValue={moment(
                storeData.selectedEndDate.date,
                "MM-DD-YYYY"
              ).format("MMM Do, YY")}
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
              txtValue={setMattressFormat()}
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
                  textTrue={formatNumber(cGrossAmt + cMattressAmt) + " PHP"}
                />
              }
            />
            <AListItem
              txtLbl="Net Discount"
              txtValue={
                <ActiveButton
                  isWarning={true}
                  textTrue={formatNumber(cNetDiscount) + " PHP"}
                />
              }
            />
            <AListItem
              Icon={MonetizationOnTwoToneIcon}
              txtLbl="Net Amount"
              txtValue={
                <ActiveButton textFalse={formatNumber(cNetAmount) + " PHP"} />
              }
            />
          </List>
        </div>
        {storeData.user.firstName !== undefined && (
          <div className="reservationtype-container">
            <List component="nav" aria-label="mailbox folders">
              <AListItem
                txtLbl="Created By"
                txtValue={
                  storeData.user.firstName + " " + storeData.user.lastName
                }
                Icon={AssignmentIndTwoToneIcon}
              />
              <AListItem
                txtLbl="Created Date"
                txtValue={moment(storeData.createdDate).format(
                  "YYYY-MM-DD hh:mm A"
                )}
                Icon={ScheduleTwoToneIcon}
                hasDivider={false}
              />
            </List>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default ReservationDetailsRoomViewModal;
