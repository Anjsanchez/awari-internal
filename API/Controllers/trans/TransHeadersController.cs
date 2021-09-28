using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.rooms;
using API.Contracts.pages.trans;
using API.Data.ApiResponse;
using API.Dto.trans.header;
using API.Dto.trans.line;
using API.Dto.trans.payment;
using API.Dto.trans.room;
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
        private readonly ITransHeaderRepository _repo;
        private readonly ITransLineRepository _transRepo;
        private readonly ITransRoomRepository _roomRepo;
        private readonly ITransPaymentRepository _paymentRepo;


        public TransHeadersController(
                                        IMapper mapp,
                                        IOptionsMonitor<jwtConfig> optionsMonitor,
                                        ITransHeaderRepository repo,
                                        ITransPaymentRepository paymentRepo,
                                        ITransLineRepository transRepo,
                                        ITransRoomRepository roomRepo)
        {
            _map = mapp;
            _repo = repo;
            _jwtConfig = optionsMonitor.CurrentValue;
            _transRepo = transRepo;
            _roomRepo = roomRepo;
            _paymentRepo = paymentRepo;
        }

        [HttpGet]
        public async Task<ActionResult> GetTransHeaders(bool isGetToday = false)
        {
            var transHeaders = await _repo.FindAll();

            if (isGetToday)
                transHeaders = transHeaders.Where(n => n.checkOutDate.Date == DateTime.Now.Date).ToList();

            var mappedTransHeaders = _map.Map<List<TransHeader>, List<transHeaderReadDto>>(transHeaders.ToList());

            return Ok(new GenericResponse<transHeaderReadDto>()
            {
                listRecords = mappedTransHeaders,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("includesFullDetails")]
        public async Task<ActionResult> GetHeadersWithFullDetails(Guid headerId)
        {
            var tHeader = await _repo.FindById(headerId);
            var tRoom = await _roomRepo.GetLineByHeaderId(headerId);
            var tPayment = await _paymentRepo.GetPaymentByHeaderId(headerId);
            var tTrans = await _transRepo.GetTransByHeaderId(headerId);

            var mappedDto = _map.Map<TransHeader, transHeaderReadDto>(tHeader);
            var mappedRoom = _map.Map<List<TransRoom>, List<transRoomReadDto>>(tRoom.ToList());
            var mappedPayments = _map.Map<List<TransPayment>, List<transPaymentReadDto>>(tPayment.ToList());
            var mappedTrans = _map.Map<List<TransLine>, List<transReadDto>>(tTrans.ToList());

            return Ok(new TransHeaderResponse()
            {
                header = mappedDto,
                rooms = mappedRoom,
                payments = mappedPayments,
                trans = mappedTrans,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                isTrans = true
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