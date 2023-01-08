import http from "../../httpServices";
import { GetApiUrl } from "./../../../../config/ConfigBuilder";

const apiEndpoint = GetApiUrl + "/ApprovalHeaders";

function headerUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getApprovalHeaderById(id) {
  http.SetJwt();
  return http.get(headerUrl(id));
}

export function updateApprovalHeader(obj) {
  http.SetJwt();
  const body = { ...obj };
  return http.put(headerUrl(obj.id), body);
}
