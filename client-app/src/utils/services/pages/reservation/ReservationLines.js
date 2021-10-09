import http from "../../httpServices";
import { apiUrl } from "../../../../config/config.json";

const apiEndpoint = apiUrl + "/ReservationRoomLines";

function header(id) {
  return `${apiEndpoint}/${id}`;
}

export function GetRoomLines(isActiveOnly = false) {
  http.SetJwt();
  return http.get(apiEndpoint + "/?isActiveOnly=" + isActiveOnly);
}

export function GetRoomLinesByHeaderId(headerId) {
  http.SetJwt();
  return http.get(apiEndpoint + "/byHeaderId?headerId=" + headerId);
}

export function updateReservationLineWalkInHeads(lines) {
  return http.put(apiEndpoint + "/UpdateHeadsOnWalkIn/" + lines._id, lines);
}

export function saveHeaderLines(h) {
  http.SetJwt();
  if (h.id) {
    const body = { ...h };
    return http.put(header(h.id), body);
  }
  return http.post(apiEndpoint, h);
}

export function deleteReservationLine(lineId) {
  return http.delete(header(lineId));
}

export function PostCreateRoomLinesApproval(Lines) {
  http.SetJwt();
  return http.put(apiEndpoint + "/CreateRoomsApproval/" + Lines.transId, Lines);
}
