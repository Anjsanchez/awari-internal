import http from "../../httpServices";
import { apiUrl } from "../../../../config/config.json";

const apiEndpoint = apiUrl + "/payments";

function paymentUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getPayments(isActiveOnly = false) {
  http.SetJwt();
  return http.get(apiEndpoint + "?isActiveOnly=" + isActiveOnly);
}

export function savePayment(payment) {
  http.SetJwt();
  if (payment.id) {
    const body = { ...payment };
    return http.put(paymentUrl(payment.id), body);
  }
  return http.post(apiEndpoint, payment);
}
