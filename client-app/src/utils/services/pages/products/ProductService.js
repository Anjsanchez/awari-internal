import http from "../../httpServices";
import { apiUrl } from "../../../../config/config.json";

const apiEndpoint = apiUrl + "/products";

function productUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getProducts(isActiveOnly = false) {
  http.SetJwt();
  return http.get(apiEndpoint + "?isActiveOnly=" + isActiveOnly);
}

export function GetProductsWithCategory() {
  http.SetJwt();
  return http.get(apiEndpoint + "/includesCategory");
}
export function saveProduct(product) {
  const id = product.get("_id");
  http.SetJwt();
  if (id) {
    // delete body._id;
    return http.put(productUrl(id), product);
  }
  return http.post(apiEndpoint, product);
}
