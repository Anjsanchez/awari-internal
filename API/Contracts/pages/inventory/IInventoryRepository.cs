using API.Data.ApiResponse;
using API.Dto.inventory;
using API.Models.inventory;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Contracts.pages.inventory
{
    public interface IInventoryRepository
    {
        Task<List<InventoryType>> GetInventoryTypes(bool isActiveOnly = false);
        Task<List<InventoryUnit>> GetInventoryUnits(bool isActiveOnly = false);
        Task<List<InventoryMaster>> GetInventoryMaster(bool isActiveOnly = false);
        Task<List<PurchaseOrder>> GetPurchaseOrders(Guid? id = null);
        Task<List<PurchaseReq>> GetPurchaseRequisition(Guid? id = null);
        Task<PurchaseOrderLines> GetPurchaseOrderLinesById(Guid? id = null);
        Task<List<PurchaseOrderLines>> GetPurchaseOrderLinesByPurchOrder(Guid? id = null);
        Task<PurchaseReqReadDto> GetPurchaseReqHeaderAndLine(Guid? id = null);
        Task<ResultResponse> UpsertPurchaseOrderApproval(PurchaseOrder data);
        Task<ResultResponse> PatchPurchaseOrdersReceive(PurchaseOrder data);
        Task<ResultResponse> UpsertPurchaseLineReceive(PurchaseOrderLines data, float oldQty);
        Task<ResultResponse> UpsertPurchaseReqApproval(PurchaseReq data);
        Task<ResultResponse> PostPurchaseOrderLines(List<PurchaseOrderLines> data);
        Task<ResultResponse> PostPurchaseReqLines(List<PurchaseReqLines> data);
        Task<ResultResponse> PostPurchaseOrderHeader(PurchaseOrder data);

        Task<ResultResponse> PostPurchaseReqHeader(PurchaseReq data);

        Task<List<BomLine>> GetBomLines(Guid bomLineHeaderId);
        Task DeleteBomLineRecord(Guid bomLineHeaderId, Guid bomLineId);



        Task<ResultResponse> UpsertInventoryTypes(InventoryType data);
        Task<ResultResponse> UpsertInventoryUnits(InventoryUnit data);
        Task<ResultResponse> UpsertInventoryMaster(InventoryMaster data);
        Task<ResultResponse> UpsertBomLine(BomLine data);
        

    }
}
