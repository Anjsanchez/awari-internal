import http from "../../httpServices";
import { apiUrl } from "../../../../config/config.json";

const apiEndpoint = apiUrl + "/TransHeaders";

// function headerUrl(id) {
//   return `${apiEndpoint}/${id}`;
// }

export function getTransHeaders(getToday = false) {
  http.SetJwt();
  return http.get(apiEndpoint + `?isGetToday=${getToday}`);
}
