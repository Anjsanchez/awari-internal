import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ActiveButton from "./../../../common/form/ActiveButton";
import EditDeleteIconButton from "../../../common/form/EditDeleteIconButton";
import { TableBody, TableCell, TableRow, Checkbox } from "@material-ui/core";

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
  numberOfRooms__restaurant: {
    color: "#0277BD",
    background: "#E1F5FE",
    padding: "5px 20px",
    borderRadius: "20px",
  },
  numberOfRooms__zero: {
    color: "#d84315",
    background: "#fbe9e780",
    padding: "5px 20px",
    borderRadius: "20px",
  },
  numberOfRooms__nonZero: {
    color: "#00c853",
    background: "#b9f6ca60",
    padding: "5px 20px",
    borderRadius: "20px",
  },
}));

const ActiveBookingTblRows = (props) => {
  //..
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
    handleDelete,
  } = props;

  const RenderRoomCount = (item) => {
    const { name } = item.reservationType;
    const typeInlower = name.toLowerCase();

    if (typeInlower === "day tour" || typeInlower === "restaurant")
      return (
        <span className={classes.numberOfRooms__restaurant}>
          {item.roomCount}
        </span>
      );

    if (item.roomCount === 0)
      return (
        <span className={classes.numberOfRooms__zero}>{item.roomCount}</span>
      );

    return (
      <span className={classes.numberOfRooms__nonZero}>{item.roomCount}</span>
    );
  };

  const renderActiveReservationStatus = (row) => {
    if (row.isActive) return <ActiveButton value={true} />;

    return <ActiveButton isWarning={true} textTrue="Pending" />;
  };
  return (
    <TableBody>
      {stableSort(rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
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
              <TableCell padding="checkbox" color="blue">
                <Checkbox
                  checked={isItemSelected}
                  inputProps={{ "aria-labelledby": labelId }}
                  color="primary"
                />
              </TableCell>
              <TableCell component="th" id={labelId} scope="row" padding="none">
                <Link
                  to={`/a/reservation-management/reservations/${row._id}`}
                  className={`${classes.rowSpan} ${classes.linkName}`}
                >
                  <span className={`${classes.rowSpan} ${classes.linkName}`}>
                    {row.customer.firstName} {row.customer.lastName}
                  </span>
                </Link>
              </TableCell>
              <TableCell align="right">
                <span className={classes.rowSpan}>
                  {row.reservationType.name}
                </span>
              </TableCell>
              <TableCell align="right">{RenderRoomCount(row)}</TableCell>
              <TableCell align="right">
                <span className={classes.rowSpan}>
                  {moment(row.createdDate).format("MMMM Do, YYYY")}
                </span>
              </TableCell>
              <TableCell align="right">
                {renderActiveReservationStatus(row)}
              </TableCell>
              <TableCell align="right">
                <EditDeleteIconButton
                  rowId={row._id}
                  showDelete={false}
                  handleDelete={handleDelete}
                  linkPath={`/a/reservation-management/reservations/${row._id}`}
                />
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

export default ActiveBookingTblRows;
