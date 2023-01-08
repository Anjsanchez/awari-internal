import http from "../../httpServices";
import { GetApiUrl } from "../../../../config/ConfigBuilder";

const apiEndpoint = GetApiUrl + "/ProductTypes";

function prodClassificationUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getProdClassification(isActiveOnly = false) {
  http.SetJwt();
  return http.get(apiEndpoint + "?isActiveOnly=" + isActiveOnly);
}

export function saveProdClassification(category) {
  http.SetJwt();
  if (category.id) {
    const body = { ...category };
    // delete body._id;
    return http.put(prodClassificationUrl(category.id), body);
  }
  return http.post(apiEndpoint, category);
}
