import { GetApiUrl } from "../../../../config/ConfigBuilder";
import http from "../../httpServices";

const apiEndpoint = GetApiUrl + "/RequestApprovals";

export function GetRequestApprovals() {
  http.SetJwt();
  return http.get(apiEndpoint);
}
