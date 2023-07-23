import moment from "moment";
import { useMountedState } from "react-use";
import { useParams } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import { store } from "../../../utils/store/configureStore";
import { writeToken } from "../../../utils/store/pages/users";
import { GetTransWithFullDetails } from "../../../utils/services/pages/trans/TransHeaderService";
import { getProdCategory } from "./../../../utils/services/pages/products/ProductCategoryService";
import { GetHeadersWithFullDetails } from "./../../../utils/services/pages/reservation/ReservationHeader";
import {
  Page,
  Text,
  Font,
  Document,
  StyleSheet,
  Image,
  View,
} from "@react-pdf/renderer";

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
  // fonts: [
  //   {
  //     src: "https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap",
  //     fontWeight: 700,
  //   },
  //   {
  //     src: "https://fonts.googleapis.com/css2?family=Oswald:wght@400&display=swap",
  //     fontWeight: 400,
  //   },
  // ],
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
    paddingBottom: 65,
    paddingHorizontal: 10,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },

  page: { flexDirection: "column", padding: 25 },

  rowResort: {
    display: "flex",
    justifyContent: "flex-end",
    textAlign: "right",
    flexDirection: "row",
  },
  resortWrapper: {
    marginTop: 5,
    borderRight: 1,
    paddingRight: 15,
    textAlign: "right",
  },
  image: {
    width: 100,
  },
  centerImage: {
    alignItems: "center",
    paddingLeft: 10,
  },
  titleText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 15,
    fontWeight: "bold",
  },
  rowCustomer: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "stretch",
    flexWrap: "nowrap",
    alignItems: "stretch",
  },
  customerWrapper: {
    marginTop: 5,
    textAlign: "left",
  },
  rowRight: {
    display: "flex",
    justifyContent: "flex-start",
    textAlign: "left",
    flexDirection: "row",
    fontSize: 10,
  },
  customerText: {
    fontSize: 16,
  },
  rightBookingDetails: {
    fontSize: 11,
    marginTop: 10,
  },
  //TABLE
  table: {
    marginTop: 10,
    display: "table",
    width: "100%",
    borderStyle: "solid",

    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { width: "100%", flexDirection: "row" },
  tableColHeader: { borderTop: 1, borderBottom: 1 },
  tableCol: {
    // width: "25%",
    borderStyle: "solid",
    borderWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableHeader: {
    marginTop: 7,
    marginBottom: 7,
    fontSize: 11,
    fontWeight: "bold",
  },
  tableColDescription: {
    width: 250,
  },
  tableColSub: {
    textAlign: "left",
    width: 69,
  },
  tableRowText: {
    fontSize: 10,
    marginTop: 2,
    marginBottom: 2,
  },
  groupByText: {
    fontWeight: "1200",
  },
  borderTotal: {
    border: 1,
    marginTop: 12,
  },
  productMargin: {
    marginTop: 6,
  },
  subMargin: {
    marginTop: 12,
  },
  fontSmall: {
    fontSize: 10,
  },
  //END
});

