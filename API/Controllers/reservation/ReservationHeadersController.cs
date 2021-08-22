using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.functionality;
using API.Contracts.pages.reservation;
using API.Data.ApiResponse;
using API.Dto.reservations.header;
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

    public class ReservationHeadersController : ControllerBase
    {

        private readonly IReservationHeaderRepository _repo;
        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;

        public ReservationHeadersController(IReservationHeaderRepository repo, IMapper mapp, IOptionsMonitor<jwtConfig> optionsMonitor)
        {
            _repo = repo;
            _map = mapp;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpGet]
        public async Task<ActionResult> GetReservationHeaders()
        {
            var reservationHeaders = await _repo.FindAll();

            var mappedReservationHeaders = _map.Map<List<ReservationHeader>, List<reservationHeaderReadDto>>(reservationHeaders.ToList());

            return Ok(new GenericResponse<reservationHeaderReadDto>()
            {
                listRecords = mappedReservationHeaders,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetReservationHeaderById(Guid id)
        {
            var reservationHeader = await _repo.FindById(id);

            if (reservationHeader == null)
                return NotFound("ReservationHeader Not found");

            var mappedReservationHeader = _map.Map<ReservationHeader, reservationHeaderReadDto>(reservationHeader);

            return Ok(new GenericResponse<reservationHeaderReadDto>()
            {
                singleRecord = mappedReservationHeader,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("includesRoomCount")]
        public async Task<ActionResult> GetHeaderWithRoomCount()
        {
            var reservationHeaders = await _repo.GetHeaderWithRoomCount();

            return Ok(new GenericResponse<reservationHeaderReadDto>()
            {
                listRecords = reservationHeaders,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("ByCustomerId")]
        public async Task<ActionResult> GetHeaderByCustomerId(Guid headerId)
        {
            var reservationHeaders = await _repo.GetHeaderByCustomerID(headerId);

            var mappedReservationHeaders = _map.Map<List<ReservationHeader>, List<reservationHeaderReadDto>>(reservationHeaders.ToList());

            return Ok(new GenericResponse<reservationHeaderReadDto>()
            {
                listRecords = mappedReservationHeaders,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateReservationHeader(Guid id, reservationHeaderUpdateDto ReservationHeaderUpdateDto)
        {
            var reservationHeader = await _repo.FindById(id);
            if (reservationHeader == null)
                return NotFound("ReservationHeader not found in the database");

            _map.Map(ReservationHeaderUpdateDto, reservationHeader);
            await _repo.Update(reservationHeader);
            await _repo.Save();

            var withUser = await _repo.FindById(reservationHeader._id);
            var mappedCategory = _map.Map<ReservationHeader, reservationHeaderReadDto>(withUser);

            return Ok(new GenericResponse<reservationHeaderReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedCategory
            });
        }

        [HttpPost]
        public async Task<ActionResult> CreateReservationHeader(reservationHeaderCreateDto ReservationHeaderCreateDto)
        {

            if (!ModelState.IsValid)
                return BadRequest();

            var cmdMdl = _map.Map<reservationHeaderCreateDto, ReservationHeader>(ReservationHeaderCreateDto);
            cmdMdl.createdDate = DateTime.Now;

            await _repo.Create(cmdMdl);
            await _repo.Save();

            var withUser = await _repo.FindById(cmdMdl._id);
            var mappedData = _map.Map<ReservationHeader, reservationHeaderReadDto>(withUser);

            return Ok(new GenericResponse<reservationHeaderReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedData
            });
        }
    }
}