using API.Contracts.pages.inventory;
using API.Data.ApiResponse;
using API.Dto.inventory;
using API.helpers.api;
using API.Migrations.Configurations;
using API.Models.inventory;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace API.Controllers.inventory
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryRepository _repo;
        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;

        public IWebHostEnvironment _webHostEnv { get; set; }

        public InventoryController(IWebHostEnvironment webHostEnv, IInventoryRepository repo, IMapper mapp, IOptionsMonitor<jwtConfig> optionsMonitor)
        {
            _webHostEnv = webHostEnv;
            _repo = repo;
            _map = mapp;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpGet("GetInventoryTypes")]
        public async Task<ActionResult> GetInventoryTypes(bool isActiveOnly = false)
        {
            var data = await _repo.GetInventoryTypes(isActiveOnly);
             
            return Ok(new GenericResponse<InventoryType>()
            {
                listRecords = data,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }
        [HttpGet("GetInventoryUnits")]
        public async Task<ActionResult> GetInventoryUnits(bool isActiveOnly = false)
        {
            var data = await _repo.GetInventoryUnits(isActiveOnly);

            return Ok(new GenericResponse<InventoryUnit>()
            {
                listRecords = data,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("GetInventoryMaster")]
        public async Task<ActionResult> GetInventoryMaster(bool isActiveOnly = false)
        {
            var data = await _repo.GetInventoryMaster(isActiveOnly);

            return Ok(new GenericResponse<InventoryMaster>()
            {
                listRecords = data,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

   
        [HttpGet("GetBomLines")]
        public async Task<ActionResult> GetBomLines(Guid bomLineHeaderId)
        {
            var data = await _repo.GetBomLines(bomLineHeaderId);

            return Ok(new GenericResponse<BomLine>()
            {
                listRecords = data,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpDelete("DeleteBomLineRecord")]
        public async Task<ActionResult> DeleteBomLineRecord(Guid bomLineHeaderId, Guid bomLineId)
        {
            await _repo.DeleteBomLineRecord(bomLineHeaderId, bomLineId);

            return Ok();
        }

        [HttpGet("GetPurchaseRequisition")]
        public async Task<ActionResult> GetPurchaseRequisition(Guid? id)
        {
            var data = await _repo.GetPurchaseRequisition(id);
            var map = _map.Map<List<PurchaseReq>, List<PurchaseReqHeaderReadDto>>(data);


            return Ok(new GenericResponse<PurchaseReqHeaderReadDto>()
            {
                listRecords = map,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("GetPurchaseReqHeaderAndLine")]
        public async Task<ActionResult> GetPurchaseReqHeaderAndLine(Guid? id)
        {
            var data = await _repo.GetPurchaseReqHeaderAndLine(id);
            return Ok(new GenericResponse<PurchaseReqReadDto>()
            {
                singleRecord = data,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpPut("PatchPurchaseReqApproval")]
        public async Task<ActionResult> PatchPurchaseReqApproval([FromBody] PurchaseReqApprovalUpdateDto dto)
        {

            try
            {
                var data = await _repo.GetPurchaseRequisition(dto._id);

                var singleData = data.FirstOrDefault();
                _map.Map(dto, singleData);

                var result = await _repo.UpsertPurchaseReqApproval(singleData);

                if (result.result == Data.ApiResponse.result.error)
                    return BadRequest(result.message);

                return Ok(new GenericResponse<PurchaseReqHeaderReadDto>()
                {
                    listRecords = null,
                    Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
                });
            }
            catch (Exception)
            {

                throw;
            }
        }
        [HttpPost("PostPurchaseReqLines")]
        public async Task<ActionResult> PostPurchaseReqLines([FromBody] PurchaseReqCreateDto dto)
        {
            try
            {

                var headerMdl = _map.Map<PurchaseReqHeaderCreateDto, PurchaseReq>(dto.Header);

                foreach (var item in dto.Lines)
                    headerMdl.TotalQuantity += int.Parse(item.LineQuantity);

                var result = await _repo.PostPurchaseReqHeader(headerMdl);

                if (result.result == Data.ApiResponse.result.error)
                    return BadRequest(result.message);

                foreach (var item in dto.Lines)
                    item.PurchaseReqId = result.message;

                var lineMdl = _map.Map<List<PurchaseReqLineCreateDto>, List<PurchaseReqLines>>(dto.Lines);

                result = await _repo.PostPurchaseReqLines(lineMdl);

                if (result.result == Data.ApiResponse.result.error)
                    return BadRequest(result.message);

                return Ok(new GenericResponse<InventoryMaster>()
                {
                    singleRecord = null,
                    Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
                });
            }
            catch (Exception)
            {

                throw;
            }
        }


        [HttpGet("GetInventoryAdjustments")]
        public async Task<ActionResult> GetInventoryAdjustments(Guid? id)
        {
            var data = await _repo.GetInventoryAdjustments(id);
            var map = _map.Map<List<InventoryAdjustment>, List<InventoryAdjustmentHeaderReadDto>>(data);


            return Ok(new GenericResponse<InventoryAdjustmentHeaderReadDto>()
            {
                listRecords = map,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("GetPurchaseOrders")]
        public async Task<ActionResult> GetPurchaseOrders(Guid? id)
        {
            var data = await _repo.GetPurchaseOrders(id);
            var map = _map.Map<List<PurchaseOrder>, List<PurchaseOrderHeaderReadDto>>(data);


            return Ok(new GenericResponse<PurchaseOrderHeaderReadDto>()
            {
                listRecords = map,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("GetPurchaseOrderHeaderAndLine")]
        public async Task<ActionResult> GetPurchaseOrderHeaderAndLine(Guid? id)
        {
            var POHeaders = await _repo.GetPurchaseOrders(id);
            var poHeader = POHeaders.FirstOrDefault();
            var lines = await _repo.GetPurchaseOrderLinesByPurchOrder(id);
            var map = _map.Map<List<PurchaseOrderLines>, List<PurchaseOrderLinesReadDto>>(lines);

            var da = new PurchaseOrderReadDto()
            {
                Header = poHeader,
                Lines = map
            };

            return Ok(new GenericResponse<PurchaseOrderReadDto>()
            {
                singleRecord = da,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("GetInvAdjHeaderAndLine")]
        public async Task<ActionResult> GetInvAdjHeaderAndLine(Guid? id)
        {
            var datas = await _repo.GetInventoryAdjustments(id);
            var data = datas.FirstOrDefault();
            var lines = await _repo.GetInvAdjLinesByInvAdjustment(id);
            var map = _map.Map<List<InventoryAdjustmentLines>, List<InvAdjustmentLinesReadDto>>(lines);

            var da = new InventoryAdjustmentReadDto()
            {
                Header = data,
                Lines = map
            };

            return Ok(new GenericResponse<InventoryAdjustmentReadDto>()
            {
                singleRecord = da,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpPut("PatchPurchaseLineReceive")]
        public async Task<ActionResult> PatchPurchaseLineReceive([FromBody] PurchaseOrderLineApprovalUpdateDto dto)
        {
            try
            {
                var data = await _repo.GetPurchaseOrderLinesById(dto._id);
                float oldQty = data.ReceivedQuantity;

                _map.Map(dto, data);

                var result = await _repo.UpsertPurchaseLineReceive(data, oldQty);

                if (result.result == Data.ApiResponse.result.error)
                    return BadRequest(result.message);

                return Ok(new GenericResponse<PurchaseOrderHeaderReadDto>()
                {
                    listRecords = null,
                    Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
                });
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPut("PatchPurchaseOrdersReceive")]
        public async Task<ActionResult> PatchPurchaseOrdersReceive([FromBody] PurchaseOrderReceivedUpdateDto dto)
        {
            try
            {
                var data = await _repo.GetPurchaseOrders(dto._id);

                var singleData = data.FirstOrDefault();
                _map.Map(dto, singleData);

                var result = await _repo.PatchPurchaseOrdersReceive(singleData);

                if (result.result == Data.ApiResponse.result.error)
                    return BadRequest(result.message);

                return Ok(new GenericResponse<PurchaseOrderHeaderReadDto>()
                {
                    listRecords = null,
                    Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
                });
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPut("PatchPurchaseOrdersApproval")]
        public async Task<ActionResult> PatchPurchaseOrdersApproval([FromBody] PurchaseOrderApprovalUpdateDto dto)
        {

            try
            {
                var data = await _repo.GetPurchaseOrders(dto._id);

                var singleData = data.FirstOrDefault();
                _map.Map(dto, singleData);
                 
                var result = await _repo.UpsertPurchaseOrderApproval(singleData);

                if (result.result == Data.ApiResponse.result.error)
                    return BadRequest(result.message);

                return Ok(new GenericResponse<PurchaseOrderHeaderReadDto>()
                {
                    listRecords = null,
                    Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
                });
            }
            catch (Exception)
            {

                throw;
            }
        }


        [HttpPut("PatchInvAdjApproval")]
        public async Task<ActionResult> PatchInvAdjApproval([FromBody] InvAdjApprovalUpdateDto dto)
        {

            try
            {
                var data = await _repo.GetInventoryAdjustments(dto._id);

                var singleData = data.FirstOrDefault();
                _map.Map(dto, singleData);

                var result = await _repo.UpsertInvAdjApproval(singleData);

                if (result.result == Data.ApiResponse.result.error)
                    return BadRequest(result.message);

                return Ok(new GenericResponse<InventoryAdjustmentHeaderReadDto>()
                {
                    listRecords = null,
                    Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
                });
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost("PostInvAdjLines")]
        public async Task<ActionResult> PostInvAdjLines([FromBody] InvAdjCreateDto dto)
        {
            try
            {
                var headerMdl = _map.Map<InvAdjHeaderCreateDto, InventoryAdjustment>(dto.Header);

                var result = await _repo.PostInvAdjHeader(headerMdl);

                if (result.result == Data.ApiResponse.result.error)
                    return BadRequest(result.message);

                foreach (var item in dto.Lines)
                    item.InventoryAdjustmentId = result.message;

                var lineMdl = _map.Map<List<InvAdjLineCreateDto>, List<InventoryAdjustmentLines>>(dto.Lines);

                result = await _repo.PostInvAdjLines(lineMdl);

                if (result.result == Data.ApiResponse.result.error)
                    return BadRequest(result.message);

                return Ok(new GenericResponse<InventoryMaster>()
                {
                    singleRecord = null,
                    Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
                });
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost("PostPurchaseOrderLines")]
        public async Task<ActionResult> PostPurchaseOrderLines([FromBody] PurchaseOrderCreateDto dto)
        {
            try
            {

                var headerMdl = _map.Map<PurchaseOrderHeaderCreateDto, PurchaseOrder>(dto.Header);

                foreach (var item in dto.Lines)
                    headerMdl.TotalQuantity += int.Parse(item.LineQuantity);

                var result = await _repo.PostPurchaseOrderHeader(headerMdl);

                if (result.result == Data.ApiResponse.result.error)
                    return BadRequest(result.message);

                foreach (var item in dto.Lines)
                    item.PurchaseOrderId = result.message;
                 
                var lineMdl = _map.Map<List<PurchaseOrderLineCreateDto>, List<PurchaseOrderLines>>(dto.Lines);

                 result = await _repo.PostPurchaseOrderLines(lineMdl);

                if (result.result == Data.ApiResponse.result.error)
                    return BadRequest(result.message);

                return Ok(new GenericResponse<InventoryMaster>()
                {
                    singleRecord = null,
                    Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
                });
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPut("UpsertBomLine")]
        public async Task<ActionResult<int>> UpsertBomLine(BomLineDto dto)
        {

            var cmdMdl = _map.Map<BomLineDto, BomLine>(dto);

            var result = await _repo.UpsertBomLine(cmdMdl);

            if (result.result == Data.ApiResponse.result.error)
                return BadRequest(result.message);

            return Ok(new GenericResponse<InventoryMaster>()
            {
                singleRecord = null,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpPut("UpsertInventoryMaster")]
        public async Task<ActionResult<int>> UpsertInventoryMaster(InventoryMasterDto dto)
        {

            var cmdMdl = _map.Map<InventoryMasterDto, InventoryMaster>(dto);

            var result = await _repo.UpsertInventoryMaster(cmdMdl);

            if (result.result == Data.ApiResponse.result.error)
                return BadRequest(result.message);

            return Ok(new GenericResponse<InventoryMaster>()
            {
                singleRecord = null,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpPut("UpsertInventoryTypes")]
        public async Task<ActionResult<int>> UpsertInventoryTypes(InventoryTypeDto invType)
        {

            var cmdMdl = _map.Map<InventoryTypeDto, InventoryType>(invType);

            var result = await _repo.UpsertInventoryTypes(cmdMdl);

            if(result.result == Data.ApiResponse.result.error)
                return BadRequest(result.message);

            return Ok(new GenericResponse<InventoryType>()
            {
                singleRecord = null,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpPut("UpsertInventoryUnits")]
        public async Task<ActionResult<int>> UpsertInventoryUnits(InventoryUnitDto data)
        {
            var cmdMdl = _map.Map<InventoryUnitDto, InventoryUnit>(data);

            var result = await _repo.UpsertInventoryUnits(cmdMdl);

            if (result.result == Data.ApiResponse.result.error)
                return BadRequest(result.message);

            return Ok(new GenericResponse<InventoryUnit>()
            {
                singleRecord = null,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }
    }
}
