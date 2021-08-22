using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.functionality;
using API.Contracts.pages.reservation;
using API.Data.ApiResponse;
using API.Dto.reservations.header;
using API.Dto.reservations.line;
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

    public class ReservationRoomLinesController : ControllerBase
    {

        private readonly IReservationRoomLineRepository _repo;
        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;

        public ReservationRoomLinesController(IReservationRoomLineRepository repo, IMapper mapp, IOptionsMonitor<jwtConfig> optionsMonitor)
        {
            _repo = repo;
            _map = mapp;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpGet]
        public async Task<ActionResult> GetReservationRoomLines()
        {
            var reservationRoomLines = await _repo.FindAll();

            var mappedReservationRoomLines = _map.Map<List<ReservationRoomLine>, List<reservationRoomLineReadDto>>(reservationRoomLines.ToList());

            return Ok(new GenericResponse<reservationRoomLineReadDto>()
            {
                listRecords = mappedReservationRoomLines,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetReservationRoomLineById(Guid id)
        {
            var reservationRoomLine = await _repo.FindById(id);

            if (reservationRoomLine == null)
                return NotFound("ReservationRoomLine Not found");

            var mappedReservationRoomLine = _map.Map<ReservationRoomLine, reservationRoomLineReadDto>(reservationRoomLine);

            return Ok(new GenericResponse<reservationRoomLineReadDto>()
            {
                singleRecord = mappedReservationRoomLine,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("ByCustomerId")]
        public async Task<ActionResult> GetHeaderByCustomerId(Guid headerId)
        {
            var reservationRoomLines = await _repo.GetLineByHeaderId(headerId);

            var mappedReservationRoomLines = _map.Map<List<ReservationRoomLine>, List<reservationRoomLineReadDto>>(reservationRoomLines.ToList());

            return Ok(new GenericResponse<reservationRoomLineReadDto>()
            {
                listRecords = mappedReservationRoomLines,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateReservationRoomLine(Guid id, reservationRoomLineUpdateDto ReservationRoomLineUpdateDto)
        {
            var reservationRoomLine = await _repo.FindById(id);
            if (reservationRoomLine == null)
                return NotFound("ReservationRoomLine not found in the database");

            _map.Map(ReservationRoomLineUpdateDto, reservationRoomLine);
            await _repo.Update(reservationRoomLine);
            await _repo.Save();

            var withUser = await _repo.FindById(reservationRoomLine._id);
            var mappedCategory = _map.Map<ReservationRoomLine, reservationRoomLineReadDto>(withUser);

            return Ok(new GenericResponse<reservationRoomLineReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedCategory
            });
        }

        [HttpPost]
        public async Task<ActionResult> CreateReservationRoomLine(reservationRoomLineCreateDto ReservationRoomLineCreateDto)
        {

            if (!ModelState.IsValid)
                return BadRequest();

            var cmdMdl = _map.Map<reservationRoomLineCreateDto, ReservationRoomLine>(ReservationRoomLineCreateDto);
            cmdMdl.createdDate = DateTime.Now;

            await _repo.Create(cmdMdl);
            await _repo.Save();

            var withUser = await _repo.FindById(cmdMdl._id);
            var mappedData = _map.Map<ReservationRoomLine, reservationRoomLineReadDto>(withUser);

            return Ok(new GenericResponse<reservationRoomLineReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedData
            });
        }
    }
}