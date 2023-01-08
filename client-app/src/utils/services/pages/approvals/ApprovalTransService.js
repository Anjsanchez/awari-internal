import http from "../../httpServices";
import { GetApiUrl } from "../../../../config/ConfigBuilder";

const apiEndpoint = GetApiUrl + "/ApprovalTrans";

function TransUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getApprovalTransById(id) {
  http.SetJwt();
  return http.get(TransUrl(id));
}

export function updateApprovalTrans(obj) {
  http.SetJwt();
  const body = { ...obj };
  return http.put(TransUrl(obj.id), body);
}
