using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.approval;
using API.Contracts.pages.functionality;
using API.Contracts.pages.reservation;
using API.Data.ApiResponse;
using API.Dto.approval;
using API.Dto.reservations;
using API.Dto.reservations.payment;
using API.helpers.api;
using API.Migrations.Configurations;
using API.Models.approval;
using API.Models.functionality;
using API.Models.reservation;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using static API.Models.Enum.EnumModels;

namespace API.Controllers.reservation
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public class ReservationPaymentsController : ControllerBase
    {
        private readonly IReservationApprovalRepository _aprRepo;
        private readonly IApprovalPaymentRepository _tmpRepo;
        private readonly IReservationPaymentRepository _repo;
        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;

        public ReservationPaymentsController(IApprovalPaymentRepository tmpRepo, IReservationPaymentRepository repo, IReservationApprovalRepository aprRepo, IMapper mapp, IOptionsMonitor<jwtConfig> optionsMonitor)
        {
            _tmpRepo = tmpRepo;
            _aprRepo = aprRepo;
            _repo = repo;
            _map = mapp;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpGet]
        public async Task<ActionResult> GetReservationPayments()
        {
            var reservationPayments = await _repo.FindAll();

            var mappedReservationPayments = _map.Map<List<ReservationPayment>, List<reservationPaymentReadDto>>(reservationPayments.ToList());

            return Ok(new GenericResponse<reservationPaymentReadDto>()
            {
                listRecords = mappedReservationPayments,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetReservationPaymentById(Guid id)
        {
            var reservationPayment = await _repo.FindById(id);

            if (reservationPayment == null)
                return NotFound("ReservationPayment Not found");

            var mappedReservationPayment = _map.Map<ReservationPayment, reservationPaymentReadDto>(reservationPayment);

            return Ok(new GenericResponse<reservationPaymentReadDto>()
            {
                singleRecord = mappedReservationPayment,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("byHeaderId")]
        public async Task<ActionResult> GetPaymentByHeaderId(Guid headerId)
        {
            var reservationPayments = await _repo.GetPaymentByHeaderId(headerId);

            var mappedReservationPayments = _map.Map<List<ReservationPayment>, List<reservationPaymentReadDto>>(reservationPayments.ToList());

            return Ok(new GenericResponse<reservationPaymentReadDto>()
            {
                listRecords = mappedReservationPayments,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteReservationPayment(Guid id)
        {
            var reservationPayment = await _repo.FindById(id);
            if (reservationPayment == null)
                return NotFound("Reservation Payment not found in the database");

            await _repo.Delete(reservationPayment);
            await _repo.Save();

            var mappedCategory = _map.Map<ReservationPayment, reservationPaymentReadDto>(reservationPayment);

            return Ok(new GenericResponse<reservationPaymentReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedCategory
            });
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateReservationPayment(Guid id, reservationPaymentUpdateDto ReservationPaymentUpdateDto)
        {
            var reservationPayment = await _repo.FindById(id);
            if (reservationPayment == null)
                return NotFound("ReservationPayment not found in the database");

            _map.Map(ReservationPaymentUpdateDto, reservationPayment);
            await _repo.Update(reservationPayment);
            await _repo.Save();

            var withUser = await _repo.FindById(reservationPayment._id);
            var mappedCategory = _map.Map<ReservationPayment, reservationPaymentReadDto>(withUser);

            return Ok(new GenericResponse<reservationPaymentReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedCategory
            });
        }




        [HttpPut("CreatePaymentApproval/{id}")]
        public async Task<ActionResult> CreatePaymentApproval(Guid id, RequestApprovalPaymentCreateDto createDto)
        {

            var reservationPayment = await _repo.FindById(id);
            if (reservationPayment == null)
                return NotFound("ReservationPayment not found in the database");

            reservationPayment.approvalStatus = Status.Pending;
            await _repo.Update(reservationPayment);


            var apr = new ReservationApprovalCreateDto()
            {
                transId = createDto.transId,
                action = globalFunctionalityHelper.GetApprovalAction(createDto.action),
                approvalType = globalFunctionalityHelper.GetApprovalType(createDto.approvalType),
                requestedById = createDto.requestedById,
                remark = createDto.remark
            };

            var tmpMdl = _map.Map<ApprovalPaymentCreateDto, ApprovalPayment>(createDto.approvalPayment);

            tmpMdl._id = new Guid();
            tmpMdl.transId = createDto.transId;
            await _tmpRepo.Create(tmpMdl);

            var cmdMdl = _map.Map<ReservationApprovalCreateDto, ReservationApproval>(apr);
            cmdMdl.status = Status.Pending;
            cmdMdl.requestedDate = DateTime.Now;
            cmdMdl.tmpTblId = tmpMdl._id;

            await _aprRepo.Create(cmdMdl);

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> CreateReservationPayment(reservationPaymentCreateDto ReservationPaymentCreateDto)
        {

            if (!ModelState.IsValid)
                return BadRequest();

            var cmdMdl = _map.Map<reservationPaymentCreateDto, ReservationPayment>(ReservationPaymentCreateDto);
            cmdMdl.createdDate = DateTime.Now;

            await _repo.Create(cmdMdl);
            await _repo.Save();

            var withUser = await _repo.FindById(cmdMdl._id);
            var mappedData = _map.Map<ReservationPayment, reservationPaymentReadDto>(withUser);

            return Ok(new GenericResponse<reservationPaymentReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedData
            });
        }
    }
}