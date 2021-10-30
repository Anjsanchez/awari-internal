import http from "../../httpServices";
import { apiUrl } from "../../../../config/config.json";

const apiEndpoint = apiUrl + "/ProductTypes";

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
