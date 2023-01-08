import http from "./../../httpServices";
import { GetApiUrl } from "../../../../config/ConfigBuilder";

const apiEndpoint = GetApiUrl + "/TravelAgency";

export function GetTravelAgency() {
  http.SetJwt();
  return http.get(apiEndpoint);
}
