import http from "../../httpServices";
import { apiUrl } from "../../../../config/config.json";

const apiEndpoint = apiUrl + "/ApprovalTrans";

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
