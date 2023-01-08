import http from "../../httpServices";
import { GetApiUrl } from "../../../../config/ConfigBuilder";

const apiEndpoint = GetApiUrl + "/roomvariants";

function roomVariantUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getRoomVariants(isActiveOnly = false) {
  http.SetJwt();
  return http.get(apiEndpoint + "?isActiveOnly=" + isActiveOnly);
}

export function saveRoomVariant(variant) {
  http.SetJwt();
  if (variant.id) {
    const body = { ...variant };
    // delete body._id;
    return http.put(roomVariantUrl(variant.id), body);
  }
  return http.post(apiEndpoint, variant);
}
