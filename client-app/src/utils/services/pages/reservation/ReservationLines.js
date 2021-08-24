import http from "../../httpServices";
import { apiUrl } from "../../../../config/config.json";

const apiEndpoint = apiUrl + "/ReservationRoomLines";

function header(id) {
  return `${apiEndpoint}/${id}`;
}

export function GetRoomLines() {
  http.SetJwt();
  return http.get(apiEndpoint);
}

export function GetRoomLinesByHeaderId() {
  http.SetJwt();
  return http.get(apiEndpoint + "/byHeaderId");
}

export function saveHeader(h) {
  http.SetJwt();
  if (h.id) {
    const body = { ...h };
    return http.put(header(h.id), body);
  }
  return http.post(apiEndpoint, h);
}
