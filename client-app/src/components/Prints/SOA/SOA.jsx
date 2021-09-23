import moment from "moment";
import { useMountedState } from "react-use";
import { useParams } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import { store } from "../../../utils/store/configureStore";
import { writeToken } from "../../../utils/store/pages/users";
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
});

const styles = StyleSheet.create({
  body: {
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
  payments,
  productCategories,
  user,
  isDayTour,
}) => {
  const formatNumber = (num) =>
    Intl.NumberFormat().format(Number(num).toFixed(2));

  let lastId = "0";
  const renderCategory = (pc, roomId) => {
    if (!isDayTour) {
      if (!roomId.room._id) return null;
    }

    if (lastId === pc._id) return null;

    lastId = pc._id;

    return (
      <View style={[styles.tableRow, styles.productMargin]}>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}>
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
            {p.payment.name}{" "}
            {p.paymentRefNum.trim() && " —  " + p.paymentRefNum}
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

  const renderTotalCharges = (d, isFormatted = true) => {
    const roomCharges = d.grossAmount + d.mattress * 2420;

    if (isDayTour) {
      const transOfThisRoomDT = trans.filter(
        (n) => n.reservationHeader._id === d.reservationHeader._id
      );

      const transChargesDT = transOfThisRoomDT.reduce(
        (a, b) => a + b.quantity * b.product.sellingPrice,
        0
      );

      const totalDT = roomCharges + transChargesDT;

      if (!isFormatted) return totalDT;
      return formatNumber(totalDT);
    }

    const transOfThisRoom = trans.filter(
      (n) => n.reservationRoomLine._id === d._id
    );

    const transCharges = transOfThisRoom.reduce(
      (a, b) => a + b.quantity * b.product.sellingPrice,
      0
    );

    const total = roomCharges + transCharges;

    if (!isFormatted) return total;
    return formatNumber(total);
  };

  const renderTotalDiscount = (d, isFormatted = true) => {
    const roomDiscount = d.totalDiscount;

    if (isDayTour) {
      const transOfThisRoomDT = trans.filter(
        (n) => n.reservationHeader._id === d.reservationHeader._id
      );

      const transDiscountDT = transOfThisRoomDT.reduce(
        (a, b) => a + b.netDiscount,
        0
      );

      const totalDT = roomDiscount + transDiscountDT;

      if (!isFormatted) return totalDT;
      return formatNumber(totalDT);
    }

    const transOfThisRoom = trans.filter(
      (n) => n.reservationRoomLine._id === d._id
    );
    const transDiscount = transOfThisRoom.reduce(
      (a, b) => a + b.netDiscount,
      0
    );

    const total = roomDiscount + transDiscount;

    if (!isFormatted) return total;
    return formatNumber(total);
  };

  const renderTotalSubTotal = (d) => {
    const totalCharges = renderTotalCharges(d, false);
    const totalDiscount = renderTotalDiscount(d, false);

    return formatNumber(totalCharges - totalDiscount);
  };

  const renderTotalPayment = (isFormatted = true) => {
    const totalPayment = payments.reduce((a, b) => a + b.amount, 0);

    if (!isFormatted) return totalPayment;
    return formatNumber(totalPayment);
  };

  const renderNetTotal = (isFormatted = true) => {
    const grossAmountRooms = rooms.reduce(
      (a, b) => a + b.grossAmount + b.mattress * 2420 - b.totalDiscount,
      0
    );

    const grossAmountTrans = trans.reduce(
      (a, b) => a + b.quantity * b.product.sellingPrice - b.netDiscount,
      0
    );

    const total = grossAmountRooms + grossAmountTrans;
    if (!isFormatted) return total;
    return formatNumber(total);
  };

  const renderTotalPax = () => {
    const grossAmountRooms = rooms.reduce(
      (a, b) => a + b.adultPax + b.seniorPax,
      0
    );

    return grossAmountRooms;
  };

  const renderRoom = (roomsx) => {
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
              {header.reservationType.name}
            </Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}>
              {renderTotalPax()}
            </Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text style={[styles.tableRowText, styles.tableColSub]}>
              {formatNumber(roomsx.grossAmount)}
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
          <Text style={[styles.tableRowText, styles.tableColSub]}>
            {formatNumber(roomsx.grossAmount)}
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
    );
  };
  const renderBalance = () =>
    formatNumber(renderNetTotal(false) - renderTotalPayment(false));

  return (
    <Document title="Guest Folio">
      <Page size="A4" style={styles.body}>
        <View>
          <View style={styles.rowResort}>
            <View style={[styles.resortWrapper]}>
              <View style={styles.rowRight}>
                <Text>Awari Anilao Bay Resort</Text>
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
                    <Text style={[styles.tableRowText, styles.tableColSub]}>
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

                {renderMattress(roomsx)}
                {/* GROUP BY */}
                {productCategories.map((pc) => {
                  return trans.map((t) => {
                    if (t.product.productCategoryId !== pc._id) return null;

                    if (!isDayTour) {
                      if (t.reservationRoomLine.room._id !== roomsx.room._id)
                        return null;

                      if (roomsx._id !== t.reservationRoomLine._id) return 0;
                    }

                    return (
                      <div key={t._id}>
                        {renderCategory(pc, t.reservationRoomLine)}

                        <View style={[styles.tableRow]}>
                          <View style={[styles.tableCol]}>
                            <Text
                              style={[styles.tableRowText, styles.tableColSub]}
                            >
                              {moment(t.createdDate).format("MM-DD-YY")}
                            </Text>
                          </View>
                          <View
                            style={[
                              styles.tableCol,
                              styles.tableColDescription,
                            ]}
                          >
                            <Text style={[styles.tableRowText]}>
                              {t.product.longName}
                            </Text>
                          </View>
                          <View style={[styles.tableCol]}>
                            <Text
                              style={[styles.tableRowText, styles.tableColSub]}
                            >
                              {t.quantity}
                            </Text>
                          </View>
                          <View style={[styles.tableCol]}>
                            <Text
                              style={[styles.tableRowText, styles.tableColSub]}
                            >
                              {formatNumber(
                                t.product.sellingPrice * t.quantity
                              )}
                            </Text>
                          </View>
                          <View style={[styles.tableCol]}>
                            <Text
                              style={[styles.tableRowText, styles.tableColSub]}
                            >
                              {formatNumber(t.netDiscount)}
                            </Text>
                          </View>
                          <View style={[styles.tableCol]}>
                            <Text
                              style={[styles.tableRowText, styles.tableColSub]}
                            ></Text>
                          </View>
                        </View>
                      </div>
                    );
                  });
                })}
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
                      {renderTotalSubTotal(roomsx)}
                    </Text>
                  </View>
                </View>
                <View style={styles.borderTotal}></View>
              </div>
            );
          })}
          {/* GROUP BY */}
          <View style={[styles.tableRow, styles.productMargin]}>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}>
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
              indicated by me as being responsibke for payment of the same does
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
                <Text style={styles.fontSmall}>
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
  const { id: headerId } = useParams();
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

    setCurrentUser(store.getState().entities.user.user);
    fetchProductDetails();
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!initialLoading) return null;

  const isDayTour =
    header.reservationType.name === "Day Tour" ||
    header.reservationType.name === "Restaurant"
      ? true
      : false;

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <SOAe
        isDayTour={isDayTour}
        rooms={rooms}
        header={header}
        trans={trans}
        payments={payments}
        user={currentUser}
        productCategories={productCategories}
      />
    </PDFViewer>
  );
};

export default SOA;
