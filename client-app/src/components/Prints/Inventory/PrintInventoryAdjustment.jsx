import moment from "moment";
import { useMountedState } from "react-use";
import { useParams } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import { store } from "../../../utils/store/configureStore";
import { writeToken } from "../../../utils/store/pages/users";
import { getProdCategory } from "../../../utils/services/pages/products/ProductCategoryService";
import {
  Page,
  Text,
  Font,
  Document,
  StyleSheet,
  Image,
  View,
} from "@react-pdf/renderer";
import {
  GetInvAdjHeaderAndLine,
  GetPurchaseOrderHeaderAndLine,
} from "../../../utils/services/pages/inventory/InventoryService";

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
    paddingTop: 5,
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
    width: 180,
  },
  tableColSub: {
    textAlign: "left",
    width: 110,
  },
  tableColSubMini: {
    width: 70,
  },
  tableColNote: {
    width: 190,
  },
  tableRowText: {
    fontSize: 10,
    marginTop: 2,
    marginBottom: 2,
  },
  tableRowBorder: {
    border: "1px solid black",
    paddingLeft: "10px",
    marginBottom: "10px",
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
  marginLeft: {
    marginLeft: 14,
  },
  //END
});

const DocumentBody = ({ header, lines }) => {
  const {
    requestedBy,
    requestDate,
    approvalStatus,
    approvedBy,
    approvedDate,
    adjustmentType,
    reason,
  } = header;
  const RenderPurchLines = (data) => {
    const {
      inventoryMaster,
      note,
      quantity,
      adjustmentAction,
      inventoryLocation,
    } = data;
    return (
      <View style={[styles.tableRow, styles.marginLeft]} key={1 + data._id}>
        <View style={[styles.tableCol, styles.tableColDescription]}>
          <Text style={[styles.tableRowText]}>{inventoryMaster.name}</Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text
            style={[
              styles.tableRowText,
              styles.tableColSub,
              styles.tableColSubMini,
            ]}
          >
            {inventoryMaster.inventoryUnit.name}
          </Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}>
            {quantity}
          </Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}>
            {adjustmentAction}
          </Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}>
            {inventoryLocation}
          </Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={[styles.tableRowText, styles.tableColSub]}>{note}</Text>
        </View>
      </View>
    );
  };

  return (
    <Document title="Guest Folio">
      <Page size="A4" orientation="landscape" style={styles.body}>
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
          <Text style={styles.titleText}>Inventory Adjustment</Text>
        </View>
        <View style={styles.rowCustomer}>
          <View style={styles.rightBookingDetails}>
            <View>
              <Text>
                Reason{"              "} {"     "}
                {reason}
              </Text>
            </View>
            <View>
              <Text>
                Type{"                   "} {"     "}
                {adjustmentType}
              </Text>
            </View>
            <View>
              <Text>
                Requested By {"    "} {"   "} {requestedBy.firstName}{" "}
                {requestedBy.lastName}
              </Text>
            </View>
            <View>
              <Text>
                Requested Date{"   "} {"  "}
                {moment(requestDate).format("MMM DD, YY")}
              </Text>
            </View>
          </View>
          <View style={styles.rightBookingDetails}>
            <View>
              <Text>
                Approval Status{"  "} {"  "}
                {approvalStatus}
              </Text>
            </View>
            <View>
              <Text>
                Approved By {"     "}
                {"   "} {approvedBy && approvedBy.firstName}{" "}
                {approvedBy && approvedBy.lastName}
              </Text>
            </View>
            <View>
              <Text>
                Approved Date{"    "}
                {"  "} {approvedBy && moment(approvedDate).format("MMM DD, YY")}
              </Text>
            </View>
            <View>
              <Text>
                Generated Date{"  "}
                {"   "}
                {moment().format("MMM DD, YY")}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.table}>
          {/* //COLUMNS */}

          <View style={[styles.tableRow, styles.tableRowBorder]}>
            <View style={[styles.tableCol, styles.tableColDescription]}>
              <Text style={[styles.tableHeader]}>INVENTORY NAME</Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text
                style={[
                  styles.tableHeader,
                  styles.tableColSub,
                  styles.tableColSubMini,
                ]}
              >
                UNIT
              </Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableHeader, styles.tableColSub]}>
                Requested Quantity
              </Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableHeader, styles.tableColSub]}>
                Adjustment Action
              </Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text style={[styles.tableHeader, styles.tableColSub]}>
                Inventory Location
              </Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text
                style={[
                  styles.tableHeader,
                  styles.tableColSub,
                  styles.tableColDescription,
                ]}
              >
                Note
              </Text>
            </View>
          </View>
        </View>

        {lines.map((n) => RenderPurchLines(n))}

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

const PrintInventoryAdjustment = () => {
  const isMounted = useMountedState();
  const { id: headerId } = useParams();
  const [headerData, setHeaderData] = useState({});
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    //..
    async function getData() {
      try {
        const { data } = await GetInvAdjHeaderAndLine(headerId);
        const { header, lines } = data.singleRecord;

        if (isMounted()) {
          setHeaderData(header);
          setLineData(lines);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (Object.keys(headerData).length == 0) return null;

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <DocumentBody header={headerData} lines={lineData} />
    </PDFViewer>
  );
};

export default PrintInventoryAdjustment;
