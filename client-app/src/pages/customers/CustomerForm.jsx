import moment from "moment";
import { Image } from "antd";
import "./css/EmployeeForm.css";
import { HiUsers } from "react-icons/hi";
import React, { useEffect } from "react";
import { Grid, IconButton } from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import MDialog from "../../common/MDialog";
import MSwitch from "./../../common/form/MSwitch";
import FormHeader from "../../common/form/FormHeader";
import { makeStyles } from "@material-ui/core/styles";
import FormFooter from "./../../common/form/FormFooter";
import MaterialButton from "../../common/MaterialButton";
import { store } from "../../utils/store/configureStore";
import { KeyboardDatePicker } from "@material-ui/pickers";
import UseCustomerForm from "./validation/UseCustomerForm";
import { writeToken } from "../../utils/store/pages/users";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Link, useHistory, useParams } from "react-router-dom";
import MaterialTextField from "./../../common/MaterialTextField";
import BackupTwoToneIcon from "@material-ui/icons/BackupTwoTone";
import customerFormValidate from "./validation/CustomerFormValidate";
import { getCustomerById } from "../../utils/services/pages/CustomerService";

const useStyles = makeStyles((theme) => ({
  login__button: {
    borderRadius: 16,
    textTransform: "capitalize",
    width: "100%",
    maxWidth: "200px",
    marginBottom: "5px",
    marginRight: "5px",
  },
  textField: {
    [`& fieldset`]: {
      borderRadius: 16,
    },
  },

  loginDiv__margin: {
    marginTop: "20px",
  },
  employeeFormInfo_header: {
    fontFamily: `"Poppins", sans-serif`,
    margin: "0px 0px 0.35em",
    fontWeight: 500,
    fontSize: "0.875rem",
    lineHeight: "1.57",
    color: "rgb(23, 43, 77)",
  },
  employeeFormInfo_helper: {
    fontFamily: `"Poppins", sans-serif`,
    fontWeight: "400",
    fontSize: "0.875rem",
    lineHeight: "1.43",
    color: "rgb(107, 119, 140)",
  },
  employeeFormInfo_switch: {
    marginLeft: "-8px",
  },
  employeeForm_input: {
    width: "100%",
    maxWidth: "170px",
  },
}));

const CustomerForm = () => {
  //..
  const {
    askConfirmation,
    handleChange,
    values,
    handleSubmit,
    isLoading,
    errors,
    handleValueOnLoad,
    handleDialogProceed,
    handleDialogCancel,
    handleChangeBirthday,
    handleChangeImage,
  } = UseCustomerForm(customerFormValidate);

  const dialog = {
    title: "Confirmation",
    subTitle: "Are you sure you want to save this record?",
  };

  const hist = useHistory();
  const classes = useStyles();
  const { id: employeeIdFromUrl } = useParams();

  useEffect(() => {
    async function populateCustomer() {
      try {
        if (employeeIdFromUrl === "new") return;

        const { data } = await getCustomerById(employeeIdFromUrl);
        const { token, singleRecord } = data;

        store.dispatch(writeToken({ token }));

        handleValueOnLoad(singleRecord);
      } catch (ex) {
        if (ex && ex.status === 400) hist.replace("/not-found");
      }
    }

    populateCustomer();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDateChange = (date) =>
    handleChangeBirthday(moment(date).format("yyyy-MM-DD"));

  const formLbl = employeeIdFromUrl === "new" ? "New Customer" : "Customer";
  return (
    <>
      {askConfirmation && (
        <MDialog
          openDialog={askConfirmation}
          handleClose={handleDialogCancel}
          handleOk={handleDialogProceed}
          dialogText={dialog}
        />
      )}
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className="container__wrapper">
          <FormHeader
            header={formLbl}
            second="Management"
            third="Customer"
            SecondIcon={HiUsers}
            isVisibleBtn={false}
          />

          <div className="employeeForm-container">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={3} md={4}></Grid>
                <Grid item xs={6} md={4}>
                  <div className="prf-container__wrapper">
                    <Image
                      height={240}
                      width="100%"
                      src={values.imageSrc}
                      fallback="data:image/png;base64,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"
                    />
                    <div className="prf-btnUpload__wrapper">
                      <input
                        onChange={handleChangeImage}
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                      />
                      <label htmlFor="icon-button-file">
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <BackupTwoToneIcon />
                        </IconButton>
                        {errors.imageFile && (
                          <span className="prf-container__span-error">
                            Image is Required
                          </span>
                        )}
                      </label>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={3} md={4}></Grid>

                <Grid item xs={12} sm={6}>
                  <MaterialTextField
                    id="firstname"
                    label="First Name"
                    handleChange={handleChange}
                    errors={errors.firstname}
                    values={values.firstname}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MaterialTextField
                    id="lastname"
                    label="Last Name"
                    handleChange={handleChange}
                    errors={errors.lastname}
                    values={values.lastname}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MaterialTextField
                    id="address"
                    label="Address"
                    handleChange={handleChange}
                    errors={errors.address}
                    values={values.address}
                    multiline={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MaterialTextField
                    id="emailAddress"
                    label="Email"
                    type="email"
                    handleChange={handleChange}
                    errors={errors.emailAddress}
                    values={values.emailAddress}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <MaterialTextField
                    id="mobile"
                    label="Mobile Number"
                    type="number"
                    handleChange={handleChange}
                    errors={errors.mobile}
                    values={values.mobile}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MaterialTextField
                    id="customerid"
                    label="Customer ID"
                    type="number"
                    handleChange={handleChange}
                    errors={errors.customerid}
                    values={values.customerid}
                  />
                </Grid>
                <Grid item xs={12}>
                  <KeyboardDatePicker
                    openTo="year"
                    orientation="landscape"
                    autoOk
                    alpha=""
                    variant="inline"
                    animateYearScrolling
                    allowKeyboardControl
                    inputVariant="outlined"
                    label="Birthdate"
                    format="MMMM Do YYYY"
                    value={values.birthday}
                    id="birthday"
                    onChange={(date) => handleDateChange(date)}
                    style={{ width: "100%", height: "44px" }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={1}
                style={{ marginTop: "20px", marginBottom: "-15px" }}
              >
                <Grid item xs={12} sm={6}>
                  <MSwitch
                    values={values.isActive}
                    handleChange={handleChange}
                    name="Customer Active"
                    subName="Disabling this will prevent this customer from making transactions."
                  />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
              <div className={classes.loginDiv__margin}>
                <Link
                  to="/a/user-management/customers"
                  className="link"
                  style={isLoading ? { pointerEvents: "none" } : null}
                >
                  <MaterialButton
                    color="primary"
                    disabled={isLoading ? true : false}
                    classes={classes.login__button}
                    text="Back"
                  />
                </Link>
                <MaterialButton
                  disabled={isLoading ? true : false}
                  color="primary"
                  onClick={handleSubmit}
                  classes={classes.login__button}
                  text={`${isLoading ? "Saving..." : "Save"}`}
                />
              </div>
              <div className={classes.loginDiv__margin}></div>
              <FormFooter text="Customers are the guests in Awari Anilao Bay Resort." />
            </form>
          </div>
        </div>
      </MuiPickersUtilsProvider>
    </>
  );
};

export default CustomerForm;
