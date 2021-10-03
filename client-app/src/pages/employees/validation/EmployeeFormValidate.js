export default function employeeFormValidate(values) {
  let errors = {};

  if (!values.roleId.trim()) errors.roleId = "Role is required";
  if (!values.username.trim()) errors.username = "Username is required";
  if (!values.lastname.trim()) errors.lastname = "Last name is required";
  if (!values.firstname.trim()) errors.firstname = "First name is required";

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
