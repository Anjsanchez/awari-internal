import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  spanContainerActive: {
    color: "#00c853",
    background: "#b9f6ca60",
    padding: "5px 10px",
    borderRadius: "20px",
  },
  spanContainerInactive: {
    color: "#d84315",
    background: "#fbe9e780",
    padding: "5px 10px",
    borderRadius: "20px",
  },
  spanContainerWarning: {
    color: "#F57C00",
    background: "#FFF3E0",
    padding: "5px 10px",
    borderRadius: "20px",
  },
}));

const ActiveButton = ({
  value,
  textTrue = "Active",
  textFalse = "Inactive",
  isWarning = false,
}) => {
  //..
  const classes = useStyles();

  if (isWarning) {
    return (
      <span className={`${classes.rowSpan} ${classes.spanContainerWarning}`}>
        {textTrue}
      </span>
    );
  }

  if (value === true) {
    return (
      <span className={`${classes.rowSpan} ${classes.spanContainerActive}`}>
        {textTrue}
      </span>
    );
  }

  return (
    <span className={`${classes.rowSpan} ${classes.spanContainerInactive}`}>
      {textFalse}
    </span>
  );
};

export default ActiveButton;
