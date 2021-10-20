export default function employeeFormValidate(values) {
  let errors = {};

  if (!values.roleId.trim()) errors.roleId = "Role is required";
  if (!values.username.trim()) errors.username = "Username is required";
  if (!values.lastname.trim()) errors.lastname = "Last Name is required";
  if (!values.firstname.trim()) errors.firstname = "First Name is required";

  if (values.sss.length === 0) errors.sss = "SSS is required";
  if (values.mobile.length === 0) errors.mobile = "Mobile is required";
  if (values.pagIbig.length === 0) errors.pagIbig = "Pag Ibig is required";
  if (values.philHealth.length === 0)
    errors.philHealth = "Phil Health is required";

  if (values.username.indexOf(" ") >= 0)
    errors.username = "Space is not allowed in username";

  if (!values.emailAddress) errors.emailAddress = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(values.emailAddress))
    errors.emailAddress = "Please provide a valid email address";

  if (!values.password) errors.password = "Password is required";
  else if (values.password.length < 3)
    errors.password = "Password needs to be 3 characters or more";

  if (!values.password2) errors.password2 = "Password is required";
  else if (values.password2 !== values.password)
    errors.password2 = "Passwords do not match";

  return errors;
}
