import http from "../../httpServices";
import { GetApiUrl } from "../../../../config/ConfigBuilder";

const apiEndpoint = GetApiUrl + "/ProductTypes";

export function getProdTypes() {
  http.SetJwt();
  return http.get(apiEndpoint);
}
