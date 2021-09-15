using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.rooms;
using API.Contracts.pages.trans;
using API.Data.ApiResponse;
using API.Dto.trans.header;
using API.helpers.api;
using API.Migrations.Configurations;
using API.Models.trans;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace API.Controllers.trans
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public class TransHeadersController : ControllerBase
    {
        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;
        private readonly IRoomRepository _roomsRepo;
        private readonly ITransHeaderRepository _repo;
        private readonly IRoomVariantRepository _variantRepo;
        // private readonly ITransTransRepository _transRepo;
        // private readonly ITransRoomLineRepository _lineRepo;
        // private readonly ITransPaymentRepository _paymentRepo;


        public TransHeadersController(IRoomRepository roomsRepo,
        ITransHeaderRepository repo, IMapper mapp, IOptionsMonitor<jwtConfig> optionsMonitor, IRoomVariantRepository variantRepo

        // , IReservationPaymentRepository paymentRepo, 
        // IReservationRoomLineRepository lineRepo
        )
        {
            _map = mapp;
            _repo = repo;
            _roomsRepo = roomsRepo;
            _jwtConfig = optionsMonitor.CurrentValue;
            _variantRepo = variantRepo;
            // _transRepo = transRepo;
            // _lineRepo = lineRepo;
            // _paymentRepo = paymentRepo;
        }

        [HttpGet]
        public async Task<ActionResult> GetTransHeaders()
        {
            var transHeaders = await _repo.FindAll();

            var mappedTransHeaders = _map.Map<List<TransHeader>, List<transHeaderReadDto>>(transHeaders.ToList());

            return Ok(new GenericResponse<transHeaderReadDto>()
            {
                listRecords = mappedTransHeaders,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetTransHeaderById(Guid headerId)
        {
            var transHeader = await _repo.FindById(headerId);

            if (transHeader == null)
                return NotFound("TransHeader Not found");

            var mappedTransHeader = _map.Map<TransHeader, transHeaderReadDto>(transHeader);
            return Ok(new GenericResponse<transHeaderReadDto>()
            {
                singleRecord = mappedTransHeader,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("includesRoomCount")]
        public async Task<ActionResult> GetHeaderWithRoomCount()
        {
            var transHeaders = await _repo.GetHeaderWithRoomCount();

            return Ok(new GenericResponse<transHeaderReadDto>()
            {
                listRecords = transHeaders,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }


        // [HttpGet]
        // [Route("includesRoom")]
        // public async Task<ActionResult> getRoomVariantHeader(DateTime fromDate, DateTime toDate, Int32 pax)
        // {
        //     toDate = toDate.AddHours(23);

        //     var variants = await _variantRepo.FindAll(true);
        //     var rooms = await _roomsRepo.GetRoomWithMinAndMax(pax);
        //     var lines = await _lineRepo.getLineByDates(fromDate, toDate);

        //     var mVariants = _map.Map<List<RoomVariant>, List<roomVariantReadDto>>(variants.ToList());
        //     var mRooms = _map.Map<List<Room>, List<roomReadDto>>(rooms.ToList());
        //     var mLines = _map.Map<List<ReservationRoomLine>, List<reservationRoomLineReadDto>>(lines.ToList());

        //     return Ok(new RoomReservationCreation()
        //     {
        //         Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
        //         Success = true,
        //         rooms = mRooms,
        //         lines = mLines,
        //         variants = mVariants
        //     });
        // }

        // [HttpGet("includesFullDetails")]
        // public async Task<ActionResult> GetHeadersWithFullDetails(Guid headerId)
        // {
        //     var transHeader = await _repo.FindById(headerId);
        //     var reservationLines = await _lineRepo.GetLineByHeaderId(headerId);
        //     var reservationPayment = await _paymentRepo.GetPaymentByHeaderId(headerId);
        //     var reservationTrans = await _transRepo.GetPaymentByHeaderId(headerId);

        //     var mappedDto = _map.Map<TransHeader, transHeaderReadDto>(transHeader);
        //     var mappedLines = _map.Map<List<ReservationRoomLine>, List<reservationRoomLineReadDto>>(reservationLines.ToList());
        //     var mappedPayments = _map.Map<List<ReservationPayment>, List<reservationPaymentReadDto>>(reservationPayment.ToList());
        //     var mappedTrans = _map.Map<List<ReservationTransLine>, List<reservationTransReadDto>>(reservationTrans.ToList());

        //     return Ok(new ReserverationHeaderResponse()
        //     {
        //         header = mappedDto,
        //         rooms = mappedLines,
        //         payments = mappedPayments,
        //         trans = mappedTrans,
        //         Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
        //     });
        // }

        [HttpGet("ByCustomerId")]
        public async Task<ActionResult> GetHeaderByCustomerId(Guid headerId)
        {
            var transHeaders = await _repo.GetHeaderByCustomerID(headerId);

            var mappedTransHeaders = _map.Map<List<TransHeader>, List<transHeaderReadDto>>(transHeaders.ToList());

            return Ok(new GenericResponse<transHeaderReadDto>()
            {
                listRecords = mappedTransHeaders,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpPost]
        public async Task<ActionResult> CreateTransHeader(transHeaderCreateDto TransHeaderCreateDto)
        {

            if (!ModelState.IsValid)
                return BadRequest();

            var cmdMdl = _map.Map<transHeaderCreateDto, TransHeader>(TransHeaderCreateDto);
            cmdMdl.checkOutDate = DateTime.Now;

            await _repo.Create(cmdMdl);
            await _repo.Save();

            var withUser = await _repo.FindById(cmdMdl._id);
            var mappedData = _map.Map<TransHeader, transHeaderReadDto>(withUser);

            return Ok(new GenericResponse<transHeaderReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedData
            });
        }

    }
}