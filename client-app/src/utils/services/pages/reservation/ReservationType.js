import http from "../../httpServices";
import { GetApiUrl } from "../../../../config/ConfigBuilder";

const apiEndpoint = GetApiUrl + "/ReservationTypes";

export function GetReservationTypes() {
  http.SetJwt();
  return http.get(apiEndpoint);
}
