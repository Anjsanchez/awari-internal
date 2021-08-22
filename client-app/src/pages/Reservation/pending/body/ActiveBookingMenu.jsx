import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import "../css/ActiveBookings.css";

const ActiveBookingMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ transform: "scale(0.8)" }}
      >
        <HiOutlineDotsHorizontal />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          className="activeBooking-menuitem__span"
          onClick={handleClose}
        >
          View Customer
        </MenuItem>
        <MenuItem
          className="activeBooking-menuitem__span"
          onClick={handleClose}
        >
          View Booking Details
        </MenuItem>
      </Menu>
    </>
  );
};

export default ActiveBookingMenu;
