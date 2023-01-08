import http from "../../httpServices";
import { GetApiUrl } from "../../../../config/ConfigBuilder";

const apiEndpoint = GetApiUrl + "/discounts";

function discountUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getDiscounts(isActiveOnly = false) {
  http.SetJwt();
  return http.get(apiEndpoint + "?isActiveOnly=" + isActiveOnly);
}

export function saveDiscount(discount) {
  http.SetJwt();
  if (discount.id) {
    const body = { ...discount };
    // delete body._id;
    return http.put(discountUrl(discount.id), body);
  }
  return http.post(apiEndpoint, discount);
}
