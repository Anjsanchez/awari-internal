import http from "../../httpServices";
import { GetApiUrl } from "../../../../config/ConfigBuilder";

const apiEndpoint = GetApiUrl + "/ReservationHeaders";

function header(id) {
  return `${apiEndpoint}/${id}`;
}

export function getHeaders(isActiveOnly = false) {
  http.SetJwt();
  return http.get(apiEndpoint + `?isActiveOnly=${isActiveOnly}`);
}

export function DeleteReservationHeader(HeaderId) {
  return http.delete(header(HeaderId));
}

export function GetHeaderWithRoomCount() {
  http.SetJwt();
  return http.get(apiEndpoint + "/includesRoomCount");
}

export function PostCheckOutReservation(headerId) {
  http.SetJwt();
  return http.get(apiEndpoint + "/CheckOut?id=" + headerId);
}

export function PostCheckOutForfeitedPayment(headerId) {
  http.SetJwt();
  return http.get(
    apiEndpoint +
      "/CheckOut?id=" +
      headerId +
      "&isFromCheckOutReservation=false"
  );
}

export function GetHeadersWithFullDetails(headerId) {
  http.SetJwt();
  return http.get(apiEndpoint + "/includesFullDetails?headerId=" + headerId);
}

export function GetRoomVariantHeader(fromDate, toDate, pax) {
  const date = FormatDate(fromDate, toDate);

  http.SetJwt();
  return http.get(
    apiEndpoint +
      `/includesRoom?fromDate=${date.start}&toDate=${date.end}&pax=${pax}`
  );
}

function FormatDate(fromDate, toDate) {
  const fromDateClone = fromDate.clone();
  const todateClone = toDate.clone();

  const start = fromDateClone.subtract(7, "days").format("YYYY-MM-DD");
  const end = todateClone.add(7, "day").format("YYYY-MM-DD");

  return { start, end };
}

export function saveHeader(h) {
  http.SetJwt();
  if (h._id) {
    const body = { ...h };
    return http.put(header(h._id), body);
  }
  return http.post(apiEndpoint, h);
}

export function PostCreateHeaderLinesApproval(Lines) {
  http.SetJwt();
  return http.put(
    apiEndpoint + "/CreateHeadersApproval/" + Lines.transId,
    Lines
  );
}
