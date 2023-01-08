import http from "../../httpServices";
import { GetApiUrl } from "../../../../config/ConfigBuilder";

const apiEndpoint = GetApiUrl + "/ApprovalPayments";

function paymentUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getApprovalPaymentById(id) {
  http.SetJwt();
  return http.get(paymentUrl(id));
}

export function updateApprovalPayment(obj) {
  http.SetJwt();
  const body = { ...obj };
  return http.put(paymentUrl(obj.id), body);
}
