using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.approval;
using API.Contracts.pages.reservation;
using API.Data.ApiResponse;
using API.Dto.approval;
using API.helpers.api;
using API.Migrations.Configurations;
using API.Models.approval;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using static API.Models.Enum.EnumModels;

namespace API.Controllers.approvals
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public class RequestApprovalsController : ControllerBase
    {

        private readonly IReservationApprovalRepository _repo;
        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;

        public RequestApprovalsController(IReservationApprovalRepository repo, IMapper mapp, IOptionsMonitor<jwtConfig> optionsMonitor)
        {
            _repo = repo;
            _map = mapp;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpGet]
        public async Task<ActionResult> GetReservationApprovals()
        {
            var approvals = await _repo.FindAll();

            var mappedDiscounts = _map.Map<List<ReservationApproval>, List<ReservationApprovalReadDto>>(approvals.ToList());

            return Ok(new GenericResponse<ReservationApprovalReadDto>()
            {
                listRecords = mappedDiscounts,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetReservationApprovalById(Guid id)
        {
            var approvals = await _repo.FindById(id);

            if (approvals == null)
                return NotFound("Approval Not found");

            var mappedPayment = _map.Map<ReservationApproval, ReservationApprovalReadDto>(approvals);

            return Ok(new GenericResponse<ReservationApprovalReadDto>()
            {
                singleRecord = mappedPayment,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }


    }
}