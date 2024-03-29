import http from "../../httpServices";
import { GetApiUrl } from "../../../../config/ConfigBuilder";

const apiEndpoint = GetApiUrl + "/ReservationTrans";

function header(id) {
  return `${apiEndpoint}/${id}`;
}

export function GetTransLine() {
  http.SetJwt();
  return http.get(apiEndpoint);
}

export function includesTransLines() {
  http.SetJwt();
  return http.get(apiEndpoint + "/includesTransLines");
}

export function getTransLineByUserId(user) {
  http.SetJwt();
  return http.get(apiEndpoint + "/transByUserId/" + user);
}

export function saveTransLine(h) {
  http.SetJwt();
  return http.post(apiEndpoint, h);
}

export function deleteTransLine(lineId) {
  return http.delete(header(lineId));
}

export function PostCreateTransApproval(trans) {
  http.SetJwt();
  return http.put(apiEndpoint + "/CreateTransApproval/" + trans.transId, trans);
}

export function UpdateDiscountData(trans) {
  http.SetJwt();
  return http.put(apiEndpoint + "/UpdateDiscountData/" + trans.transId, trans);
}
