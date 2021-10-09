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

    public class ApprovalTransController : ControllerBase
    {
        private readonly IApprovalTransRepository _aprTranRepo;
        private readonly IReservationTransRepository _rTranRepo;
        private readonly IReservationApprovalRepository _reApprRepo;

        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;

        public ApprovalTransController(IReservationApprovalRepository reApprRepo,
        IReservationTransRepository rTranRepo,
        IApprovalTransRepository aprTranRepo,
        IMapper mapp,
        IOptionsMonitor<jwtConfig> optionsMonitor)
        {
            _rTranRepo = rTranRepo;
            _reApprRepo = reApprRepo;
            _aprTranRepo = aprTranRepo;
            _map = mapp;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetTranForApprovalById(Guid id)
        {
            var approvals = await _aprTranRepo.FindById(id);

            if (approvals == null)
                return NotFound("Approval Not found");

            var mappedTran = _map.Map<ApprovalTrans, ApprovalTransReadDto>(approvals);

            return Ok(new GenericResponse<ApprovalTransReadDto>()
            {
                singleRecord = mappedTran,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });

        }


        private async Task<bool> ModifyTranRecord(Guid tmpTblId, Guid transId, Status status)
        {
            var aprData = await _aprTranRepo.FindById(tmpTblId);
            if (aprData == null)
                return false;

            var rData = await _rTranRepo.FindById(transId);
            if (rData == null)
                return false;


            if (status == Status.Rejected)
            {
                rData.approvalStatus = Status.Rejected;
                await _rTranRepo.Update(rData);
                return true;
            }

            rData.approvalStatus = Status.Approved;
            await _rTranRepo.Delete(rData);
            return true;

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> updateRequestApprovalTran(Guid id, reservationApprovalUpdateDto updateDto)
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

            if (!await ModifyTranRecord(data.tmpTblId, data.transId, data.status))
                return NotFound("Internal Error has occured. Contact Administrator");

            return Ok(data);
        }



    }
}