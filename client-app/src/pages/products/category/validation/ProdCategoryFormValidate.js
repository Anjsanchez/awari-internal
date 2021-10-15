export default function ProdCategoryFormValidate(values) {
  let errors = {};

  if (!values.name.trim()) errors.name = "Location name is required";
  if (!values.printerName.trim())
    errors.printerName = "Printer name is required";

  return errors;
}
