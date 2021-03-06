import moment from "moment";
import "./css/EmployeeForm.css";
import { Transfer } from "antd";
import { useSnackbar } from "notistack";
import { HiUsers } from "react-icons/hi";
import { Grid } from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import MDialog from "../../common/MDialog";
import MSwitch from "./../../common/form/MSwitch";
import React, { useState, useEffect } from "react";
import FormHeader from "../../common/form/FormHeader";
import { makeStyles } from "@material-ui/core/styles";
import FormFooter from "./../../common/form/FormFooter";
import MaterialButton from "../../common/MaterialButton";
import { store } from "../../utils/store/configureStore";
import { KeyboardDatePicker } from "@material-ui/pickers";
import UseEmployeeForm from "./validation/UseEmployeeForm";
import { writeToken } from "../../utils/store/pages/users";
import MaterialSelect from "../../common/form/MaterialSelect";
import { Link, useHistory, useParams } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import EmployeeChangePassModal from "./EmployeeChangePassModal";
import MaterialTextField from "./../../common/MaterialTextField";
import { getRoles } from "../../utils/services/pages/RoleService";
import employeeFormValidate from "./validation/EmployeeFormValidate";
import { getEmployeeById } from "../../utils/services/pages/EmployeeService";
import { resortMgmtPagesData } from "./../../components/sidebar/userRoleData";

