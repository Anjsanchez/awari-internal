using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.approval;
using API.Data.ApiResponse;
using API.Dto.approval;
using API.helpers.api;
using API.Migrations.Configurations;
using API.Models.approval;
using AutoMapper;
using Microsoft.Extensions.Options;
using API.Contracts.pages.reservation;
using static API.Models.Enum.EnumModels;
using API.Dto.approval.trams;
using API.Dto.approval.payment;

namespace API.Controllers.approvals
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public class ApprovalHeadersController : ControllerBase
    {
        private readonly IApprovalHeaderRepository _aprHeaderRepo;

        private readonly IReservationHeaderRepository _rHeaderRepo;
        private readonly IReservationPaymentRepository _rPaymentRepo;
        private readonly IReservationTransRepository _rTransRepo;
        private readonly IReservationRoomLineRepository _rRoomsRepo;

        private readonly IReservationApprovalRepository _reApprRepo;

        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;

        public ApprovalHeadersController(
        IReservationApprovalRepository reApprRepo,
        IReservationHeaderRepository rTranRepo,
        IApprovalHeaderRepository aprTranRepo,
        IReservationTransRepository rTransRepo,
        IReservationPaymentRepository rPaymentRepo,
        IReservationRoomLineRepository rRoomsRepo,
        IMapper mapp,
        IOptionsMonitor<jwtConfig> optionsMonitor)
        {
            _rPaymentRepo = rPaymentRepo;
            _rTransRepo = rTransRepo;
            _rRoomsRepo = rRoomsRepo;
            _rHeaderRepo = rTranRepo;


            _reApprRepo = reApprRepo;
            _aprHeaderRepo = aprTranRepo;
            _map = mapp;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetHeaderForApprovalById(Guid id)
        {
            var approvals = await _aprHeaderRepo.FindById(id);

            if (approvals == null)
                return NotFound("Approval Not found");

            var mappedTran = _map.Map<ApprovalHeader, ApprovalHeaderReadDto>(approvals);

            return Ok(new GenericResponse<ApprovalHeaderReadDto>()
            {
                singleRecord = mappedTran,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        private async Task<bool> ModifyTranRecord(Guid tmpTblId, Guid transId, Status status)
        {
            var aprData = await _aprHeaderRepo.FindById(tmpTblId);
            if (aprData == null)
                return false;

            var rData = await _rHeaderRepo.FindById(transId);
            if (rData == null)
                return false;


            if (status == Status.Rejected)
            {
                rData.approvalStatus = Status.Rejected;
                await _rHeaderRepo.Update(rData);
                return true;
            }

            rData.approvalStatus = Status.Approved;
            await _rHeaderRepo.Delete(rData);
            return true;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> updateRequestApprovalHeader(Guid id, reservationApprovalUpdateDto updateDto)
        {
            var data = await _reApprRepo.FindById(id);
            if (data == null)
                return NotFound("Data not found in the database");

            if (updateDto.action == "approved")
                data.status = Models.Enum.EnumModels.Status.Approved;
            else
                data.status = Models.Enum.EnumModels.Status.Rejected;

            data.approvedById = updateDto.userId;
            data.approvedDate = DateTime.Now;

            await _rPaymentRepo.deleteRange(await _rPaymentRepo.GetPaymentByHeaderId(id));
            await _rTransRepo.deleteRange(await _rTransRepo.GetTransLineByHeaderId(id));
            await _rRoomsRepo.deleteRange(await _rRoomsRepo.GetLineByHeaderId(id));
            await _reApprRepo.Update(data);

            if (!await ModifyTranRecord(data.tmpTblId, data.transId, data.status))
                return NotFound("Internal Error has occured. Contact Administrator");

            return Ok(data);
        }



    }
}