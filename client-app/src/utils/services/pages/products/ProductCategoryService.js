import http from "../../httpServices";
import { apiUrl } from "../../../../config/config.json";

const apiEndpoint = apiUrl + "/ProductCategories";

function prodCategoryUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getProdCategory(isActiveOnly = false) {
  http.SetJwt();
  return http.get(apiEndpoint + "?isActiveOnly=" + isActiveOnly);
}

export function saveProdCategory(category) {
  http.SetJwt();
  if (category.id) {
    const body = { ...category };
    // delete body._id;
    return http.put(prodCategoryUrl(category.id), body);
  }
  return http.post(apiEndpoint, category);
}
