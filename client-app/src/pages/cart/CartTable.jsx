import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button, ButtonGroup, Tooltip, IconButton } from "@material-ui/core";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import ConfirmationNumberTwoToneIcon from "@material-ui/icons/ConfirmationNumberTwoTone";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const CartTable = () => {
  //..

  return (
    <div className="ct-header__container">
      <TableContainer>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Discount</TableCell>
              <TableCell align="left">Total</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={2} className="ct-tblRow__container">
              <TableCell
                component="th"
                scope="row"
                className="ct-tableCell__wrapper"
              >
                <div className="ct-rowProduct_container">
                  <img
                    src="https://images.pexels.com/photos/6896058/pexels-photo-6896058.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    alt=""
                    className="ct-rowProduct_img"
                  />
                  <div className="ct-rowProduct_wrapper">
                    <span className="ct-rowProduct-titleSpan">
                      Anilao Awari Bay Adobo
                    </span>
                    <span className="ct-rowProduct-subTitleSpan">hehe</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="ct-tableCell__wrapper" align="right">
                <span className="ct-rowProduct-titleSpan">₱19.20</span>
              </TableCell>
              <TableCell className="ct-tableCell__wrapper" align="right">
                <ButtonGroup aria-label="small outlined button group">
                  <Button className="ct-btnGrp-btnLeft">-</Button>
                  <Button className="ct-btnGrp-btnRight span">15</Button>
                  <Button className="ct-btnGrp-btnRight">+</Button>
                </ButtonGroup>
              </TableCell>
              <TableCell className="ct-tableCell__wrapper" align="right">
                <span className="ct-rowProduct-titleSpan">₱19.20</span>
              </TableCell>
              <TableCell className="ct-tableCell__wrapper" align="left">
                <span className="ct-rowProduct-titleSpan">₱19.20</span>
              </TableCell>
              <TableCell className="ct-tableCell__wrapper" align="right">
                <Tooltip title="Discount" placement="top">
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    className="navbar_iconBtn"
                  >
                    <ConfirmationNumberTwoToneIcon
                      style={{ color: "#CE93D8" }}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete" placement="top">
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    className="navbar_iconBtn"
                  >
                    <DeleteTwoToneIcon style={{ color: "#9E9E9E" }} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>

            {/* {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell className="ccc" component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">dqw</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="left">{row.protein}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CartTable;
