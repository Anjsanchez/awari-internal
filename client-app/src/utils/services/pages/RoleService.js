import http from "./../httpServices";
import { GetApiUrl } from "../../../config/ConfigBuilder";
const apiEndpoint = GetApiUrl + "/roles";

export function getRoles() {
  http.SetJwt();
  return http.get(apiEndpoint);
}
