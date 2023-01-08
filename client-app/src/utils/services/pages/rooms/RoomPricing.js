import http from "../../httpServices";
import { GetApiUrl } from "../../../../config/ConfigBuilder";

const apiEndpoint = GetApiUrl + "/roomPricings";

function roomPricing(id) {
  return `${apiEndpoint}/${id}`;
}

export function getRoomPricings() {
  http.SetJwt();
  return http.get(apiEndpoint);
}

export function getRoomPricingsByRoomId(roomId) {
  http.SetJwt();
  return http.get(`${apiEndpoint}/byRoomId?roomId=${roomId}`);
}

export function getRoomPricingsByVariantId(variantId) {
  http.SetJwt();
  return http.get(`${apiEndpoint}/byRoomVariant?variantId=${variantId}`);
}

export function saveRoomPricing(room) {
  http.SetJwt();
  if (room.id) {
    const body = { ...room };
    // delete body._id;
    return http.put(roomPricing(room.id), body);
  }
  return http.post(apiEndpoint, room);
}
