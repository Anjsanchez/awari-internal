import http from "../../httpServices";
import { GetApiUrl } from "../../../../config/ConfigBuilder";

const apiEndpoint = GetApiUrl + "/ApprovalRooms";

function RoomUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getApprovalRoomById(id) {
  http.SetJwt();
  return http.get(RoomUrl(id));
}

export function updateApprovalRoom(obj) {
  http.SetJwt();
  const body = { ...obj };
  return http.put(RoomUrl(obj.id), body);
}
