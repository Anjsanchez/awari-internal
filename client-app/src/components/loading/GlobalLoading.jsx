import React from "react";
import { useSelector } from "react-redux";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import ScaleLoader from "react-spinners/ScaleLoader";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const GlobalLoading = () => {
  const isLoading = useSelector(
    (state) => state.entities.globalSettings.isLoading
  );

  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isLoading}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div>
          <Fade in={isLoading}>
            <ScaleLoader color="#EDE7F6" loading={true} size={20} />
          </Fade>
        </div>
      </Modal>
    </div>
  );
};

export default GlobalLoading;
