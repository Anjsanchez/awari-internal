import http from "../../httpServices";
import { GetApiUrl } from "../../../../config/ConfigBuilder";

const apiEndpoint = GetApiUrl + "/TransLines";

export function getTransLines() {
  http.SetJwt();
  return http.get(apiEndpoint);
}
