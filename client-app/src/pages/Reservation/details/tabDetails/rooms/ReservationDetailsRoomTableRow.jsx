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

  return (
    <TableBody>
      {stableSort(rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          //..
          const isItemSelected = isSelected(row._id);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              hover
              onClick={(event) => handleClick(event, row._id)}
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
                <span className={classes.rowSpan}>{row.pax}</span>
              </TableCell>
              <TableCell align="right">
                <span className={classes.rowSpan}>{row.totalAmount}</span>
              </TableCell>
              <TableCell align="right">
                {moment(row.startDate).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell align="right">
                {moment(row.endDate).format("YYYY-MM-DD")}
              </TableCell>

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
