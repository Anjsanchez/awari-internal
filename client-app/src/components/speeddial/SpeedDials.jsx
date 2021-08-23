import React from "react";
import { Backdrop } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SpeedDial from "@material-ui/lab/SpeedDial";
import auth from "../../utils/services/authServices";
import { makeStyles } from "@material-ui/core/styles";
import { store } from "../../utils/store/configureStore";
import QueueSharpIcon from "@material-ui/icons/QueueSharp";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import ViewListSharpIcon from "@material-ui/icons/ViewListSharp";
import MoreHorizSharpIcon from "@material-ui/icons/MoreHorizSharp";
import { toggleVisible } from "../../utils/store/pages/RoomReservation";

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
      icon: <QueueSharpIcon className={classes.x} />,
      name: "Make a Reservation",
      to: "/",
      action: () => handleB(),
    },
    {
      icon: <ViewListSharpIcon className={classes.x} />,
      name: "View active Reservations",
      to: "/",
      action: () => handleA(),
    },
  ];

  const handleA = () => {
    setOpen(false);
    store.dispatch(toggleVisible(false));
  };

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
            // component={Link}
            // to={action.to}
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
