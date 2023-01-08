import http from "../../httpServices";
import { GetApiUrl } from "../../../../config/ConfigBuilder";
const apiEndpoint = GetApiUrl + "/TransRooms";

export function getTransRooms() {
  http.SetJwt();
  return http.get(apiEndpoint);
}
