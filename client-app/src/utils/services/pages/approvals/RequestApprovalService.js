import { apiUrl } from "../../../../config/config.json";
import http from "../../httpServices";

const apiEndpoint = apiUrl + "/RequestApprovals";

export function GetRequestApprovals() {
  http.SetJwt();
  return http.get(apiEndpoint);
}
