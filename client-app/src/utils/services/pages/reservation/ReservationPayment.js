import http from "../../httpServices";
import { GetApiUrl } from "../../../../config/ConfigBuilder";

const apiEndpoint = GetApiUrl + "/ReservationPayments";

function headerUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function GetReservationPayments() {
  http.SetJwt();
  return http.get(apiEndpoint);
}

export function GetPaymentByHeaderId(headerId) {
  http.SetJwt();
  return http.get(apiEndpoint + "/byHeaderId?headerId=" + headerId);
}

export function PostCreatePaymentApproval(paymentId) {
  http.SetJwt();
  return http.put(
    apiEndpoint + "/CreatePaymentApproval/" + paymentId.transId,
    paymentId
  );
}

export function saveReservationPayment(h) {
  http.SetJwt();
  if (h.id) {
    const body = { ...h };
    return http.put(headerUrl(h.id), body);
  }
  return http.post(apiEndpoint, h);
}

export function deleteReservationPayment(paymentId) {
  return http.delete(headerUrl(paymentId));
}
