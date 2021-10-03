import { apiUrl } from "../../../../config/config.json";
import http from "./../../httpServices";

const apiEndpoint = apiUrl + "/TravelAgency";

export function GetTravelAgency() {
  http.SetJwt();
  return http.get(apiEndpoint);
}