const SOAe = ({
  rooms,
  trans,
  header,
  isCategorized,
  payments,
  isTrans,
  productCategories,
  user,
  isDayTour,
  dayTourType,
}) => {
  const formatNumber = (num) =>
    Intl.NumberFormat().format(Number(num).toFixed(2));

  let lastId = "0";
  const renderCategory = (pc, roomId) => {
    if (!isDayTour) if (!roomId.room._id) return null;

    if (lastId === pc._id) return null;

    lastId = pc._id;

    return (
      <View style={[styles.tableRow, styles.productMargin]}>
        <View style={[styles.tableCol]}>
          <Text
            style={
              ([styles.tableRowText, styles.tableColSub],
              {
                fontFamily: "Oswald",
                fontWeight: 300,
                fontSize: 11,
              })
            }
          >
            {pc.name}
          </Text>
        </View>
        <View style={[styles.tableCol, styles.tableColDescription]}>
          <Text style={[styles.tableRowText]}></Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
        </View>
      </View>
    );
  };

  const renderPaymentName = (p) => {
    return (
      <View style={[styles.tableRow]} key={1 + p._id}>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}>
            {moment(p.createdDate).format("MM-DD-YY")}
          </Text>
        </View>
        <View style={[styles.tableCol, styles.tableColDescription]}>
          <Text style={[styles.tableRowText]}>
            {p.payment.name} {p.paymentRefNum.trim() && " —  " + p.type}
          </Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}>
            {formatNumber(p.amount)}
          </Text>
        </View>
      </View>
    );
  };
  const renderMattress = (roomsx) => {
    if (isDayTour) return null;

    if (roomsx.mattress === 0) return null;
    return (
      <View style={[styles.tableRow]}>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
        </View>
        <View style={[styles.tableCol, styles.tableColDescription]}>
          <Text style={[styles.tableRowText]}>Extra Mattress</Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}>
            {roomsx.mattress}
          </Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}>
            {formatNumber(roomsx.mattress * 2420)}
          </Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}>0</Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
        </View>
      </View>
    );
  };

  const renderSubTotalRoomCharges = (d, isFormatted = true) => {
    const roomCharges = d.grossAmount;

    if (isDayTour) {
      let transOfThisRoomDT = [];

      if (isTrans === "true") {
        transOfThisRoomDT = trans.filter(
          (n) =>
            n.transHeader.reservationType._id ===
            d.transHeader.reservationType._id
        );
      } else {
        transOfThisRoomDT = trans.filter(
          (n) => n.reservationHeader._id === d.reservationHeader._id
        );
      }

      const transChargesDT = transOfThisRoomDT.reduce(
        (a, b) => a + b.quantity * b.product.sellingPrice,
        0
      );

      const totalDT = roomCharges + transChargesDT;

      if (!isFormatted) return totalDT;
      return formatNumber(totalDT);
    }

    let transOfThisRoom = [];

    if (isTrans === "true") {
      transOfThisRoom = trans.filter((n) => n.transRoom._id === d._id);
    } else {
      transOfThisRoom = trans.filter(
        (n) => n.reservationRoomLine._id === d._id
      );
    }

    const transCharges = transOfThisRoom.reduce(
      (a, b) => a + b.quantity * b.product.sellingPrice,
      0
    );
    const total = roomCharges + transCharges;

    if (!isFormatted) return total;
    return formatNumber(total);
  };

  const renderSubTotalDiscount = (d, isFormatted = true) => {
    const roomDiscount = d.totalDiscount;

    if (isDayTour) {
      let transOfThisRoomDT = [];
      if (isTrans === "true") {
        transOfThisRoomDT = trans.filter(
          (n) =>
            n.transHeader.reservationType._id ===
            d.transHeader.reservationType._id
        );
      } else {
        transOfThisRoomDT = trans.filter(
          (n) => n.reservationHeader._id === d.reservationHeader._id
        );
      }

      const transDiscountDT = transOfThisRoomDT.reduce(
        (a, b) => a + b.netDiscount,
        0
      );

      const totalDT = roomDiscount + transDiscountDT;

      if (!isFormatted) return totalDT;
      return formatNumber(totalDT);
    }

    let transOfThisRoom = [];

    if (isTrans === "true") {
      transOfThisRoom = trans.filter((n) => n.transRoom._id === d._id);
    } else {
      transOfThisRoom = trans.filter(
        (n) => n.reservationRoomLine._id === d._id
      );
    }

    const transDiscount = transOfThisRoom.reduce(
      (a, b) => a + b.netDiscount,
      0
    );

    const total = roomDiscount + transDiscount;

    if (!isFormatted) return total;
    return formatNumber(total);
  };

  const renderSubTotalLateCheckOut = (d) => {
    if (isDayTour) return 0;
    if (d.lateCheckOutPenalty === 0) return 0;

    const total = d.roomPricing.sellingPrice * (d.lateCheckOutPenalty / 100);

    return total;
  };

  const renderRoomsxSubTotal = (d) => {
    const totalCharges = renderSubTotalRoomCharges(d, false);
    const totalDiscount = renderSubTotalDiscount(d, false);
    const totalRoomLatecheck = renderSubTotalLateCheckOut(d);

    return formatNumber(totalCharges + totalRoomLatecheck - totalDiscount);
  };

  const renderTotalPayment = (isFormatted = true) => {
    const totalPayment = payments.reduce((a, b) => a + b.amount, 0);

    if (!isFormatted) return totalPayment;
    return formatNumber(totalPayment);
  };

  const renderNetTotal = (isFormatted = true) => {
    const grossAmountRooms = rooms.reduce(
      (a, b) => a + b.grossAmount - b.totalDiscount,
      0
    );

    const grossAmountTrans = trans.reduce(
      (a, b) => a + b.quantity * b.product.sellingPrice - b.netDiscount,
      0
    );

    const total = grossAmountRooms + getNetLateCheckOut() + grossAmountTrans;
    if (!isFormatted) return total;
    return formatNumber(total);
  };

  const renderTotalPax = () => {
    if (
      dayTourType.toLowerCase() == "day tour" ||
      dayTourType.toLowerCase() == "night tour"
    )
      return null;

    if (isDayTour) {
      return rooms.reduce(
        (a, b) => a + b.adultPax + b.seniorPax + b.childrenPax,
        0
      );
    }
    return rooms.reduce((a, b) => a + b.adultPax + b.seniorPax, 0);
  };

  const renderNetDiscount = (isFormatted = true) => {
    const netDiscOfRooms = rooms.reduce((a, b) => a + b.totalDiscount, 0);

    const netAmountOfTrans = trans.reduce((a, b) => a + b.netDiscount, 0);

    const total = netDiscOfRooms + netAmountOfTrans;
    if (!isFormatted) return total;
    return formatNumber(total);
  };

  const renderGrossAmount = (isFormatted = true) => {
    const grossAmountRooms = rooms.reduce((a, b) => a + b.grossAmount, 0);

    const grossAmountTrans = trans.reduce(
      (a, b) => a + b.quantity * b.product.sellingPrice,
      0
    );

    const netLateCheckOut = getNetLateCheckOut();

    const total = grossAmountRooms + netLateCheckOut + grossAmountTrans;

    if (!isFormatted) return total;

    return formatNumber(total);
  };

  const getNetLateCheckOut = () => {
    if (isDayTour) return 0;

    const getTotalCheckOutPercentage = rooms.reduce((a, b) => {
      if (b.lateCheckOutPenalty === 0) return a;
      if (b.roomPricing === null) return a;
      return a + b.roomPricing.sellingPrice * (b.lateCheckOutPenalty / 100);
    }, 0);

    return getTotalCheckOutPercentage;
  };

  const renderDayTourLine = (roomsx) => {
    if (dayTourType !== "Day Tour" && dayTourType !== "Night Tour") return null;

    let adultPrice = 1880;
    if (dayTourType === "Night Tour") adultPrice = 1990;

    return (
      <>
        <View style={[styles.tableRow]}>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
          </View>
          <View style={[styles.tableCol, styles.tableColDescription]}>
            <Text style={[styles.tableRowText]}>Adult</Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}>
              {roomsx.adultPax}
            </Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}>
              {formatNumber(roomsx.adultPax * adultPrice)}
            </Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}>0</Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
          </View>
        </View>

        <View style={[styles.tableRow]}>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
          </View>
          <View style={[styles.tableCol, styles.tableColDescription]}>
            <Text style={[styles.tableRowText]}>Senior/PWD</Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}>
              {roomsx.seniorPax}
            </Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}>
              {formatNumber(roomsx.seniorPax * adultPrice)}
            </Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}>
              {formatNumber(roomsx.totalDiscount)}
            </Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
          </View>
        </View>

        <View style={[styles.tableRow]}>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
          </View>
          <View style={[styles.tableCol, styles.tableColDescription]}>
            <Text style={[styles.tableRowText]}>Children</Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}>
              {roomsx.childrenPax}
            </Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}>
              {formatNumber(roomsx.childrenPax * 990)}
            </Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}>0</Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
          </View>
        </View>
      </>
    );
  };

  const RenderSolAndLunaName = (trip) => {
    let tripName = trip.toLowerCase();
    if (tripName == "day tour") return "Sol Trip";
    if (tripName == "night tour") return "Luna Trip";
    return trip;
  };
  const renderRoom = (roomsx) => {
    var isDayTourAndNightTour =
      dayTourType.toLowerCase() == "day tour" ||
      dayTourType.toLowerCase() == "night tour";

    const netDisc = isDayTourAndNightTour
      ? null
      : formatNumber(roomsx.totalDiscount);

    const total = isDayTourAndNightTour
      ? null
      : formatNumber(roomsx.grossAmount - roomsx.mattress * 2420);

    if (isDayTour)
      return (
        <View style={[styles.tableRow]}>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}>
              {moment(roomsx.createdDate).format("MM-DD-YY")}
            </Text>
          </View>
          <View style={[styles.tableCol, styles.tableColDescription]}>
            <Text style={[styles.tableRowText]}>
              {RenderSolAndLunaName(header.reservationType.name)}
            </Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}>
              {renderTotalPax()}
            </Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}>
              {total}
            </Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}>
              {netDisc}
            </Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
          </View>
        </View>
      );

    return (
      <View style={[styles.tableRow]}>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}>
            {moment(roomsx.createdDate).format("MM-DD-YY")}
          </Text>
        </View>
        <View style={[styles.tableCol, styles.tableColDescription]}>
          <Text style={[styles.tableRowText]}>
            {roomsx.room.roomLongName} (
            {moment(roomsx.startDate).format("MMM DD, YY")} —{" "}
            {moment(roomsx.endDate).format("MMM DD, YY")})
          </Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}>{total}</Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}>
            {formatNumber(roomsx.totalDiscount)}
          </Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
        </View>
      </View>
    );
  };

  const renderRoomLateCheckOut = (roomsx) => {
    if (isDayTour) return null;
    if (roomsx.lateCheckOutPenalty === 0) return null;

    const total =
      roomsx.roomPricing.sellingPrice * (roomsx.lateCheckOutPenalty / 100);

    return (
      <View style={[styles.tableRow]}>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
        </View>
        <View style={[styles.tableCol, styles.tableColDescription]}>
          <Text style={[styles.tableRowText]}>
            Early Check-In/Late Check-Out Fee - {roomsx.lateCheckOutPenalty}%
          </Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}>
            {formatNumber(total)}{" "}
          </Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}>0</Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
        </View>
      </View>
    );
  };

  const renderQtyCategorized = (roomsx) => {
    const qty = roomsx.reduce((a, b) => a + b.quantity, 0);

    return formatNumber(qty);
  };

  const renderChargesCategorized = (roomsx) => {
    const transChargesDT = roomsx.reduce(
      (a, b) => a + b.quantity * b.product.sellingPrice,
      0
    );

    return formatNumber(transChargesDT);
  };

  const renderNetDiscountCategorized = (roomsx) => {
    const transDisc = roomsx.reduce((a, b) => a + b.netDiscount, 0);

    return formatNumber(transDisc);
  };

  const renderCategorized = (roomsx) => {
    let txx;

    if (isTrans === "true") {
      txx = trans.filter((n) => n.transHeader._id === roomsx.transHeader._id);
    } else {
      txx = trans.filter(
        (n) => n.reservationHeader._id === roomsx.reservationHeader._id
      );
    }

    if (!isDayTour) {
      if (isTrans === "true")
        txx = trans.filter((n) => n.transRoom.room._id === roomsx.room._id);
      else {
        txx = trans.filter(
          (n) => n.reservationRoomLine.room._id === roomsx.room._id
        );
      }
    }

    return (
      <div>
        <View style={[styles.tableRow, styles.productMargin]}>
          <View style={[styles.tableCol]}>
            <Text
              style={
                ([styles.tableRowText, styles.tableColSub],
                {
                  fontFamily: "Oswald",
                  fontWeight: 300,
                  fontSize: 11,
                })
              }
            >
              Accumulated Transactions
            </Text>
          </View>
          <View style={[styles.tableCol, styles.tableColDescription]}>
            <Text style={[styles.tableRowText]}></Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
          </View>
        </View>

        <View style={[styles.tableRow]}>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
          </View>
          <View style={[styles.tableCol, styles.tableColDescription]}>
            <Text style={[styles.tableRowText]}> </Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}>
              {renderQtyCategorized(txx)}
            </Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}>
              {renderChargesCategorized(txx)}
            </Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}>
              {renderNetDiscountCategorized(txx)}
            </Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
          </View>
        </View>
      </div>
    );
  };
  const renderBalance = () =>
    formatNumber(renderNetTotal(false) - renderTotalPayment(false));

  const renderProducts = (roomsx) => {
    if (isCategorized === "true") return renderCategorized(roomsx);

    return productCategories.map((pc) => {
      return trans.map((t) => {
        if (t.product.productCategoryId !== pc._id) return null;

        if (!isDayTour) {
          if (isTrans === "true") {
            //
            if (t.transRoom.room._id !== roomsx.room._id) return null;
            if (roomsx._id !== t.transRoom._id) return null;
          } else {
            //
            if (t.reservationRoomLine.room._id !== roomsx.room._id) return null;
            if (roomsx._id !== t.reservationRoomLine._id) return null;
          }
        }

        const data = isTrans === "true" ? t.transRoom : t.reservationRoomLine;

        return (
          <div key={t._id}>
            {renderCategory(pc, data)}

            <View style={[styles.tableRow]}>
              <View style={[styles.tableCol]}>
                <Text style={[styles.tableRowText, styles.tableColSub]}>
                  {moment(t.createdDate).format("MM-DD-YY")}
                </Text>
              </View>
              <View style={[styles.tableCol, styles.tableColDescription]}>
                <Text style={[styles.tableRowText]}>{t.product.longName}</Text>
              </View>
              <View style={[styles.tableCol]}>
                <Text style={[styles.tableRowText, styles.tableColSub]}>
                  {t.quantity}
                </Text>
              </View>
              <View style={[styles.tableCol]}>
                <Text style={[styles.tableRowText, styles.tableColSub]}>
                  {formatNumber(t.product.sellingPrice * t.quantity)}
                </Text>
              </View>
              <View style={[styles.tableCol]}>
                <Text style={[styles.tableRowText, styles.tableColSub]}>
                  {formatNumber(t.netDiscount)}
                </Text>
              </View>
              <View style={[styles.tableCol]}>
                <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
              </View>
            </View>
          </div>
        );
      });
    });
  };

  return (
    <Document title="Guest FolioX">
      <Page size="A4" style={styles.body}>
        <View>
          <View style={styles.rowResort}>
            <View style={[styles.resortWrapper]}>
              <View style={styles.rowRight}>
                <Text>Anilao Awari Bay Resort</Text>
              </View>
              <View style={styles.rowRight}>
                <Text>Brgy Solo, Mabini, Batangas Philippines</Text>
              </View>
              <View style={styles.rowRight}>
                <Text>+63 9177203915/ +63 9989940866</Text>
              </View>
              <View style={styles.rowRight}>
                <Text>www.anilaoawaribay.com</Text>
              </View>
              <View style={styles.rowRight}>
                <Text>TIN: 008-712-086-000</Text>
              </View>
            </View>

            <View style={styles.centerImage}>
              <Image style={styles.image} src="/img/awari.jpg" />
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.titleText}>Guest Folio</Text>
        </View>
        <View style={styles.rowCustomer}>
          <View>
            <View style={styles.customerText}>
              <Text>
                {header.customer.firstName} {header.customer.lastName}
              </Text>
            </View>
            <View>
              <Text style={styles.rowRight}>{header.customer.address}</Text>
            </View>
          </View>
          <View style={styles.rightBookingDetails}>
            <View>
              <Text>
                Date{"        "} :{"  "}
                {moment().format("MMM DD, YY")}
              </Text>
            </View>
            <View>
              <Text>
                Clerk {"       "}:{"  "}
                {user.firstName + " " + user.lastName}
              </Text>
            </View>
            <View>
              <Text>
                Total Pax{"  "}:{"  "}
                {renderTotalPax()}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.table}>
          {/* TableHeader */}
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, styles.tableColHeader]}>
              <Text style={[styles.tableHeader, styles.tableColSub]}>DATE</Text>
            </View>
            <View
              style={[
                styles.tableCol,
                styles.tableColHeader,
                styles.tableColDescription,
              ]}
            >
              <Text style={[styles.tableHeader]}>DESCRIPTION</Text>
            </View>
            <View style={[styles.tableCol, styles.tableColHeader]}>
              <Text style={[styles.tableHeader, styles.tableColSub]}>QTY</Text>
            </View>
            <View style={[styles.tableCol, styles.tableColHeader]}>
              <Text style={[styles.tableHeader, styles.tableColSub]}>
                CHARGES
              </Text>
            </View>
            <View style={[styles.tableCol, styles.tableColHeader]}>
              <Text style={[styles.tableHeader, styles.tableColSub]}>
                DISCOUNT
              </Text>
            </View>
            <View style={[styles.tableCol, styles.tableColHeader]}>
              <Text style={[styles.tableHeader, styles.tableColSub]}>
                CREDIT
              </Text>
            </View>
          </View>
          {rooms.map((roomsx) => {
            lastId = "";
            return (
              <div key={roomsx._id}>
                <View style={[styles.tableRow, styles.productMargin]}>
                  <View style={[styles.tableCol]}>
                    <Text
                      style={
                        ([styles.tableRowText, styles.tableColSub],
                        {
                          fontFamily: "Oswald",
                          fontWeight: 300,
                          fontSize: 11,
                        })
                      }
                    >
                      Room
                    </Text>
                  </View>
                  <View style={[styles.tableCol, styles.tableColDescription]}>
                    <Text style={[styles.tableRowText]}></Text>
                  </View>
                  <View style={[styles.tableCol]}>
                    <Text
                      style={[styles.tableRowText, styles.tableColSub]}
                    ></Text>
                  </View>
                  <View style={[styles.tableCol]}>
                    <Text
                      style={[styles.tableRowText, styles.tableColSub]}
                    ></Text>
                  </View>
                  <View style={[styles.tableCol]}>
                    <Text
                      style={[styles.tableRowText, styles.tableColSub]}
                    ></Text>
                  </View>
                </View>

                {renderRoom(roomsx)}

                {renderRoomLateCheckOut(roomsx)}

                {renderDayTourLine(roomsx)}

                {renderMattress(roomsx)}

                {renderProducts(roomsx)}

                <View style={[styles.tableRow, styles.subMargin]}>
                  <View style={[styles.tableCol]}>
                    <Text
                      style={[styles.tableRowText, styles.tableColSub]}
                    ></Text>
                  </View>
                  <View style={[styles.tableCol, styles.tableColDescription]}>
                    <Text style={[styles.tableRowText]}></Text>
                  </View>
                  <View style={[styles.tableCol]}>
                    <Text
                      style={[styles.tableRowText, styles.tableColSub]}
                    ></Text>
                  </View>
                  <View style={[styles.tableCol]}>
                    <Text
                      style={[styles.tableRowText, styles.tableColSub]}
                    ></Text>
                  </View>
                  <View style={[styles.tableCol]}>
                    <Text style={[styles.tableRowText, styles.tableColSub]}>
                      SUBTOTAL
                    </Text>
                  </View>
                  <View style={[styles.tableCol]}>
                    <Text
                      style={[
                        styles.tableRowText,
                        styles.tableColSub,
                        { fontSize: 13 },
                      ]}
                    >
                      {renderRoomsxSubTotal(roomsx)}
                    </Text>
                  </View>
                </View>
                <View style={styles.borderTotal}></View>
              </div>
            );
          })}
          <View style={[styles.tableRow, styles.productMargin]}>
            <View style={[styles.tableCol]}>
              <Text
                style={
                  ([styles.tableRowText, styles.tableColSub],
                  {
                    fontFamily: "Oswald",
                    fontWeight: 300,
                    fontSize: 11,
                  })
                }
              >
                Payment
              </Text>
            </View>
            <View style={[styles.tableCol, styles.tableColDescription]}>
              <Text style={[styles.tableRowText]}></Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
            </View>
          </View>

          {payments.map((p) => renderPaymentName(p))}

          <View style={[styles.tableRow, styles.subMargin]}>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
            </View>
            <View style={[styles.tableCol, styles.tableColDescription]}>
              <Text style={[styles.tableRowText]}></Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}>
                SUBTOTAL
              </Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text
                style={[
                  styles.tableRowText,
                  styles.tableColSub,
                  { fontSize: 13 },
                ]}
              >
                {renderTotalPayment()}
              </Text>
            </View>
          </View>
          <View style={styles.borderTotal}></View>
          <View style={[styles.tableRow]}>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
            </View>
            <View style={[styles.tableCol, styles.tableColDescription]}>
              <Text style={[styles.tableRowText]}></Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}>
                GROSS {"\n"} AMOUNT
              </Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text
                style={[
                  styles.tableRowText,
                  styles.tableColSub,
                  { fontSize: 13 },
                ]}
              >
                {renderGrossAmount()}
              </Text>
            </View>
          </View>
          <View style={[styles.tableRow]}>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
            </View>
            <View style={[styles.tableCol, styles.tableColDescription]}>
              <Text style={[styles.tableRowText]}></Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}>
                NET {"\n"}DISCOUNT
              </Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text
                style={[
                  styles.tableRowText,
                  styles.tableColSub,
                  { fontSize: 13 },
                ]}
              >
                {renderNetDiscount()}
              </Text>
            </View>
          </View>
          <View style={[styles.tableRow, styles.subMargin]}>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
            </View>
            <View style={[styles.tableCol, styles.tableColDescription]}>
              <Text style={[styles.tableRowText]}></Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}>
                TOTAL
              </Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text
                style={[
                  styles.tableRowText,
                  styles.tableColSub,
                  { fontSize: 15 },
                ]}
              >
                {renderNetTotal()}
              </Text>
            </View>
          </View>
          <View style={[styles.tableRow]}>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
            </View>
            <View style={[styles.tableCol, styles.tableColDescription]}>
              <Text style={[styles.tableRowText]}></Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}></Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}>
                BALANCE
              </Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text
                style={[
                  styles.tableRowText,
                  styles.tableColSub,
                  { fontSize: 13 },
                ]}
              >
                {renderBalance()}
              </Text>
            </View>
          </View>

          <View style={styles.rowCustomer}>
            <Text style={[styles.tableRowText]}>
              I agree that I am personally liable for the payment of the
              following statement and if the person, company or association
              indicated by me as being responsible for payment of the same does
              not do so, that my liability for such payment shall be joint and
              several with such person, company or association.
            </Text>
          </View>

          <View style={styles.rowCustomer}>
            <Text
              style={[
                styles.tableRowText,
                { paddingTop: 5, paddingBottom: 10 },
              ]}
            >
              I have checked all entries in this payment and have determined
              that all entries are correct.
            </Text>
          </View>

          <View style={styles.rowCustomer}>
            <View style={{ borderTop: 1 }}>
              <View
                style={[
                  styles.customerText,
                  styles.fontSmall,
                  {
                    textAlign: "center",
                    margin: "auto",
                    marginTop: 5,
                    marginBottom: 5,
                  },
                ]}
              >
                <Text> Printed Name over Signature</Text>
              </View>
              <View>
                <Text style={[styles.fontSmall, { marginTop: 0 }]}>
                  This does not serve as your official receipt.
                </Text>
              </View>
            </View>
            <View style={[styles.rightBookingDetails]}>
              <View>
                <Text style={[styles.fontSmall, { fontStyle: "italic font" }]}>
                  THANK YOU FOR STAYING WITH ANILAO AWARI BAY RESORT
                </Text>
              </View>
              <View>
                <Text> </Text>
              </View>
              <View>
                <Text> </Text>
              </View>
            </View>
          </View>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

