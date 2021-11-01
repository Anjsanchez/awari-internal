import { Modal } from "antd";
import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { Grid } from "@material-ui/core";
import MDialog from "../../common/MDialog";
import MaterialTextField from "./../../common/MaterialTextField";
import { updateUserPassword } from "./../../utils/services/pages/EmployeeService";

const EmployeeChangePassModal = ({ visible, onHideModal, empId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [askConfirmation, setAskConfirmation] = useState(false);
  const [values, setValues] = useState({
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({
    password: false,
    password2: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "isActive") {
      setValues({ ...values, [name]: e.target.checked });
      return;
    }

    setValues({
      ...values,
      [name]: value,
    });
  };

  const onAskConfirmation = () => {
    const err = {};

    if (!values.password.trim()) err.password = "Password is required";

    if (!values.password2.trim()) err.password2 = "Password is required";

    if (values.password !== values.password2) {
      err.password = "Password does not match the password 2";
      return setErrors(err);
    }

    if (!values.password.trim() || !values.password2.trim())
      return setErrors(err);

    setErrors({});

    setAskConfirmation(true);
  };

  const onOkay = async () => {
    const obj = {
      empId: empId,
      password: values.password,
    };

    try {
      await updateUserPassword(obj);

      enqueueSnackbar("Successfully updated records!", {
        variant: "success",
      });
      setAskConfirmation(false);
      onHideModal();
    } catch (ex) {
      if (ex && ex.status === 400)
        enqueueSnackbar("0070: " + ex.data, { variant: "error" });
    }
  };

  return (
    <div>
      <Modal
        title="Change Password"
        centered
        visible={visible}
        onOk={onAskConfirmation}
        onCancel={onHideModal}
      >
        {askConfirmation && (
          <MDialog
            handleOk={onOkay}
            openDialog={askConfirmation}
            handleClose={() => setAskConfirmation(false)}
          />
        )}
        <div className="ecpm__wrapper">
          <Grid item xs={12} className="dwdw">
            <MaterialTextField
              id="password"
              label="Password"
              type="password"
              handleChange={handleChange}
              errors={errors.password}
              values={values.password}
            />
          </Grid>
          <Grid item xs={12}>
            <MaterialTextField
              id="password2"
              label="Re-enter Password"
              type="password"
              handleChange={handleChange}
              errors={errors.password2}
              values={values.password2}
            />
          </Grid>
        </div>
      </Modal>
    </div>
  );
};

export default EmployeeChangePassModal;
