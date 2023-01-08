﻿using API.Data.ApiResponse;
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
        Task<PurchaseOrderReadDto> GetPurchaseOrderHeaderAndLine(Guid? id = null);
        Task<ResultResponse> UpsertPurchaseOrderApproval(PurchaseOrder data);
        Task<ResultResponse> PostPurchaseOrderLines(List<PurchaseOrderLines> data);
        Task<ResultResponse> PostPurchaseOrderHeader(PurchaseOrder data);

        Task<List<BomLine>> GetBomLines(Guid bomLineHeaderId);
        Task DeleteBomLineRecord(Guid bomLineHeaderId, Guid bomLineId);



        Task<ResultResponse> UpsertInventoryTypes(InventoryType data);
        Task<ResultResponse> UpsertInventoryUnits(InventoryUnit data);
        Task<ResultResponse> UpsertInventoryMaster(InventoryMaster data);
        Task<ResultResponse> UpsertBomLine(BomLine data);
        

    }
}
