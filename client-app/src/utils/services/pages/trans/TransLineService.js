import http from "../../httpServices";
import { apiUrl } from "../../../../config/config.json";

const apiEndpoint = apiUrl + "/TransLines";

export function getTransLines() {
  http.SetJwt();
  return http.get(apiEndpoint);
}
