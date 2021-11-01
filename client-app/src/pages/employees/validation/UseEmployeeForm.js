import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { saveEmployee } from "../../../utils/services/pages/EmployeeService";

const UseEmployeeForm = (validate) => {
  //..
  const hist = useHistory();
  const didMount = useRef(false);
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [askConfirmation, setAskConfirmation] = useState(false);

  const [values, setValues] = useState({
    id: "",
    username: "",
    emailAddress: "",
    firstname: "",
    lastname: "",
    sss: "",
    mobile: "",
    pagIbig: "",
    philHealth: "",
    secretAnswer: "",
    birthday: new Date(),
    isActive: false,
    roleId: "",
    password: "",
    password2: "",
    userRoles: [],
    targetKeys: [],
  });

  const handleValueOnLoad = (employee) => {
    setValues({
      id: employee.id || "",
      isActive: employee.isActive || false,
      username: employee.username || "",
      emailAddress: employee.emailAddress || "",
      firstname: employee.firstName || "",
      sss: employee.sss || "",
      mobile: employee.mobile || "",
      birthday: employee.birthday || "",
      pagIbig: employee.pagIbig || "",
      philHealth: employee.philHealth || "",
      lastname: employee.lastName || "",
      password: employee.password || "updateonlynopasswordreq",
      password2: employee.password || "updateonlynopasswordreq",
      roleId: employee.role.id || "",
      userRoles: employee.userRoles || [],
      targetKeys: [],
    });
  };

  useEffect(() => {
    //..
    async function doSubmit() {
      //..
      if (!didMount.current) {
        didMount.current = true;
        return;
      }

      if (Object.keys(errors).length === 0) setAskConfirmation(true);
    }
    doSubmit();
    // eslint-disable-next-line
  }, [errors]);

  const setObjViewMdl = () => {
    try {
      const objEmp = { ...values };
      var tmpKeys = [];

      const uId =
        values.id === "" ? "29B57807-0BAE-4149-9A6E-C7E369FA4DFE" : values.id;
      values.targetKeys.map((n) => {
        return tmpKeys.push({ userId: uId, roleKey: n });
      });

      objEmp.userRoles = tmpKeys;
      return objEmp;
    } catch (error) {
      console.log(error);
    }
  };

  const handleDialogProceed = async () => {
    setAskConfirmation(false);
    setIsLoading(true);
    try {
      const objEmp = setObjViewMdl();
      await saveEmployee(objEmp);

      enqueueSnackbar("Successfully updated records!", { variant: "success" });
      setIsLoading(false);
      hist.push("/a/user-management/employees");
    } catch (ex) {
      //
      if (ex && ex.status === 400)
        enqueueSnackbar("0053: " + ex.data, { variant: "error" });

      setIsLoading(false);
    }
  };

  const handleChangeTargetKeys = (e) => {
    setValues({
      ...values,
      targetKeys: e,
    });
  };

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

  const handleDialogCancel = () => {
    setAskConfirmation(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors(validate(values));
  };

  const handleChangeBirthday = (value) =>
    setValues({ ...values, birthday: value });

  return {
    handleChange,
    values,
    handleSubmit,
    askConfirmation,
    errors,
    handleValueOnLoad,
    handleDialogProceed,
    handleDialogCancel,
    isLoading,
    handleChangeTargetKeys,
    handleChangeBirthday,
  };
};

export default UseEmployeeForm;
