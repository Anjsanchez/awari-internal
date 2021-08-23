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
}));

const ActiveButton = (props) => {
  //..
  const classes = useStyles();

  const { value, textTrue = "Active", textFalse = "Inactive" } = props;

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
