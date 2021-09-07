import http from "../../httpServices";
import { apiUrl } from "../../../../config/config.json";

const apiEndpoint = apiUrl + "/ReservationTrans";

function header(id) {
  return `${apiEndpoint}/${id}`;
}

export function GetTransLine() {
  http.SetJwt();
  return http.get(apiEndpoint);
}

// export function GetRoomLinesByHeaderId(headerId) {
//   http.SetJwt();
//   return http.get(apiEndpoint + "/byHeaderId?headerId=" + headerId);
// }

export function saveTransLine(h) {
  http.SetJwt();
  return http.post(apiEndpoint, h);
}

export function deleteTransLine(lineId) {
  return http.delete(header(lineId));
}
