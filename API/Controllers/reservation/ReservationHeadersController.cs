using System.Threading.Tasks.Dataflow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.functionality;
using API.Contracts.pages.reservation;
using API.Contracts.pages.rooms;
using API.Data.ApiResponse;
using API.Dto.reservations.header;
using API.Dto.reservations.line;
using API.Dto.reservations.payment;
using API.Dto.reservations.trans;
using API.Dto.rooms.room;
using API.Dto.rooms.variant;
using API.helpers.api;
using API.Migrations.Configurations;
using API.Models;
using API.Models.functionality;
using API.Models.reservation;
using API.Models.rooms;
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

        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;
        private readonly IRoomRepository _roomsRepo;
        private readonly IReservationHeaderRepository _repo;
        private readonly IRoomVariantRepository _variantRepo;
        private readonly IReservationTransRepository _transRepo;
        private readonly IReservationRoomLineRepository _lineRepo;
        private readonly IReservationPaymentRepository _paymentRepo;

        public ReservationHeadersController(IRoomRepository roomsRepo, IReservationTransRepository transRepo, IReservationHeaderRepository repo, IRoomVariantRepository variantRepo, IReservationPaymentRepository paymentRepo, IReservationRoomLineRepository lineRepo, IMapper mapp, IOptionsMonitor<jwtConfig> optionsMonitor)
        {
            _map = mapp;
            _repo = repo;
            _lineRepo = lineRepo;
            _transRepo = transRepo;
            _roomsRepo = roomsRepo;
            _variantRepo = variantRepo;
            _paymentRepo = paymentRepo;
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
        public async Task<ActionResult> GetReservationHeaderById(Guid headerId)
        {
            var reservationHeader = await _repo.FindById(headerId);

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


        [HttpGet]
        [Route("includesRoom")]
        public async Task<ActionResult> getRoomVariantHeader(DateTime fromDate, DateTime toDate, Int32 pax)
        {
            toDate = toDate.AddHours(23);

            var variants = await _variantRepo.FindAll(true);
            var rooms = await _roomsRepo.GetRoomWithMinAndMax(pax);
            var lines = await _lineRepo.getLineByDates(fromDate, toDate);

            var mVariants = _map.Map<List<RoomVariant>, List<roomVariantReadDto>>(variants.ToList());
            var mRooms = _map.Map<List<Room>, List<roomReadDto>>(rooms.ToList());
            var mLines = _map.Map<List<ReservationRoomLine>, List<reservationRoomLineReadDto>>(lines.ToList());

            return Ok(new RoomReservationCreation()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                rooms = mRooms,
                lines = mLines,
                variants = mVariants
            });
        }

        [HttpGet("includesFullDetails")]
        public async Task<ActionResult> GetHeadersWithFullDetails(Guid headerId)
        {
            var reservationHeader = await _repo.FindById(headerId);
            var reservationLines = await _lineRepo.GetLineByHeaderId(headerId);
            var reservationPayment = await _paymentRepo.GetPaymentByHeaderId(headerId);
            var reservationTrans = await _transRepo.GetPaymentByHeaderId(headerId);

            var mappedDto = _map.Map<ReservationHeader, reservationHeaderReadDto>(reservationHeader);
            var mappedLines = _map.Map<List<ReservationRoomLine>, List<reservationRoomLineReadDto>>(reservationLines.ToList());
            var mappedPayments = _map.Map<List<ReservationPayment>, List<reservationPaymentReadDto>>(reservationPayment.ToList());
            var mappedTrans = _map.Map<List<ReservationTransLine>, List<reservationTransReadDto>>(reservationTrans.ToList());

            return Ok(new ReserverationHeaderResponse()
            {
                header = mappedDto,
                rooms = mappedLines,
                payments = mappedPayments,
                trans = mappedTrans,
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