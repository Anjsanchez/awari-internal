import http from "../../httpServices";
import { apiUrl } from "../../../../config/config.json";

const apiEndpoint = apiUrl + "/payments";

function paymentUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getPayments() {
  http.SetJwt();
  return http.get(apiEndpoint);
}

export function savePayment(payment) {
  http.SetJwt();
  if (payment._id) {
    const body = { ...payment };
    return http.put(paymentUrl(payment._id), body);
  }
  return http.post(apiEndpoint, payment);
}