const useStyles = makeStyles((theme) => ({
  login__button: {
    borderRadius: 16,
    textTransform: "capitalize",
    width: "160px",
    minWidth: "50px",
    maxWidth: "200px",
    marginBottom: "5px",
    marginRight: "5px",
  },
  password__button: {
    borderRadius: 16,
    textTransform: "capitalize",
    width: "190px",
    minWidth: "50px",
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
    display: "flex",
    justifyContent: "space-between",
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

const EmployeeForm = () => {
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
    handleChangeTargetKeys,
    handleChangeBirthday,
  } = UseEmployeeForm(employeeFormValidate);

  const hist = useHistory();
  const classes = useStyles();
  const [roles, setRoles] = useState([]);
  const [showPasswordModal, setshowPasswordModal] = useState(false);

  const [mockData, setMockData] = useState([]);

  const { enqueueSnackbar } = useSnackbar();
  const { id: employeeIdFromUrl } = useParams();

  const dialog = {
    title: "Confirmation",
    subTitle: "Are you sure you want to save this record?",
  };

  useEffect(() => {
    async function populateRoles() {
      try {
        const { data } = await getRoles();

        const sorted = data.sort((a, b) =>
          a.rolename.localeCompare(b.rolename)
        );

        setRoles(sorted);
      } catch (error) {
        enqueueSnackbar(
          "An error occured while fetching the roles in the server.",
          {
            variant: "error",
          }
        );
      }
    }

    async function populateUser() {
      try {
        if (employeeIdFromUrl === "new") return;

        const { data } = await getEmployeeById(employeeIdFromUrl);
        const { token, singleRecord } = data;
        store.dispatch(writeToken({ token }));

        handleValueOnLoad(singleRecord);
      } catch (ex) {
        if (ex && ex.status === 400) hist.replace("/not-found");
      }
    }

    populateRoles();
    populateUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const targetKeysx = [];

    resortMgmtPagesData.filter((n) => {
      return values.userRoles.forEach((u) => {
        if (n.key === u.roleKey) return targetKeysx.push(n.key);
      });
    });

    handleChangeTargetKeys(targetKeysx);
    setMockData(
      resortMgmtPagesData.sort((a, b) => a.title.localeCompare(b.title))
    );
  }, [values.userRoles]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDateChange = (date) =>
    handleChangeBirthday(moment(date).format("yyyy-MM-DD"));

  const filterOption = (inputValue, option) =>
    option.description.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;

  const handleChangeTransfer = (keys, z) => handleChangeTargetKeys(keys);

  const showPasswordField = () => {
    if (employeeIdFromUrl !== "new") return null;

    return (
      <>
        <Grid item xs={12} md={6}>
          <MaterialTextField
            id="password"
            label="Password"
            type="password"
            handleChange={handleChange}
            errors={errors.password}
            values={values.password}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MaterialTextField
            id="password2"
            label="Re-enter Password"
            type="password"
            handleChange={handleChange}
            errors={errors.password2}
            values={values.password2}
          />
        </Grid>
      </>
    );
  };
  const showPasswordButton = () => {
    if (employeeIdFromUrl === "new") return null;

    return (
      <>
        <div>
          <MaterialButton
            disabled={isLoading ? true : false}
            color="primary"
            onClick={() => setshowPasswordModal(true)}
            classes={classes.password__button}
            text="Change Password"
          />
        </div>
      </>
    );
  };

  const formLbl = employeeIdFromUrl === "new" ? "New Employee" : "Employee";
  return (
    <>
      <EmployeeChangePassModal
        visible={showPasswordModal}
        onHideModal={() => setshowPasswordModal(false)}
        empId={employeeIdFromUrl}
      />
      {askConfirmation && (
        <MDialog
          openDialog={askConfirmation}
          handleClose={handleDialogCancel}
          handleOk={handleDialogProceed}
          dialogText={dialog}
        />
      )}
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className="container__wrapper ef">
          <FormHeader
            header={formLbl}
            second="Management"
            third="Employee"
            SecondIcon={HiUsers}
            isVisibleBtn={false}
          />

          <div className="employeeForm-container">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <MaterialTextField
                    id="username"
                    label="Username"
                    handleChange={handleChange}
                    errors={errors.username}
                    values={values.username}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MaterialTextField
                    id="emailAddress"
                    label="Email"
                    type="email"
                    handleChange={handleChange}
                    errors={errors.emailAddress}
                    values={values.emailAddress}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MaterialTextField
                    id="firstname"
                    label="First Name"
                    handleChange={handleChange}
                    errors={errors.firstname}
                    values={values.firstname}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MaterialTextField
                    id="lastname"
                    label="Last Name"
                    handleChange={handleChange}
                    errors={errors.lastname}
                    values={values.lastname}
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
                <Grid item xs={12} sm={6}>
                  <MaterialTextField
                    id="sss"
                    label="SSS"
                    type="number"
                    handleChange={handleChange}
                    errors={errors.sss}
                    values={values.sss}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MaterialTextField
                    id="pagIbig"
                    label="Pag Ibig"
                    type="number"
                    handleChange={handleChange}
                    errors={errors.pagIbig}
                    values={values.pagIbig}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MaterialTextField
                    id="philHealth"
                    label="PhilHealth"
                    type="number"
                    handleChange={handleChange}
                    errors={errors.philHealth}
                    values={values.philHealth}
                  />
                </Grid>

                {showPasswordField()}

                <Grid item xs={6}>
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
                    style={{
                      width: "100%",
                      height: "44px",
                      marginBottom: "30px",
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <MaterialSelect
                    name="roleId"
                    label="Role"
                    value={values.roleId}
                    handleChangeInput={handleChange}
                    errors={errors.roleId}
                    datas={roles}
                    displayText="rolename"
                    menuItemValue="id"
                    maxWidth="100%"
                  />
                </Grid>
                <Grid item xs={12}>
                  <div className="reservationDetails-title-span__wrapper">
                    <span className="reservationDetails-title__spanHeader">
                      Menu Access
                    </span>
                  </div>
                  <Transfer
                    dataSource={mockData}
                    showSearch
                    filterOption={filterOption}
                    targetKeys={values.targetKeys}
                    onChange={handleChangeTransfer}
                    render={(item) => item.title}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={1}
                style={{ marginTop: "10px", marginBottom: "-15px" }}
              >
                <Grid item xs={12} md={6}>
                  <MSwitch
                    values={values.isActive}
                    handleChange={handleChange}
                    name="Account Active"
                    subName="Disabling this will prevent the user from using the system."
                  />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
              <div className={classes.loginDiv__margin}>
                <div>
                  <Link
                    to="/a/user-management/employees"
                    className="link"
                    style={isLoading ? { pointerEvents: "none" } : null}
                  >
                    <MaterialButton
                      disabled={isLoading ? true : false}
                      color="primary"
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
                {showPasswordButton()}
              </div>
              <div className={classes.loginDiv__margin}></div>
              <FormFooter text="Employees are the staff working in Awari Anilao Bay Resort." />
            </form>
          </div>
        </div>
      </MuiPickersUtilsProvider>
    </>
  );
};

export default EmployeeForm;
