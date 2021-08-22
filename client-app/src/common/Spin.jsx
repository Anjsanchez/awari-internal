import React from "react";
import { Spin } from "antd";
import "./css/Spin.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "60vh",
    padding: "80px 16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
const SpinLoader = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Spin size="large" />
    </div>
  );
};

export default SpinLoader;
