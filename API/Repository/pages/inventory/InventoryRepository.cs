﻿using API.Contracts.pages.inventory;
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

                if(id != null)
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



        public async  Task<ResultResponse> PostPurchaseOrderHeader(PurchaseOrder data)
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

        public async Task<PurchaseOrderReadDto> GetPurchaseOrderHeaderAndLine(Guid? id = null)
        {
            var POHeaders = await GetPurchaseOrders(id);
            var poHeader = POHeaders.FirstOrDefault();

            var poLines = _db.PurchaseOrderLines
                .Include(n => n.InventoryMaster)
                .Include(n=> n.InventoryMaster.InventoryUnit)
                .Where(n => n.PurchaseOrderId == id)
                .ToList();

            return new PurchaseOrderReadDto()
            {
                Header = poHeader,
                Lines = poLines
            };

        }
    }
}
