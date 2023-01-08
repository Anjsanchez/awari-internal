import http from "./../httpServices";
import { GetApiUrl } from "../../../config/ConfigBuilder";
const apiEndpoint = GetApiUrl + "/customers";

function customerUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getCustomers(isActiveOnly = false) {
  http.SetJwt();
  return http.get(apiEndpoint + "?isActiveOnly=" + isActiveOnly);
}

export function GetCustomersWithActiveBooking() {
  http.SetJwt();
  return http.get(apiEndpoint + "/GetCustomersWithActiveBooking");
}

export function getCustomerById(id) {
  http.SetJwt();
  return http.get(customerUrl(id));
}

export function saveCustomer(customer) {
  const id = customer.get("_id");
  http.SetJwt();
  if (id) {
    return http.put(customerUrl(id), customer);
  }
  return http.post(apiEndpoint, customer);
}

export function GetVendors(isActiveOnly = false) {
  http.SetJwt();
  return http.get(apiEndpoint + "/GetVendors?isActiveOnly=" + isActiveOnly);
}

export function UpsertVendors(data) {
  http.SetJwt();

  const body = { ...data };
  return http.put(`${apiEndpoint}/UpsertVendors`, body);
}
