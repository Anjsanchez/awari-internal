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

namespace API.Controllers.approvals
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public class ApprovalRoomsController : ControllerBase
    {
        private readonly IApprovalRoomRepository _aprRoomRepo;
        private readonly IReservationRoomLineRepository _rRoomRepo;
        private readonly IReservationApprovalRepository _reApprRepo;

        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;

        public ApprovalRoomsController(IReservationApprovalRepository reApprRepo,
        IReservationRoomLineRepository rTranRepo,
        IApprovalRoomRepository aprTranRepo,
        IMapper mapp,
        IOptionsMonitor<jwtConfig> optionsMonitor)
        {
            _rRoomRepo = rTranRepo;
            _reApprRepo = reApprRepo;
            _aprRoomRepo = aprTranRepo;
            _map = mapp;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetRoomForApprovalById(Guid id)
        {
            var approvals = await _aprRoomRepo.FindById(id);

            if (approvals == null)
                return NotFound("Approval Not found");

            var mappedTran = _map.Map<ApprovalRoom, ApprovalRoomReadDto>(approvals);

            return Ok(new GenericResponse<ApprovalRoomReadDto>()
            {
                singleRecord = mappedTran,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });

        }


        private async Task<bool> ModifyTranRecord(Guid tmpTblId, Guid transId, Status status, EAction action)
        {
            var aprData = await _aprRoomRepo.FindById(tmpTblId);
            if (aprData == null)
                return false;

            var rData = await _rRoomRepo.FindById(transId);
            if (rData == null)
                return false;

            if (status == Status.Rejected)
            {
                rData.approvalStatus = Status.Rejected;
                await _rRoomRepo.Update(rData);
                return true;
            }

            if (action == EAction.Delete)
            {
                rData.approvalStatus = Status.Approved;
                await _rRoomRepo.Delete(rData);
                return true;
            }

            rData.discountId = aprData.discountId;
            rData.startDate = aprData.startDate;
            rData.endDate = aprData.endDate;
            rData.roomId = aprData.roomId;
            rData.grossAmount = aprData.grossAmount;
            rData.totalDiscount = aprData.totalDiscount;
            rData.totalAmount = aprData.totalAmount;
            rData.adultPax = aprData.adultPax;
            rData.seniorPax = aprData.seniorPax;
            rData.childrenPax = aprData.childrenPax;
            rData.mattress = aprData.mattress;
            rData.remark = aprData.remark;

            rData.approvalStatus = Status.Approved;
            await _rRoomRepo.Update(rData);

            return true;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> updateRequestApprovalRooom(Guid id, reservationApprovalUpdateDto updateDto)
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

            await _reApprRepo.Update(data);

            if (!await ModifyTranRecord(data.tmpTblId, data.transId, data.status, data.action))
                return NotFound("Internal Error has occured. Contact Administrator");

            return Ok(data);
        }



    }
}