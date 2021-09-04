import http from "../../httpServices";
import { apiUrl } from "../../../../config/config.json";

const apiEndpoint = apiUrl + "/ProductTypes";

export function getProdTypes() {
  http.SetJwt();
  return http.get(apiEndpoint);
}
