import React from "react";
import {
  Page,
  Text,
  Font,
  Document,
  StyleSheet,
  Image,
  View,
} from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";

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
    marginTop: 5,
    marginBottom: 5,
  },
  groupByText: {
    fontWeight: "1200",
  },
  //END
});

const SOAe = () => {
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
              <Text>Angelo Sanchez</Text>
            </View>
            <View>
              <Text style={styles.rowRight}>KM51 Gatbuca Calumpit Bulacan</Text>
            </View>
          </View>
          <View style={styles.rightBookingDetails}>
            <View>
              <Text>
                Date{"     "} :{"  "}Aug 01, 2021
              </Text>
            </View>
            <View>
              <Text>
                Clerk {"    "}:{"  "}Patricia Rose Pangan
              </Text>
            </View>
            <View>
              <Text>
                IN{"          "}:{"  "}Aug 01, 2021 — OUT{"  "}:{"  "}Aug 03,
                2021
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
                DISCOUNT
              </Text>
            </View>
            <View style={[styles.tableCol, styles.tableColHeader]}>
              <Text style={[styles.tableHeader, styles.tableColSub]}>
                CHARGES
              </Text>
            </View>
            <View style={[styles.tableCol, styles.tableColHeader]}>
              <Text style={[styles.tableHeader, styles.tableColSub]}>
                CREDIT
              </Text>
            </View>
          </View>

          {/* CONTENT */}
          <View style={[styles.tableRow]}>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}>
                09-09-2021
              </Text>
            </View>
            <View style={[styles.tableCol, styles.tableColDescription]}>
              <Text style={[styles.tableRowText]}>Cluster Room 1</Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}>1</Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}>0</Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableRowText, styles.tableColSub]}>
                15,030
              </Text>
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
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <SOAe />
    </PDFViewer>
  );
};

export default SOA;
