import http from "../../httpServices";
import { apiUrl } from "../../../../config/config.json";

const apiEndpoint = apiUrl + "/ApprovalPayments";

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
