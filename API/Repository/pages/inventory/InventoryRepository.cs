using API.Contracts.pages.inventory;
using API.Data;
using API.Data.ApiResponse;
using API.Dto.inventory;
using API.Models.inventory;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repository.pages.inventory
{
    public class InventoryRepository : IInventoryRepository
    {

        private readonly resortDbContext _db;
        public InventoryRepository(resortDbContext db)
        {
            _db = db;
        }

        public async Task<List<InventoryType>> GetInventoryTypes(bool isActiveOnly = false)
        {
            var datas = await _db.InventoryTypes
                            .Include(n => n.User)
                .ToListAsync();

            if (isActiveOnly)
                datas = datas.Where(n => n.IsActive == true).ToList();

            return datas;
        }
        public async Task<List<BomLine>> GetBomLines(Guid bomLineHeaderId)
        {
            try
            {
                var datas = await _db.BomLines
                .Include(n => n.Line)
                .Include(n => n.Line.InventoryUnit)
                .Include(n => n.Header)
                .Where(n => n.HeaderId == bomLineHeaderId)
                .ToListAsync();

                return datas;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task DeleteBomLineRecord(Guid bomLineHeaderId, Guid bomLineId)
        {
            try
            {
                var data = await _db.BomLines
                .Where(n => n.HeaderId == bomLineHeaderId)
                .Where(n => n.LineId == bomLineId)
                .FirstOrDefaultAsync();

                _db.BomLines.Remove(data);
                await _db.SaveChangesAsync();

                return;
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        public async Task<List<InventoryMaster>> GetInventoryMaster(bool isActiveOnly = false)
        {
            try
            {
                var datas = await _db.InventoryMaster
                .Include(n => n.User)
                .Include(n => n.ProductCategory)
                .Include(n => n.InventoryType)
                .Include(n => n.InventoryUnit)
                .ToListAsync();

                if (isActiveOnly)
                    datas = datas.Where(n => n.IsActive == true).ToList();

                return datas;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<ResultResponse> UpsertBomLine(BomLine data)
        {
            try
            {
                var res = await _db.BomLines
                    .Where(n => n.HeaderId == data.HeaderId)
                    .Where(n => n.LineId == data.LineId)
                    .FirstOrDefaultAsync();

                if (res == null)
                {
                    data._id = new Guid();
                    await _db.BomLines.AddAsync(data);
                }
                else
                {
                    res.Quantity = data.Quantity;
                    _db.BomLines.Update(res);
                }

                await _db.SaveChangesAsync();

                return new ResultResponse() { result = result.success };
            }
            catch (System.Exception ex)
            {
                return new ResultResponse()
                {
                    message = ex.Message,
                    result = result.error
                };
            }
        }

        public async Task<ResultResponse> UpsertInventoryMaster(InventoryMaster data)
        {
            try
            {
                var res = await _db.InventoryMaster
                    .FirstOrDefaultAsync(n => n._id == data._id);

                if (res == null)
                {
                    var DataIfNameExist = await _db.InventoryMaster
                    .FirstOrDefaultAsync(n => n.Name.ToLower() == data.Name.ToLower());

                    if (DataIfNameExist != null)
                    {
                        return new ResultResponse()
                        {
                            message = "Name already exist in the database.",
                            result = result.error
                        };
                    }

                    data._id = new Guid();
                    data.CreatedDate = DateTime.Now;
                    await _db.InventoryMaster.AddAsync(data);
                }
                else
                {
                    res.IsActive = data.IsActive;
                    res.Name = data.Name;

                    res.InventoryTypeId = data.InventoryTypeId;
                    res.QtyMainInventory = data.QtyMainInventory;
                    res.ProductCategoryId = data.ProductCategoryId;
                    res.QtyProductionInventory = data.QtyProductionInventory;

                    _db.InventoryMaster.Update(res);
                }

                await _db.SaveChangesAsync();

                return new ResultResponse() { result = result.success };
            }
            catch (System.Exception ex)
            {
                return new ResultResponse()
                {
                    message = ex.Message,
                    result = result.error
                };
            }
        }
        public async Task<ResultResponse> UpsertInventoryTypes(InventoryType data)
        {
            try
            {
                var res = await _db.InventoryTypes
                    .FirstOrDefaultAsync(n => n._id == data._id);

                if (res == null)
                {
                    var DataIfNameExist = await _db.InventoryTypes
                    .FirstOrDefaultAsync(n => n.Name.ToLower() == data.Name.ToLower());

                    if (DataIfNameExist != null)
                    {
                        return new ResultResponse()
                        {
                            message = "Name already exist in the database.",
                            result = result.error
                        };
                    }

                    data._id = new Guid();
                    data.CreatedDate = DateTime.Now;
                    await _db.InventoryTypes.AddAsync(data);
                }
                else
                {
                    res.IsActive = data.IsActive;
                    res.Name = data.Name;
                    _db.InventoryTypes.Update(res);
                }

                await _db.SaveChangesAsync();

                return new ResultResponse() { result = result.success };
            }
            catch (System.Exception ex)
            {
                return new ResultResponse()
                {
                    message = ex.Message,
                    result = result.error
                };
            }
        }
        public async Task<ResultResponse> UpsertInventoryUnits(InventoryUnit data)
        {
            try
            {
                var res = await _db.InventoryUnits
                    .FirstOrDefaultAsync(n => n._id == data._id);

                if (res == null)
                {
                    var DataIfNameExist = await _db.InventoryUnits
                    .FirstOrDefaultAsync(n => n.Name.ToLower() == data.Name.ToLower());

                    if (DataIfNameExist != null)
                    {
                        return new ResultResponse()
                        {
                            message = "Name already exist in the database.",
                            result = result.error
                        };
                    }

                    data._id = new Guid();
                    data.CreatedDate = DateTime.Now;
                    await _db.InventoryUnits.AddAsync(data);
                }
                else
                {
                    res.IsActive = data.IsActive;
                    res.Name = data.Name;
                    _db.InventoryUnits.Update(res);
                }

                await _db.SaveChangesAsync();

                return new ResultResponse() { result = result.success };
            }
            catch (System.Exception ex)
            {
                return new ResultResponse()
                {
                    message = ex.Message,
                    result = result.error
                };
            }
        }
        public async Task<List<InventoryUnit>> GetInventoryUnits(bool isActiveOnly = false)
        {
            var datas = await _db.InventoryUnits
                   .Include(n => n.User)
                   .ToListAsync();

            if (isActiveOnly)
                datas = datas.Where(n => n.IsActive == true).ToList();

            return datas;
        }

        public async Task<List<PurchaseOrder>> GetPurchaseOrders(Guid? id = null)
        {
            try
            {
                var datas = await _db.PurchaseOrders
                        .Include(n => n.Vendor)
                        .Include(n => n.ApprovedBy)
                        .Include(n => n.CreatedBy)
                        .Include(n => n.RequestedBy)
                        .ToListAsync();

                if (id != null)
                    datas = datas.Where(n => n._id == id).ToList();

                return datas;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task<ResultResponse> UpsertPurchaseOrderApproval(PurchaseOrder data)
        {
            try
            {

                if(data.ApprovalStatus == Models.Enum.EnumModels.PurchaseOrderStatus.Cancelled)
                {
                    //do checking kung yung ica-cancel ay may lines ng approved
                    var lineData = await GetPurchaseOrderLinesByPurchOrder(data._id);
                    foreach (var item in lineData)
                    {
                        if (item.LineStatus != Models.Enum.EnumModels.RcvStatus.Unreceived)
                            throw new Exception("Cancellation error: One of the lines is already received.");
                    }
                };


                data.ApprovedDate = DateTime.Now;
                _db.PurchaseOrders.Update(data).Property(x => x.PurchaseOrderNumber).IsModified = false;
                await _db.SaveChangesAsync();

                return new ResultResponse() { result = result.success };
            }
            catch (System.Exception ex)
            {
                return new ResultResponse()
                {
                    message = ex.Message,
                    result = result.error
                };
            }
        }



        public async Task<ResultResponse> PostPurchaseOrderHeader(PurchaseOrder data)
        {
            try
            {
                data.RequestDate = DateTime.Now;
                data.CreatedDate = DateTime.Now;
                _db.PurchaseOrders.Update(data);
                await _db.SaveChangesAsync();

                return new ResultResponse() { result = result.success, message = data._id.ToString() };
            }
            catch (System.Exception ex)
            {
                return new ResultResponse()
                {
                    message = ex.Message,
                    result = result.error
                };
            }
        }

        public async Task<ResultResponse> PostPurchaseOrderLines(List<PurchaseOrderLines> data)
        {
            try
            {
                _db.PurchaseOrderLines.UpdateRange(data);
                await _db.SaveChangesAsync();

                return new ResultResponse() { result = result.success };
            }
            catch (System.Exception ex)
            {
                return new ResultResponse()
                {
                    message = ex.Message,
                    result = result.error
                };
            }
        }
        public async Task<PurchaseOrderLines> GetPurchaseOrderLinesById(Guid? id = null)
        {
            var poLines = await _db.PurchaseOrderLines
                .Include(n => n.InventoryMaster)
                .Include(n => n.InventoryMaster.InventoryUnit)
                .FirstOrDefaultAsync(n => n._id == id);

            return poLines;
        }

        public async Task<List<PurchaseOrderLines>> GetPurchaseOrderLinesByPurchOrder(Guid? id = null)
        {
            var poLines = await _db.PurchaseOrderLines
                .Include(n => n.InventoryMaster)
                .Include(n => n.InventoryMaster.InventoryUnit)
                .Where(n => n.PurchaseOrderId == id)
                .ToListAsync();

            return poLines;
        }


        public async Task<List<PurchaseReq>> GetPurchaseRequisition(Guid? id = null)
        {
            try
            {
                var datas = await _db.PurchaseReq
                        .Include(n => n.ApprovedBy)
                        .Include(n => n.CreatedBy)
                        .Include(n => n.RequestedBy)
                        .ToListAsync();

                if (id != null)
                    datas = datas.Where(n => n._id == id).ToList();

                return datas;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task<PurchaseReqReadDto> GetPurchaseReqHeaderAndLine(Guid? id = null)
        {
            var POHeaders = await GetPurchaseRequisition(id);
            var poHeader = POHeaders.FirstOrDefault();


            var poLines = _db.PurchaseReqLines
                .Include(n => n.InventoryMaster)
                .Include(n => n.InventoryMaster.InventoryUnit)
                .Where(n => n.PurchaseReqId == id)
                .ToList();

            return new PurchaseReqReadDto()
            {
                Header = poHeader,
                Lines = poLines
            };
        }

        public async Task<ResultResponse> UpsertPurchaseReqApproval(PurchaseReq data)
        {
            try
            {
                data.ApprovedDate = DateTime.Now;
                _db.PurchaseReq.Update(data).Property(x => x.PurchaseRequisitionNumber).IsModified = false;
                await _db.SaveChangesAsync();

                if (data.ApprovalStatus == Models.Enum.EnumModels.PurchaseOrderStatus.Approved)
                    await UpdateInventoryQuantity(data);

                return new ResultResponse() { result = result.success };
            }
            catch (System.Exception ex)
            {
                return new ResultResponse()
                {
                    message = ex.Message,
                    result = result.error
                };
            }
        }

        private async Task UpdateInventoryQuantity(PurchaseReq data)
        {
            var listItems = new List<InventoryMaster>();

            var reqLines = _db.PurchaseReqLines
                              .Where(n => n.PurchaseReqId == data._id)
                              .ToList();

            foreach (var item in reqLines)
            {
                var invItem = _db.InventoryMaster.FirstOrDefault(n => n._id == item.InventoryMasterId);
                invItem.QtyProductionInventory += item.LineQuantity;
                invItem.QtyMainInventory -= item.LineQuantity;
                listItems.Add(invItem);
            }

            _db.InventoryMaster.UpdateRange(listItems);
            await _db.SaveChangesAsync();
        }

        private async Task UpdateInventoryQuantityThruInventoryAdjustment(InventoryAdjustment data)
        {
            var listItems = new List<InventoryMaster>();

            var reqLines = _db.InventoryAdjustmentLines
                              .Where(n => n.InventoryAdjustmentId == data._id)
                              .ToList();

            foreach (var item in reqLines)
            {
                var invItem = _db.InventoryMaster.FirstOrDefault(n => n._id == item.InventoryMasterId);

                if(item.InventoryLocation == Models.Enum.EnumModels.InventoryLocation.Production)
                {
                    if (item.AdjustmentAction == Models.Enum.EnumModels.AdjustmentAction.Increase)
                        invItem.QtyProductionInventory += item.Quantity;
                    if (item.AdjustmentAction == Models.Enum.EnumModels.AdjustmentAction.Decrease)
                        invItem.QtyProductionInventory -= item.Quantity;
                }

                if (item.InventoryLocation == Models.Enum.EnumModels.InventoryLocation.Main)
                {
                    if (item.AdjustmentAction == Models.Enum.EnumModels.AdjustmentAction.Increase)
                        invItem.QtyMainInventory += item.Quantity;
                    if (item.AdjustmentAction == Models.Enum.EnumModels.AdjustmentAction.Decrease)
                        invItem.QtyMainInventory -= item.Quantity;
                }

                listItems.Add(invItem);
            }

            _db.InventoryMaster.UpdateRange(listItems);
            await _db.SaveChangesAsync();
        }

        public async Task<ResultResponse> PostPurchaseReqLines(List<PurchaseReqLines> data)
        {
            try
            {
                _db.PurchaseReqLines.UpdateRange(data);
                await _db.SaveChangesAsync();

                return new ResultResponse() { result = result.success };
            }
            catch (System.Exception ex)
            {
                return new ResultResponse()
                {
                    message = ex.Message,
                    result = result.error
                };
            }
        }

        public async Task<ResultResponse> PostPurchaseReqHeader(PurchaseReq data)
        {
            try
            {
                data.RequestDate = DateTime.Now;
                data.CreatedDate = DateTime.Now;
                _db.PurchaseReq.Update(data);
                await _db.SaveChangesAsync();

                return new ResultResponse() { result = result.success, message = data._id.ToString() };
            }
            catch (System.Exception ex)
            {
                return new ResultResponse()
                {
                    message = ex.Message,
                    result = result.error
                };
            }
        }

        public async Task<ResultResponse> UpsertPurchaseLineReceive(PurchaseOrderLines data, float oldQty)
        {
            try
            {

                data.ReceivedDate = DateTime.Now;
                if(data.ReceivedQuantity == 0)
                    data.LineStatus = Models.Enum.EnumModels.RcvStatus.Unreceived;
                else if (data.ReceivedQuantity >= data.LineQuantity)
                    data.LineStatus = Models.Enum.EnumModels.RcvStatus.Received;
                else
                    data.LineStatus = Models.Enum.EnumModels.RcvStatus.Partial;

                _db.PurchaseOrderLines.Update(data);
                await _db.SaveChangesAsync();

                var invItem = _db.InventoryMaster.FirstOrDefault(n => n._id == data.InventoryMasterId);
                invItem.QtyMainInventory -= oldQty;
                invItem.QtyMainInventory += data.ReceivedQuantity;

                _db.InventoryMaster.Update(invItem);
                await _db.SaveChangesAsync();

                return new ResultResponse() { result = result.success };
            }
            catch (System.Exception ex)
            {
                return new ResultResponse()
                {
                    message = ex.Message,
                    result = result.error
                };
            }
        }

        public async Task<ResultResponse> PatchPurchaseOrdersReceive(PurchaseOrder data)
        {
            try
            {
                data.ReceivedByDate = DateTime.Now;
                data.RcvStatus = Models.Enum.EnumModels.RcvStatus.Received;
                var lines = await GetPurchaseOrderLinesByPurchOrder(data._id);

                var containsPartial = false;
                var containsUnreceived = false;
                var containsReceived = false;

                foreach (var item in lines)
                {
                    if (item.LineStatus == Models.Enum.EnumModels.RcvStatus.Unreceived)
                        containsUnreceived = true;
                    if (item.LineStatus == Models.Enum.EnumModels.RcvStatus.Partial)
                        containsPartial = true;
                    if (item.LineStatus == Models.Enum.EnumModels.RcvStatus.Received)
                        containsReceived = true;
                }

                data.RcvStatus = Models.Enum.EnumModels.RcvStatus.Received;
                if (containsUnreceived)
                    data.RcvStatus = Models.Enum.EnumModels.RcvStatus.Unreceived;
                if (containsPartial || containsPartial 
                    && containsUnreceived || containsReceived 
                    && containsPartial || containsReceived 
                    && containsUnreceived)
                    data.RcvStatus = Models.Enum.EnumModels.RcvStatus.Partial;

                _db.PurchaseOrders.Update(data).Property(x => x.PurchaseOrderNumber).IsModified = false;
                await _db.SaveChangesAsync();

                return new ResultResponse() { result = result.success };
            }
            catch (System.Exception ex)
            {
                return new ResultResponse()
                {
                    message = ex.Message,
                    result = result.error
                };
            }
        }

        public async Task<List<InventoryAdjustment>> GetInventoryAdjustments(Guid? id = null)
        {
            try
            {
                var datas = await _db.InventoryAdjustments
                        .Include(n => n.ApprovedBy)
                        .Include(n => n.CreatedBy)
                        .Include(n => n.RequestedBy)
                        .ToListAsync();

                if (id != null)
                    datas = datas.Where(n => n._id == id).ToList();

                return datas;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<InventoryAdjustmentLines>> GetInvAdjLinesByInvAdjustment(Guid? id = null)
        {
            var poLines = await _db.InventoryAdjustmentLines
                               .Include(n => n.InventoryMaster)
                               .Include(n => n.InventoryMaster.InventoryUnit)
                               .Where(n => n.InventoryAdjustmentId == id)
                               .ToListAsync();

            return poLines;
        }

        public async Task<ResultResponse> UpsertInvAdjApproval(InventoryAdjustment data)
        {
            try
            {
                data.ApprovedDate = DateTime.Now;
                _db.InventoryAdjustments.Update(data).Property(x => x.JournalNumber).IsModified = false;
                await _db.SaveChangesAsync();


                if (data.ApprovalStatus == Models.Enum.EnumModels.PurchaseOrderStatus.Approved)
                    await UpdateInventoryQuantityThruInventoryAdjustment(data);



                return new ResultResponse() { result = result.success };
            }
            catch (System.Exception ex)
            {
                return new ResultResponse()
                {
                    message = ex.Message,
                    result = result.error
                };
            }
        }

        public async Task<ResultResponse> PostInvAdjLines(List<InventoryAdjustmentLines> data)
        {
            try
            {
                _db.InventoryAdjustmentLines.UpdateRange(data);
                await _db.SaveChangesAsync();

                return new ResultResponse() { result = result.success };
            }
            catch (System.Exception ex)
            {
                return new ResultResponse()
                {
                    message = ex.Message,
                    result = result.error
                };
            }
        }

        public async Task<ResultResponse> PostInvAdjHeader(InventoryAdjustment data)
        {
            try
            {
                data.RequestDate = DateTime.Now;
                data.CreatedDate = DateTime.Now;
                _db.InventoryAdjustments.Update(data);
                await _db.SaveChangesAsync();

                return new ResultResponse() { result = result.success, message = data._id.ToString() };
            }
            catch (System.Exception ex)
            {
                return new ResultResponse()
                {
                    message = ex.Message,
                    result = result.error
                };
            }
        }

        public async Task<List<WorkOrder>> GetWorkOrders(Guid? id = null)
        {
            try
            {
                var datas = await _db.WorkOrder
                        .Include(n => n.ApprovedBy)
                        .Include(n => n.CreatedBy)
                        .Include(n => n.RequestedBy)
                        .ToListAsync();

                if (id != null)
                    datas = datas.Where(n => n._id == id).ToList();

                return datas;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<ResultResponse> UpsertWorkOrderApproval(WorkOrder data)
        {
            try
            {
                data.ApprovedDate = DateTime.Now;
                _db.WorkOrder.Update(data).Property(x => x.WorkOrderNumber).IsModified = false;
                await _db.SaveChangesAsync();

                return new ResultResponse() { result = result.success };
            }
            catch (System.Exception ex)
            {
                return new ResultResponse()
                {
                    message = ex.Message,
                    result = result.error
                };
            }
        }

        public async Task<ResultResponse> PostWorkOrder(WorkOrder data)
        {
            try
            {
                data.RequestDate = DateTime.Now;
                data.CreatedDate = DateTime.Now;
                _db.WorkOrder.Update(data);
                await _db.SaveChangesAsync();

                return new ResultResponse() { result = result.success, message = data._id.ToString() };
            }
            catch (System.Exception ex)
            {
                return new ResultResponse()
                {
                    message = ex.Message,
                    result = result.error
                };
            }
        }
    }
}
