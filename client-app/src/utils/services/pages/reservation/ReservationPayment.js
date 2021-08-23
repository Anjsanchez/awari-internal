import http from "../../httpServices";
import { apiUrl } from "../../../../config/config.json";

const apiEndpoint = apiUrl + "/ReservationPayments";

function header(id) {
  return `${apiEndpoint}/${id}`;
}

export function GetReservationPayments() {
  http.SetJwt();
  return http.get(apiEndpoint);
}

export function GetPaymentByHeaderId() {
  http.SetJwt();
  return http.get(apiEndpoint + "/includesRoomCount");
}

export function savePayment(h) {
  http.SetJwt();
  if (h.id) {
    const body = { ...h };
    return http.put(header(h.id), body);
  }
  return http.post(apiEndpoint, h);
}
