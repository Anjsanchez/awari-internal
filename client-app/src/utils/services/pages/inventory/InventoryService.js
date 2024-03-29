import http from "../../httpServices";
import { GetApiUrl } from "../../../../config/ConfigBuilder";
import { store } from "../../../store/configureStore";

const apiEndpoint = GetApiUrl + "/Inventory";

export function GetInventoryTypes(isActiveOnly = false) {
  http.SetJwt();
  return http.get(
    apiEndpoint + "/GetInventoryTypes?isActiveOnly=" + isActiveOnly
  );
}

export function UpsertInventoryUnits(data) {
  http.SetJwt();

  const body = { ...data };
  if (!data._id) body.userId = store.getState().entities.user.user.id;

  return http.put(`${apiEndpoint}/UpsertInventoryUnits`, body);
}
export function UpsertInventoryMaster(data) {
  http.SetJwt();

  const body = { ...data };
  if (!data._id) body.userId = store.getState().entities.user.user.id;

  return http.put(`${apiEndpoint}/UpsertInventoryMaster`, body);
}

export function UpsertInventoryTypes(data) {
  http.SetJwt();

  const body = { ...data };
  if (!data._id) body.userId = store.getState().entities.user.user.id;

  return http.put(`${apiEndpoint}/UpsertInventoryTypes`, body);
}

export function GetInventoryMaster(isActiveOnly = false) {
  http.SetJwt();
  return http.get(
    apiEndpoint + "/GetInventoryMaster?isActiveOnly=" + isActiveOnly
  );
}

export function GetInventoryUnits(isActiveOnly = false) {
  http.SetJwt();
  return http.get(
    apiEndpoint + "/GetInventoryUnits?isActiveOnly=" + isActiveOnly
  );
}
export function GetPurchaseOrders() {
  http.SetJwt();
  return http.get(apiEndpoint + "/GetPurchaseOrders");
}
export function GetInventoryAdjustments() {
  http.SetJwt();
  return http.get(apiEndpoint + "/GetInventoryAdjustments");
}
export function GetWorkOrders(Guid = null) {
  http.SetJwt();

  let endPoint = apiEndpoint + `/GetWorkOrders`;
  if (Guid != null) endPoint = apiEndpoint + `/GetWorkOrders?id=${Guid}`;
  return http.get(endPoint);
}

export function GetPurchaseRequisition() {
  http.SetJwt();
  return http.get(apiEndpoint + "/GetPurchaseRequisition");
}

export function PatchPurchaseOrdersApproval(data) {
  http.SetJwt();

  const body = { ...data };
  return http.put(`${apiEndpoint}/PatchPurchaseOrdersApproval`, body);
}

export function PatchInvAdjApproval(data) {
  http.SetJwt();

  const body = { ...data };
  return http.put(`${apiEndpoint}/PatchInvAdjApproval`, body);
}
export function PatchWorkOrderApproval(data) {
  http.SetJwt();

  const body = { ...data };
  return http.put(`${apiEndpoint}/PatchWorkOrderApproval`, body);
}
export function PatchPurchaseOrdersReceive(data) {
  http.SetJwt();

  const body = { ...data };
  return http.put(`${apiEndpoint}/PatchPurchaseOrdersReceive`, body);
}

export function PatchPurchaseReqApproval(data) {
  http.SetJwt();

  const body = { ...data };
  return http.put(`${apiEndpoint}/PatchPurchaseReqApproval`, body);
}

export function GetBomLines(Guid) {
  http.SetJwt();
  return http.get(apiEndpoint + "/GetBomLines?bomLineHeaderId=" + Guid);
}

export function UpsertBomLine(data) {
  http.SetJwt();

  const body = { ...data };
  return http.put(`${apiEndpoint}/UpsertBomLine`, body);
}

export function PostPurchaseOrderLines(data) {
  http.SetJwt();

  const body = { ...data };
  return http.post(`${apiEndpoint}/PostPurchaseOrderLines`, body);
}
export function PostInvAdjLines(data) {
  http.SetJwt();

  const body = { ...data };
  return http.post(`${apiEndpoint}/PostInvAdjLines`, body);
}
export function PostWorkOrder(data) {
  http.SetJwt();

  const body = { ...data };
  return http.post(`${apiEndpoint}/PostWorkOrder`, body);
}

export function PatchPurchaseLineReceive(data) {
  http.SetJwt();

  const body = { ...data };
  return http.put(`${apiEndpoint}/PatchPurchaseLineReceive`, body);
}

export function PostPurchaseReqLines(data) {
  http.SetJwt();

  const body = { ...data };
  return http.post(`${apiEndpoint}/PostPurchaseReqLines`, body);
}

export function DeleteBomLineRecord(headerId, lineId) {
  http.SetJwt();
  return http.delete(
    apiEndpoint +
      "/DeleteBomLineRecord?bomLineHeaderId=" +
      headerId +
      "&bomLineId=" +
      lineId
  );
}
export function GetPurchaseOrderHeaderAndLine(id) {
  http.SetJwt();
  return http.get(apiEndpoint + "/GetPurchaseOrderHeaderAndLine?id=" + id);
}
export function GetInvAdjHeaderAndLine(id) {
  http.SetJwt();
  return http.get(apiEndpoint + "/GetInvAdjHeaderAndLine?id=" + id);
}

export function GetPurchaseReqHeaderAndLine(id) {
  http.SetJwt();
  return http.get(apiEndpoint + "/GetPurchaseReqHeaderAndLine?id=" + id);
}
