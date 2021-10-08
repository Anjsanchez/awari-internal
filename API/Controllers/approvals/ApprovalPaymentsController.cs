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
using API.Dto.approval.payment;
using API.Contracts.pages.reservation;
using static API.Models.Enum.EnumModels;

namespace API.Controllers.approvals
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public class ApprovalPaymentsController : ControllerBase
    {
        private readonly IApprovalPaymentRepository _aprPaymentRepo;
        private readonly IReservationPaymentRepository _rPaymentRepo;
        private readonly IReservationApprovalRepository _reApprRepo;

        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;

        public ApprovalPaymentsController(IReservationApprovalRepository reApprRepo, IReservationPaymentRepository rPaymentRepo, IApprovalPaymentRepository aprPaymentRepo, IMapper mapp, IOptionsMonitor<jwtConfig> optionsMonitor)
        {
            _rPaymentRepo = rPaymentRepo;
            _reApprRepo = reApprRepo;
            _aprPaymentRepo = aprPaymentRepo;
            _map = mapp;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetPaymentForApprovalById(Guid id)
        {
            var approvals = await _aprPaymentRepo.FindById(id);

            if (approvals == null)
                return NotFound("Approval Not found");

            var mappedPayment = _map.Map<ApprovalPayment, ApprovalPaymentReadDto>(approvals);

            return Ok(new GenericResponse<ApprovalPaymentReadDto>()
            {
                singleRecord = mappedPayment,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });

        }


        private async Task<bool> ModifyPaymentRecord(Guid tmpTblId, Guid transId, Status status, EAction action)
        {
            var aprData = await _aprPaymentRepo.FindById(tmpTblId);
            if (aprData == null)
                return false;

            var rData = await _rPaymentRepo.FindById(transId);
            if (rData == null)
                return false;


            if (status == Status.Rejected)
            {
                rData.approvalStatus = Status.Rejected;
                await _rPaymentRepo.Update(rData);
                return true;
            }


            if (action == EAction.Delete)
            {
                rData.approvalStatus = Status.Approved;
                await _rPaymentRepo.Delete(rData);
                return true;
            }


            rData.type = aprData.type;
            rData.amount = aprData.amount;
            rData.paymentId = aprData.paymentId;
            rData.paymentRefNum = aprData.paymentRefNum;
            rData.approvalStatus = Status.Approved;
            await _rPaymentRepo.Update(rData);

            return true;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> updateRequestApprovalPayment(Guid id, reservationApprovalUpdateDto updateDto)
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

            if (!await ModifyPaymentRecord(data.tmpTblId, data.transId, data.status, data.action))
                return NotFound("Internal Error has occured. Contact Administrator");

            return Ok(data);
        }



    }
}