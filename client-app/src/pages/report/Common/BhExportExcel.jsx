import React from "react";
import { Button } from "@material-ui/core";
import ReactExport from "react-data-export";
import FileDownloadTwoToneIcon from "@mui/icons-material/FileDownloadTwoTone";
import moment from "moment";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const formatNumber = (num) =>
  Intl.NumberFormat().format(Number(num).toFixed(2));

const initializeDetailedDataSet = (data) => {
  if (data.length === 0) return [];

  let preData = [];
  let lastDate = null;
  let dateToStamp = "";

  const sortedData = data.sort(function (a, b) {
    return new Date(a.checkOutDate) - new Date(b.checkOutDate);
  });

  sortedData.map((n) => {
    let currentCheckOutDate = moment(n.checkOutDate).format("MMMM DD");

    if (lastDate === currentCheckOutDate) dateToStamp = "";
    else {
      dateToStamp = currentCheckOutDate;

      const netValue = getNetAmounAndServiceChargetForSpecificDate(
        currentCheckOutDate,
        data
      );
      const leadRowValue = [
        { value: dateToStamp },
        { value: netValue.netAmount },
        { value: netValue.serviceCharge },
        { value: "" },
        { value: "" },
      ];

      preData.push(leadRowValue);
    }

    lastDate = currentCheckOutDate;

    const value = [
      { value: "" },
      { value: "" },
      { value: "" },
      { value: n.customer.firstName + " " + n.customer.lastName },
      { value: formatNumber(n.netAmount) },
    ];

    return preData.push(value);
  });

  return preData;
};

const getNetAmounAndServiceChargetForSpecificDate = (date, data) => {
  const filteredData = data.filter(
    (n) => date === moment(n.checkOutDate).format("MMMM DD")
  );

  const netAmount = filteredData.reduce((a, b) => a + b.netAmount, 0);

  const serviceCharge = (netAmount / 100) * 10;

  return {
    netAmount: formatNumber(netAmount),
    serviceCharge: formatNumber(serviceCharge),
  };
};

const BhExportExcel = ({ onExportBtnDate = [], onExportBtnData = [] }) => {
  //..

  const getServiceChargeSummary = () => {
    const netAmount = onExportBtnData.reduce((a, b) => a + b.netAmount, 0);

    const total = (netAmount / 100) * 10;

    return formatNumber(total);
  };

  const handleComputeTotalEarningSummary = () =>
    formatNumber(onExportBtnData.reduce((a, b) => a + b.netAmount, 0));

  const summaryDataSet = [
    {
      columns: [
        {
          title: "Date",
          width: { wch: 40 },
          style: {
            font: { sz: "14", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "D9D9D9" } },
          },
        },
        {
          title: "Sales",
          width: { wch: 40 },
          style: {
            font: { sz: "14", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "D9D9D9" } },
          },
        },
        {
          title: "Service Charge",
          width: { wch: 30 },
          style: {
            font: { sz: "14", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "D9D9D9" } },
          },
        },
      ],
      data: [
        [
          {
            value:
              moment(onExportBtnDate.fromDate).format("MMMM DD, YY") +
              " - " +
              moment(onExportBtnDate.toDate).format("MMMM DD, YY"),
          },
          { value: handleComputeTotalEarningSummary() },
          {
            value: getServiceChargeSummary(),
          },
        ],
      ],
    },
  ];

  const detailedDataSet = [
    {
      columns: [
        {
          title: "Date",
          width: { wch: 25 },
          style: {
            font: { sz: "14", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "D9D9D9" } },
          },
        },
        {
          title: "Sales",
          width: { wch: 25 },
          style: {
            font: { sz: "14", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "D9D9D9" } },
          },
        },
        {
          title: "Service Charge",
          width: { wch: 25 },
          style: {
            font: { sz: "14", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "D9D9D9" } },
          },
        },
        {
          title: "Guest name",
          width: { wch: 25 },
          style: {
            font: { sz: "14", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "D9D9D9" } },
          },
        },
        {
          title: "Amount",
          width: { wch: 30 },
          style: {
            font: { sz: "14", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "D9D9D9" } },
          },
        },
      ],
      data: initializeDetailedDataSet(onExportBtnData),
    },
  ];

  const RenderDownloadBtnExcel = () => {
    return (
      <Button
        variant="text"
        color="default"
        startIcon={<FileDownloadTwoToneIcon style={{ fill: "#B39DDB" }} />}
      >
        Export
      </Button>
    );
  };

  return (
    <>
      <ExcelFile element={<RenderDownloadBtnExcel />}>
        <ExcelSheet dataSet={summaryDataSet} name="Summary" />
        <ExcelSheet dataSet={detailedDataSet} name="Detailed" />
      </ExcelFile>
    </>
  );
};

export default BhExportExcel;