const SOA = () => {
  const isMounted = useMountedState();
  const { id: headerId, istrans, isCategorized } = useParams();
  const [rooms, setRooms] = useState([]);
  const [trans, setTrans] = useState([]);
  const [header, setHeader] = useState({});
  const [payments, setPayments] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [initialLoading, setInitialLoading] = useState(false);
  const [productCategories, setProductCategories] = useState([]);

  useEffect(() => {
    //..
    async function fetchProductDetails() {
      try {
        const { data } = await getProdCategory();
        const { token, listRecords } = data;
        store.dispatch(writeToken({ token }));

        if (isMounted()) {
          setProductCategories(listRecords);
        }
        //
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchData() {
      try {
        const { data } = await GetHeadersWithFullDetails(headerId);
        const { token, header, payments, rooms, trans } = data;

        store.dispatch(writeToken({ token }));

        if (isMounted()) {
          const sortedTrans = trans.sort((a, b) =>
            a.product.productCategoryId.localeCompare(
              b.product.productCategoryId
            )
          );

          setPayments(payments);
          setTrans(sortedTrans);
          setRooms(rooms);
          setHeader(header);
          setInitialLoading(true);
        }
        //
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchDataTrans() {
      try {
        const { data } = await GetTransWithFullDetails(headerId);
        const { token, header, payments, rooms, trans } = data;
        store.dispatch(writeToken({ token }));

        if (isMounted()) {
          const sortedTrans = trans.sort((a, b) =>
            a.product.productCategoryId.localeCompare(
              b.product.productCategoryId
            )
          );

          setPayments(payments);
          setTrans(sortedTrans);
          setRooms(rooms);
          setHeader(header);
          setInitialLoading(true);
        }
        //
      } catch (error) {
        console.log(error);
      }
    }

    setCurrentUser(store.getState().entities.user.user);

    fetchProductDetails();
    if (istrans === "true") fetchDataTrans();
    else fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!initialLoading) return null;
  const isDayTour =
    header.reservationType.name === "Day Tour" ||
    header.reservationType.name === "Night Tour" ||
    header.reservationType.name === "Restaurant"
      ? true
      : false;

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <SOAe
        isDayTour={isDayTour}
        dayTourType={header.reservationType.name}
        rooms={rooms}
        header={header}
        trans={trans}
        payments={payments}
        isTrans={istrans}
        isCategorized={isCategorized}
        user={currentUser}
        productCategories={productCategories}
      />
    </PDFViewer>
  );
};

export default SOA;
