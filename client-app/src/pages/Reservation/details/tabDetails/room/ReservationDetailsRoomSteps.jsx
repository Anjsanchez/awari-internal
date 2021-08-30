import Step from "@material-ui/core/Step";
import { useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import { ButtonGroup } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import StepLabel from "@material-ui/core/StepLabel";
import MDialog from "./../../../../../common/MDialog";
import { makeStyles } from "@material-ui/core/styles";
import StepContent from "@material-ui/core/StepContent";
import ReservationAddOns from "./Steps/ReservationAddOns";
import ReservationDiscount from "./Steps/ReservationDiscount";
import { store } from "../../../../../utils/store/configureStore";
import ReservationRoomPicker from "./Steps/ReservationRoomPicker";
import ReservationDatePicker from "./Steps/ReservationDatePicker";
import ReservationGuestCount from "./Steps/ReservationGuestCount";
import MaterialButton from "./../../../../../common/MaterialButton";
import ActiveButton from "./../../../../../common/form/ActiveButton";
import ReservationConfirmation from "./Steps/ReservationConfirmation";
import {
  headerRoomAllAdded,
  roomLinesResetValue,
  toggleLoading,
} from "../../../../../utils/store/pages/createReservation";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: "10px",
    fontSize: "14px",
  },
  btnGrp: {
    fontSize: "14px",
    marginLeft: "15px",
    marginBottom: "15px",
  },
  actionsContainer: {},
  resetContainer: {},
  button__wrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
  labelSpan: {
    fontWeight: 400,
    fontSize: "15px",
    fontFamily: `"Poppins", sans-serif`,
  },
}));

const getSteps = () => [
  "Date",
  "Guest",
  "Room",
  "Promotions",
  "Add Ons",
  "Confirmation",
];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ReservationDatePicker />;
    case 1:
      return <ReservationGuestCount />;
    case 2:
      return <ReservationRoomPicker />;
    case 3:
      return <ReservationDiscount />;
    case 4:
      return <ReservationAddOns />;
    case 5:
      return <ReservationConfirmation />;
    default:
      return "Unknown step";
  }
}

const ReservationDetailsRoomSteps = ({
  onProceedModal,
  visible,
  selectedRoom,
}) => {
  const steps = getSteps();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [askConfirmation, setAskConfirmation] = useState(false);
  const [curAction, setCurAction] = useState("update");

  const storeState = useSelector((state) => state.entities.createReservation);

  const handleDialogCancel = () => setAskConfirmation(false);
  const handleDialogShow = () => {
    setCurAction("update");
    setAskConfirmation(true);
  };

  const handleDialogShowDelete = () => {
    setCurAction("delete");
    setAskConfirmation(true);
  };

  const onDecideOfAction = () => {
    setAskConfirmation(false);
    setActiveStep(0);
    onProceedModal(curAction);
  };

  useEffect(() => {
    setActiveStep(0);

    if (visible.action === "add") store.dispatch(roomLinesResetValue());
    if (visible.action !== "update") return;
    if (selectedRoom.length === 0) return;

    store.dispatch(headerRoomAllAdded(selectedRoom));
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => {
    store.dispatch(toggleLoading(false));
    setActiveStep(0);
  };

  const getDisabled = () => {
    //
    if (storeState.isLoading) return true;

    if (activeStep === 1)
      return storeState.rooms.heads.adult === 0 &&
        storeState.rooms.heads.senior === 0
        ? true
        : false;

    if (activeStep === 2) {
      if (
        Object.keys(storeState.rooms.selectedStartDate.room).length === 0 ||
        Object.keys(storeState.rooms.selectedEndDate.room).length === 0
      )
        return true;

      return false;
    }

    if (activeStep === 3) {
      if (Object.keys(storeState.rooms.discount).length === 0) return true;
      return false;
    }

    return false;
  };

  const footer = () => {
    const isAdd = visible.action === "add" ? true : false;
    const btnTextValue = isAdd ? "CREATE" : "MODIFY";

    return (
      <ButtonGroup
        className={classes.btnGrp}
        variant="text"
        color="primary"
        aria-label="text primary button group"
      >
        <MaterialButton
          onClick={handleReset}
          className={classes.button}
          size="small"
          color="secondary"
          text="BACK"
        />
        {!isAdd && (
          <MaterialButton
            className={classes.button}
            size="small"
            color="secondary"
            text="DELETE"
            onClick={handleDialogShowDelete}
          />
        )}
        <MaterialButton
          className={classes.button}
          size="small"
          text={btnTextValue}
          onClick={handleDialogShow}
        />
      </ButtonGroup>
    );
  };

  if (visible.action === "update" && selectedRoom.length === 0)
    return (
      <div className="errorSpan rdRSteps">
        <ActiveButton
          value={false}
          textFalse="Please select a row to modify."
        />
      </div>
    );

  return (
    <div className={classes.root}>
      {askConfirmation && (
        <MDialog
          openDialog={askConfirmation}
          handleClose={handleDialogCancel}
          handleOk={onDecideOfAction}
        />
      )}

      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>
              <span className={classes.labelSpan}>{label}</span>
            </StepLabel>
            <StepContent>
              {getStepContent(index)}
              <div className={classes.actionsContainer}>
                <div className={classes.button__wrapper}>
                  <ButtonGroup
                    className={classes.button}
                    variant="text"
                    color="primary"
                    aria-label="text primary button group"
                  >
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                      size="small"
                      color="secondary"
                    >
                      Back
                    </Button>
                    <Button
                      disabled={getDisabled()}
                      size="small"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <div className="footer-label__div rdStep"></div>
          <span className="footer-label__span rdRstep">
            Proceed to create a reservation.
          </span>
          <div className="rdBtnGroup__container">{footer()}</div>
        </Paper>
      )}
    </div>
  );
};

export default ReservationDetailsRoomSteps;
