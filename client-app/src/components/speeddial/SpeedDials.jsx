import React from "react";
import { Backdrop } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SpeedDial from "@material-ui/lab/SpeedDial";
import auth from "../../utils/services/authServices";
import { makeStyles } from "@material-ui/core/styles";
import { store } from "../../utils/store/configureStore";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import MoreHorizSharpIcon from "@material-ui/icons/MoreHorizSharp";
import { toggleVisible } from "../../utils/store/pages/createReservation";
import AddLocationTwoToneIcon from "@material-ui/icons/AddLocationTwoTone";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  exampleWrapper: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
  z: {
    "&.MuiSpeedDialAction-fab": {
      background: "white",
    },
  },
  x: {
    color: "#9575CD",
  },
}));

export default function SpeedDials() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const actions = [
    {
      icon: <AddLocationTwoToneIcon className={classes.x} />,
      name: "Make a Reservation",
      to: "/",
      action: () => handleB(),
    },
  ];

  const handleB = () => {
    setOpen(false);
    store.dispatch(toggleVisible(true));
  };

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  if (!auth.IsLoggedIn()) return null;

  const icon = open ? <CloseIcon /> : <MoreHorizSharpIcon />;
  return (
    <div className={classes.exampleWrapper}>
      <Backdrop open={open} style={{ zIndex: 1200 }} />
      <SpeedDial
        ariaLabel="SpeedDial example"
        className={classes.speedDial}
        FabProps={{ size: "small" }}
        icon={icon}
        onClick={handleOpen}
        onClose={handleClose}
        open={open}
        direction="up"
        style={{ zIndex: 1200, position: "fixed" }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            className={classes.z}
            style={{ zIndex: 1201 }}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.action}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
