import http from "../../httpServices";
import { apiUrl } from "../../../../config/config.json";

const apiEndpoint = apiUrl + "/TransRooms";

export function getTransRooms() {
  http.SetJwt();
  return http.get(apiEndpoint);
}
