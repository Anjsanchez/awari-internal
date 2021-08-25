import React, { useState } from "react";
import { useSnackbar } from "notistack";
import Step from "@material-ui/core/Step";
import { useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { ButtonGroup } from "@material-ui/core";
import Stepper from "@material-ui/core/Stepper";
import StepLabel from "@material-ui/core/StepLabel";
import { makeStyles } from "@material-ui/core/styles";
import StepContent from "@material-ui/core/StepContent";
import ReservationGuestCount from "./Steps/ReservationGuestCount";
import ReservationDatePicker from "./Steps/ReservationDatePicker";
import { store } from "../../../../../utils/store/configureStore";
import MaterialButton from "./../../../../../common/MaterialButton";
import { toggleLoading } from "../../../../../utils/store/pages/RoomReservation";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: "10px",
    fontSize: "14px",
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

const getSteps = () => ["Date", "Guest", "Room", "Confirmation"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ReservationDatePicker />;
    case 1:
      return <ReservationGuestCount />;
    case 2:
      return <h1>HElo</h1>;
    default:
      return "Unknown step";
  }
}

const ReservationDetailsRoomSteps = () => {
  const steps = getSteps();
  const classes = useStyles();
  const hist = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = useState(0);

  const storeState = useSelector((state) => state.entities.createReservation);

  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => {
    store.dispatch(toggleLoading(false));
    setActiveStep(0);
  };

  // const customerViewModel = (mdl) => ({
  //   customerId: mdl.customer._id,
  //   reservationTypeId: mdl.type.key,
  //   voucher: mdl.voucher,
  //   userId: user.user.id,
  // });

  // const handleDialogProceed = async () => {
  //   //
  //   store.dispatch(toggleLoading(true));
  //   const mdl = customerViewModel(createReservation.header);
  //   try {
  //     const { data } = await saveHeader(mdl);
  //     const { token } = data;
  //     store.dispatch(writeToken({ token }));

  //     setTimeout(() => {
  //       enqueueSnackbar("Successfully updated records!", {
  //         variant: "success",
  //       });

  //       store.dispatch(refreshValues());
  //       setActiveStep(0);
  //       hist.push("/");
  //     }, 1000);
  //   } catch (ex) {
  //     if (ex && ex.status === 400) {
  //       enqueueSnackbar(ex.data, { variant: "error" });
  //     }
  //     if (ex && ex.status === 500)
  //       enqueueSnackbar(ex.data, { variant: "error" });
  //     store.dispatch(toggleLoading(false));
  //   }
  // };

  const getDisabled = () => {
    //
    if (activeStep === 1)
      return storeState.rooms.heads.adult === 0 ? true : false;

    return false;
  };

  return (
    <div className={classes.root}>
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
          <span className="footer-label__span">
            You can now proceed with adding a room in the reservation.
          </span>
          <div>
            <ButtonGroup
              className={classes.button}
              variant="text"
              color="primary"
              aria-label="text primary button group"
            >
              {!storeState.isLoading && (
                <MaterialButton
                  onClick={handleReset}
                  className={classes.button}
                  size="small"
                  color="secondary"
                  text="back"
                />
              )}
              <MaterialButton
                className={classes.button}
                size="small"
                disabled={storeState.isLoading}
                text="Proceed"
                // onClick={handleDialogProceed}
              />
            </ButtonGroup>
          </div>
        </Paper>
      )}
    </div>
  );
};

export default ReservationDetailsRoomSteps;
