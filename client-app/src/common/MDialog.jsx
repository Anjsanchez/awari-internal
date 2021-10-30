import React from "react";
import "./css/MDialog.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const MDialog = ({
  handleOk,
  openDialog,
  handleClose,
  dialogText = { title: "", subTitle: "" },
}) => {
  if (!dialogText.title.trim())
    dialogText.title = "Are you sure you want to proceed?";

  if (!dialogText.subTitle.trim())
    dialogText.subTitle =
      "This action is irreversible. Are you sure you want to proceed?";

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="md-dialog__container">
          <DialogTitle id="alert-dialog-title">{dialogText.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogText.subTitle}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleOk} color="primary" autoFocus>
              Proceed
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};
export default MDialog;
