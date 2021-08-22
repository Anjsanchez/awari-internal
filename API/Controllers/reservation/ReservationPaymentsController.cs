using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.functionality;
using API.Contracts.pages.reservation;
using API.Data.ApiResponse;
using API.Dto.reservations.payment;
using API.helpers.api;
using API.Migrations.Configurations;
using API.Models.functionality;
using API.Models.reservation;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
namespace API.Controllers.reservation
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public class ReservationPaymentsController : ControllerBase
    {

        private readonly IReservationPaymentRepository _repo;
        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;

        public ReservationPaymentsController(IReservationPaymentRepository repo, IMapper mapp, IOptionsMonitor<jwtConfig> optionsMonitor)
        {
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