import http from "../../httpServices";
import { apiUrl } from "../../../../config/config.json";

const apiEndpoint = apiUrl + "/ReservationHeaders";

function header(id) {
  return `${apiEndpoint}/${id}`;
}

export function getHeaders() {
  http.SetJwt();
  return http.get(apiEndpoint);
}

export function GetHeaderWithRoomCount() {
  http.SetJwt();
  return http.get(apiEndpoint + "/includesRoomCount");
}

export function saveHeader(h) {
  http.SetJwt();
  if (h.id) {
    const body = { ...h };
    return http.put(header(h.id), body);
  }
  return http.post(apiEndpoint, h);
}
