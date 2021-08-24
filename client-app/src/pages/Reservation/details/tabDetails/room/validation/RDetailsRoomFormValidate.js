export default function RDetailsRoomFormValidate(v) {
  let e = {};

  if (!v.name.trim()) e.name = "Payment type is required";

  if (!v.remark.trim()) e.remark = "Remark is required";

  if (v.amount === "" || v.amount === null) e.amount = "Amount is required";

  if (
    (v.isNeedRefNumber && v.referenceNumber === "") ||
    v.referenceNumber === null
  )
    e.referenceNumber = "Reference Number is Required";

  return e;
}
