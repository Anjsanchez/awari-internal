import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { TableBody, TableCell, TableRow } from "@material-ui/core";
import ActiveButton from "../../../../../common/form/ActiveButton";

const useStyles = makeStyles((theme) => ({
  selected: {
    backgroundColor: "#F2F3FB !important",
  },
  popover: {
    pointerEvents: "none",
  },
  rowSpan: {
    fontFamily: `"Poppins", sans-serif`,
    fontSize: " 0.850rem",
    fontWeight: 400,
    color: "rgb(23, 43, 77)",
  },
  linkName: {
    display: "flex",
    textDecoration: "none",
    color: "rgb(86, 100, 210) !important",
    cursor: "pointer",
  },
}));

const ReservationDetailsRoomTableRow = (props) => {
  const classes = useStyles();

  const {
    order,
    rows,
    orderBy,
    page,
    rowsPerPage,
    handleClick,
    stableSort,
    getComparator,
    isSelected,
    emptyRows,
  } = props;

  const renderEndDate = (date) => {
    //
    var dateInMoment = moment(date).format("YYYY-MM-DD");

    var isSameDay = moment(date).isSame(moment(), "day");
    if (isSameDay)
      return (
        <ActiveButton value={true} isWarning={true} textTrue={dateInMoment} />
      );

    var isAfter = moment(date).isSameOrBefore(moment(), "day");
    if (isAfter) return <ActiveButton value={false} textFalse={dateInMoment} />;

    return <span style={{ padding: "5px 10px" }}>{dateInMoment} </span>;
  };

  const renderStartDate = (date) => {
    //
    var dateInMoment = moment(date).format("YYYY-MM-DD");

    var isSameDay = moment(date).isSame(moment(), "day");
    if (isSameDay) return <ActiveButton value={true} textTrue={dateInMoment} />;

    var isAfter = moment(date).isSameOrBefore(moment(), "day");
    if (isAfter)
      return <ActiveButton isWarning={true} textTrue={dateInMoment} />;

    return <span style={{ padding: "5px 10px" }}>{dateInMoment} </span>;
  };

  const renderPax = (obj) => {
    const { childrenPax, adultPax, seniorPax } = obj;
    return childrenPax + adultPax + seniorPax;
  };

  const renderTotalAmountRows = (row) => {
    const { adultPax, seniorPax } = row;
    const totalHeadsForDiscount = adultPax + seniorPax;

    let grossAmount = row.grossAmount;
    let netDiscount = 0;
    let lateCheckOutAmount = 0;

    //check kung may latediscount ung room
    if (row.lateCheckOutPenalty != 0) {
      lateCheckOutAmount =
        row.roomPricing.sellingPrice * (row.lateCheckOutPenalty / 100);
      grossAmount += lateCheckOutAmount;
    }

    const amtHalf = grossAmount / totalHeadsForDiscount;

    if (seniorPax === 0 && row.discount !== null && row.discount._id === 0)
      return row.totalAmount;

    //Vat Free Discount Calculation
    if (
      row.discount !== null &&
      row.discount._id !== 0 &&
      row.discount.name.toLowerCase().includes("vat free")
    ) {
      const discAmount12 = grossAmount / 1.12;

      const netDisc = grossAmount - discAmount12;
      netDiscount += netDisc;
    } else if (seniorPax !== 0) {
      const amtMulSenior = amtHalf * seniorPax;

      const discAmount12 = amtMulSenior / 1.12;
      const discAmount20 = discAmount12 * 0.8;

      netDiscount += amtMulSenior - discAmount20;
    } else if (row.discount !== null && row.discount._id !== 0) {
      let amtMulAdult = amtHalf * adultPax;
      amtMulAdult += row.mattress;
      netDiscount += amtMulAdult * (row.discount.value / 100);
    }
    return Number(grossAmount - netDiscount).toFixed(2);
  };

  return (
    <TableBody style={{ width: "100%" }}>
      {stableSort(rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          //..
          const isItemSelected = isSelected(row._id);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              hover
              onClick={(event) => handleClick(event, row._id, row)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row._id}
              selected={isItemSelected}
              classes={{ selected: classes.selected }}
              style={
                index % 2 ? { background: "#fafafa" } : { background: "white" }
              }
            >
              <TableCell component="th" scope="row" padding="none"></TableCell>
              <TableCell component="th" id={labelId} scope="row" padding="none">
                {row.room.roomLongName}
              </TableCell>
              <TableCell align="right">
                <span className={classes.rowSpan}>{renderPax(row)}</span>
              </TableCell>
              <TableCell align="right">
                <span className={classes.rowSpan}>
                  {Intl.NumberFormat().format(
                    Number(renderTotalAmountRows(row)).toFixed(2)
                  )}
                </span>
              </TableCell>
              <TableCell align="right">
                {renderStartDate(row.startDate)}
              </TableCell>
              <TableCell align="right">{renderEndDate(row.endDate)}</TableCell>

              <TableCell align="right"></TableCell>
            </TableRow>
          );
        })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};

export default ReservationDetailsRoomTableRow;
