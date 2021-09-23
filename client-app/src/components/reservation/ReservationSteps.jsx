import "./css/ReservationSteps.css";
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
import { store } from "../../utils/store/configureStore";
import { writeToken } from "../../utils/store/pages/users";
import MaterialButton from "./../../common/MaterialButton";
import ReservationType from "../../pages/Reservation/create/ReservationType";
import ReservationCustomer from "./../../pages/Reservation/create/ReservationCustomer";
import { saveHeader } from "../../utils/services/pages/reservation/ReservationHeader";

import {
  toggleLoading,
  refreshValues,
} from "../../utils/store/pages/createReservation";

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

const getSteps = () => ["Type", "Guest"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ReservationType />;
    case 1:
      return <ReservationCustomer />;
    default:
      return "Unknown step";
  }
}

const ReservationSteps = () => {
  const steps = getSteps();
  const classes = useStyles();
  const hist = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = useState(0);

  const typeInStore = useSelector((state) => state.entities);
  const { createReservation, user } = typeInStore;
  const { type, voucher, customer } = createReservation.header;

  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => {
    store.dispatch(toggleLoading(false));
    setActiveStep(0);
  };

  const customerViewModel = (mdl) => ({
    customerId: mdl.customer._id,
    reservationTypeId: mdl.type.key,
    voucher: mdl.voucher,
    userId: user.user.id,
  });

  const handleDialogProceed = async () => {
    //
    store.dispatch(toggleLoading(true));
    const mdl = customerViewModel(createReservation.header);
    try {
      const { data } = await saveHeader(mdl);
      const { token } = data;
      store.dispatch(writeToken({ token }));

      setTimeout(() => {
        enqueueSnackbar("Successfully updated records!", {
          variant: "success",
        });

        store.dispatch(refreshValues());
        setActiveStep(0);
        hist.replace("/a/reservation-management/reservations");
      }, 500);
    } catch (ex) {
      if (ex && ex.status === 400) {
        enqueueSnackbar(ex.data, { variant: "error" });
      }
      if (ex && ex.status === 500)
        enqueueSnackbar(ex.data, { variant: "error" });
      store.dispatch(toggleLoading(false));
    }
  };

  const getDisabled = () => {
    //

    if (activeStep === 0) {
      const { name } = type;
      if (name === null || name === "") return true;

      const rType = name.toLowerCase();
      if (rType === "day tour" || rType === "walk in" || rType === "restaurant")
        return false;

      if (voucher === null || voucher === "") return true;

      return false;
    }

    if (activeStep === 1)
      return Object.keys(customer).length === 0 ? true : false;

    if (activeStep === 2 || activeStep === 3) return false;
    return true;
  };

  const renderSpanLabel = () => {
    const typeInlower = type.name.toLowerCase();

    if (typeInlower === "day tour" || typeInlower === "restaurant")
      return "This may now proceed with adding of the transactions.";

    return "You can now proceed with adding a room in the reservation.";
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
          <span className="footer-label__span">{renderSpanLabel()}</span>
          <div>
            <ButtonGroup
              className={classes.button}
              variant="text"
              color="primary"
              aria-label="text primary button group"
            >
              {!createReservation.isLoading && (
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
                disabled={createReservation.isLoading}
                text="Proceed"
                onClick={handleDialogProceed}
              />
            </ButtonGroup>
          </div>
        </Paper>
      )}
    </div>
  );
};

export default ReservationSteps;
