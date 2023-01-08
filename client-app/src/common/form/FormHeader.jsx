import React from "react";
import "./css/FormHeader.css";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { IconContext } from "react-icons";
import { BiChevronRight } from "react-icons/bi";
import { makeStyles } from "@material-ui/core/styles";
import { Breadcrumbs, Typography, Button, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formHeader_header_h1: {
    marginBottom: "20px",
    fontSize: "1.4993rem",
    fontWeight: 500,
  },
  addContainer_btn: {
    backgroundColor: "#2196F3",
    borderRadius: "16px",
    minWidth: "156px",
    "&:hover": {
      backgroundColor: "#1976D2 !important",
    },
  },
  addContainer: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  btnLink: {
    marginRight: "12px",
  },
  breadCrumb: {
    marginTop: "15px",
  },
  formHeader_header_emp: {
    color: "rgb(23, 43, 77) !important",
    fontSize: "0.875rem",
  },
}));

const FormHeader = ({
  header,
  second,
  third,
  navigate,
  isVisibleBtn = true,
}) => {
  const classes = useStyles();

  return (
    <>
      <IconContext.Provider value={{ size: "0.875rem" }}>
        <div className="formHeader-header">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={8}>
              <div className="">
                <span className={classes.formHeader_header_h1}>{header}</span>

                <Breadcrumbs
                  separator={<BiChevronRight fontSize="small" />}
                  aria-label="breadcrumb"
                  className={classes.breadCrumb}
                >
                  <Link color="inherit" to="/" className="link-icon">
                    <span className="formHeader_header_emp">Dashboard</span>
                  </Link>
                  <Typography color="inherit" className="link-icon">
                    <span className="formHeader_header_emp">{second}</span>
                  </Typography>
                  <span className={classes.formHeader_header_emp}>{third}</span>
                </Breadcrumbs>
              </div>
            </Grid>
            <Grid item xs={12} sm={4} className={classes.addContainer}>
              <div>
                {isVisibleBtn && (
                  <Link to={navigate} className="link">
                    <Button
                      className="mBtn__container"
                      variant="contained"
                      color="inherit"
                      startIcon={<FaPlus style={{ fill: "white" }} />}
                    >
                      <span style={{ color: "white" }}>Add {third} </span>
                    </Button>
                  </Link>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      </IconContext.Provider>
    </>
  );
};

export default FormHeader;
