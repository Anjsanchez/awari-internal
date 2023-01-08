import http from "../../httpServices";
import { GetApiUrl } from "../../../../config/ConfigBuilder";

const apiEndpoint = GetApiUrl + "/rooms";

function roomUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getRooms(isActiveOnly = false) {
  http.SetJwt();
  return http.get(apiEndpoint + "?isActiveOnly=" + isActiveOnly);
}

export function GetRoomWithPricing() {
  http.SetJwt();
  return http.get(apiEndpoint + "/byPricingAvailable");
}

export function GetRoomByPax(pax) {
  http.SetJwt();
  return http.get(apiEndpoint + "/byMinMaxPax?pax=" + pax);
}

export function saveRoom(room) {
  http.SetJwt();
  if (room.id) {
    const body = { ...room };
    // delete body._id;
    return http.put(roomUrl(room.id), body);
  }
  return http.post(apiEndpoint, room);
}
