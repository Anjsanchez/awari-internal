import React, { useState } from "react";
import CartDiscount from "./CartDiscount";
import { useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import EmptyContent from "./../../common/EmptyContent";
import { store } from "../../utils/store/configureStore";
import TableContainer from "@material-ui/core/TableContainer";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import { Button, ButtonGroup, Tooltip, IconButton } from "@material-ui/core";
import ConfirmationNumberTwoToneIcon from "@material-ui/icons/ConfirmationNumberTwoTone";
import {
  toggleAdjustQuantity,
  toggleRemoveItemInCart,
} from "../../utils/store/pages/createTransaction";

const CartTable = () => {
  //..
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const handleCancelModal = () => setShowModal(false);

  const handleShowDiscount = (prod) => {
    setShowModal(true);
    setSelectedProduct(prod);
  };

  const products = useSelector(
    (state) => state.entities.createTransaction.products
  );

  const handleQuantityAdjust = (act, prod) =>
    store.dispatch(toggleAdjustQuantity({ act, prod }));

  const renderTableBody = () => {
    return products.map((n) => (
      <TableRow key={n._id} className="ct-tblRow__container">
        <TableCell component="th" scope="row" className="ct-tableCell__wrapper">
          <div className="ct-rowProduct_container">
            <img src={n.imageSrc} alt="" className="ct-rowProduct_img" />
            <div className="ct-rowProduct_wrapper">
              <span className="ct-rowProduct-titleSpan">{n.longName}</span>
              <span className="ct-rowProduct-subTitleSpan">
                {n.productType.name}
              </span>
            </div>
          </div>
        </TableCell>
        <TableCell className="ct-tableCell__wrapper" align="right">
          <span className="ct-rowProduct-titleSpan">
            ₱{Intl.NumberFormat().format(Number(n.sellingPrice).toFixed(2))}
          </span>
        </TableCell>
        <TableCell className="ct-tableCell__wrapper" align="right">
          <ButtonGroup aria-label="small outlined button group">
            <Button
              className="ct-btnGrp-btnLeft"
              onClick={() => handleQuantityAdjust("dec", n)}
            >
              -
            </Button>
            <Button className="ct-btnGrp-btnRight span">{n.quantity}</Button>
            <Button
              className="ct-btnGrp-btnRight"
              onClick={() => handleQuantityAdjust("inc", n)}
            >
              +
            </Button>
          </ButtonGroup>
        </TableCell>
        <TableCell className="ct-tableCell__wrapper" align="right">
          <span className="ct-rowProduct-titleSpan">
            ₱{Intl.NumberFormat().format(Number(n.netDiscount).toFixed(2))}
          </span>
        </TableCell>
        <TableCell className="ct-tableCell__wrapper" align="left">
          <span className="ct-rowProduct-titleSpan">
            ₱
            {Intl.NumberFormat().format(
              Number(n.sellingPrice * n.quantity - n.netDiscount).toFixed(2)
            )}
          </span>
        </TableCell>
        <TableCell className="ct-tableCell__wrapper" align="right">
          <Tooltip title="Discount" placement="top">
            <IconButton
              onClick={() => handleShowDiscount(n)}
              edge="start"
              color="inherit"
              aria-label="menu"
              className="navbar_iconBtn"
            >
              <ConfirmationNumberTwoToneIcon style={{ color: "#CE93D8" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="top">
            <IconButton
              onClick={() =>
                store.dispatch(() => store.dispatch(toggleRemoveItemInCart(n)))
              }
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
    ));
  };

  return (
    <div className="ct-header__container">
      <CartDiscount
        showModal={showModal}
        handleCancelModal={handleCancelModal}
        selectedProduct={selectedProduct}
      />

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
          <TableBody>{products.length !== 0 && renderTableBody()}</TableBody>
        </Table>
      </TableContainer>
      {products.length === 0 && (
        <EmptyContent
          text="CART EMPTY"
          subText="Head back to the commerce, and start adding products to your cart!"
        />
      )}
    </div>
  );
};

export default CartTable;
