export default function ProductClassificationFormValidate(values) {
  let errors = {};

  if (!values.name.trim()) errors.name = "Classification name is required";

  return errors;
}
