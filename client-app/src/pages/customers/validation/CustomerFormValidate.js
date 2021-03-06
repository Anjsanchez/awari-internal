import moment from "moment";
export default function customerFormValidate(values) {
  let errors = {};

  if (!values.customerid) errors.customerid = "Customer ID is required";
  if (!values.firstname.trim()) errors.firstname = "First Name is required";
  if (!values.mobile) errors.mobile = "Mobile Number is required";
  if (!values.lastname.trim()) errors.lastname = "Last Name is required";
  if (!values.birthday) errors.birthday = "Birthday is required";
  if (!values.address.trim()) errors.address = "Address is required";
  if (!values.emailAddress) errors.emailAddress = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(values.emailAddress))
    errors.emailAddress = "Please provide a valid email address";

  if (values.imageFile === "" || values.imageFile === null) {
    if (values.imageName === "") errors.imageFile = "Image is required";
  }
  if (moment(values.birthday).isSame(moment(), "day"))
    errors.birthday = "Birthday can not be the same day.";

  return errors;
}
