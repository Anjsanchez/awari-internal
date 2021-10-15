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
using API.Dto.reservations.room;
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
using API.Contracts.pages.trans;
using API.Dto.trans.line;
using API.Dto.trans.header;
using API.Models.trans;
using API.Dto.trans.payment;
using API.Dto.trans.room;

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

        private readonly ITransLineRepository _tLine;
        private readonly ITransRoomRepository _tRoom;
        private readonly ITransHeaderRepository _tHeader;
        private readonly ITransPaymentRepository _tPayment;
        Guid _headerId = new Guid();

        public ReservationHeadersController(ITransPaymentRepository tPayment, ITransHeaderRepository tHeader, ITransRoomRepository tRoom, ITransLineRepository tLine,
        IRoomRepository roomsRepo, IReservationTransRepository transRepo, IReservationHeaderRepository repo, IRoomVariantRepository variantRepo,
        IReservationPaymentRepository paymentRepo, IReservationRoomLineRepository lineRepo, IMapper mapp, IOptionsMonitor<jwtConfig> optionsMonitor)
        {
            _tPayment = tPayment;
            _tHeader = tHeader;
            _tLine = tLine;
            _tRoom = tRoom;
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
        public async Task<ActionResult> GetReservationHeaders(bool isActiveOnly = false)
        {
            var reservationHeaders = await _repo.FindAll();
            if (isActiveOnly)
                reservationHeaders = reservationHeaders.Where(n => n.isActive == true).ToList();

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

            var listBookings = await _repo.GetHeaderByCustomerID(reservationHeader.customerId);

            foreach (var item in listBookings)
                if (item.isActive)
                    return BadRequest("There is already an active reservation with this customer.");

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

            if (mappedData.reservationType.name.ToLower() == "day tour" ||
                mappedData.reservationType.name.ToLower() == "restaurant")
            {

                var isSuccess = await onRoomLineCreation(mappedData);
                if (!isSuccess)
                {
                    _headerId = mappedData._id;
                    await deleteReservationHeader();
                    return NotFound();
                }
            }

            return Ok(new GenericResponse<reservationHeaderReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedData
            });
        }

        //DAY TOUR & RESTO
        private async Task<bool> onRoomLineCreation(reservationHeaderReadDto header)
        {
            try
            {
                int seniorPax = 0;
                int adultPax = 1;
                int totalAmount = 1720;
                int grossAmount = 1720;

                var today = DateTime.Today;
                var age = today.Year - header.Customer.birthday.Year;

                if (age >= 60)
                {
                    totalAmount = 1376;
                    seniorPax = 1;
                    adultPax = 0;
                }

                if (header.reservationType.name == "Restaurant")
                {
                    totalAmount = 0;
                    grossAmount = 0;
                }

                var rm = new reservationRoomLineCreateDto()
                {
                    reservationHeaderId = header._id,
                    adultPax = adultPax,
                    seniorPax = seniorPax,
                    childrenPax = 0,
                    discountId = null,
                    endDate = DateTime.Now,
                    startDate = DateTime.Now,
                    grossAmount = grossAmount,
                    mattress = 0,
                    remark = header.reservationType.name,
                    roomId = null,
                    totalAmount = totalAmount,
                    totalDiscount = grossAmount - totalAmount,
                    userId = header.user.Id
                };

                var cmdMdl = _map.Map<reservationRoomLineCreateDto, ReservationRoomLine>(rm);
                cmdMdl.createdDate = DateTime.Now;

                await _lineRepo.Create(cmdMdl);
                await _lineRepo.Save();

                return true;
            }
            catch (System.Exception)
            {
                return false;
            }
        }

        [HttpGet("includesFullDetails")]
        public async Task<ActionResult> GetHeadersWithFullDetails(Guid headerId)
        {
            var reservationHeader = await _repo.FindById(headerId);
            var reservationLines = await _lineRepo.GetLineByHeaderId(headerId);
            var reservationPayment = await _paymentRepo.GetPaymentByHeaderId(headerId);
            var reservationTrans = await _transRepo.GetTransLineByHeaderId(headerId);

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
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                isTrans = false
            });
        }


        private async Task<bool> postTransHeader(ReservationHeader header)
        {
            try
            {
                var cmdMdl = _map.Map<ReservationHeader, transHeaderCreateDto>(header);
                var mappedMdl = _map.Map<transHeaderCreateDto, TransHeader>(cmdMdl);

                mappedMdl.checkOutDate = DateTime.Now;
                mappedMdl.userCheckOutId = mappedMdl.userId;//TODO:

                await _tHeader.Create(mappedMdl);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        private async Task<bool> postTransRooms(List<ReservationRoomLine> roomData)
        {
            try
            {
                if (roomData == null || roomData.Count == 0) return true;

                var transLine = new List<transRoomCreateDto>();

                foreach (var trans in roomData)
                {
                    var x = new transRoomCreateDto()
                    {
                        _id = trans._id,
                        adultPax = trans.adultPax,
                        childrenPax = trans.childrenPax,
                        discountId = trans.discountId,
                        endDate = trans.endDate,
                        grossAmount = trans.grossAmount,
                        mattress = trans.mattress,
                        remark = trans.remark,
                        roomId = trans.roomId,
                        seniorPax = trans.seniorPax,
                        startDate = trans.startDate,
                        totalAmount = trans.totalAmount,
                        totalDiscount = trans.totalDiscount,
                        transHeaderId = trans.reservationHeaderId,
                        userId = trans.userId,
                        createdDate = trans.createdDate
                    };

                    transLine.Add(x);
                }

                var createMdl = _map.Map<List<transRoomCreateDto>, List<TransRoom>>(transLine);

                await _tRoom.createRange(createMdl);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        private async Task<bool> postTransLines(List<ReservationTransLine> linesData)
        {
            try
            {
                if (linesData == null || linesData.Count == 0) return true;

                var transLine = new List<transCreateDto>();

                foreach (var trans in linesData)
                {
                    var x = new transCreateDto()
                    {
                        _id = trans._id,
                        discountId = trans.discountId,
                        netDiscount = trans.netDiscount,
                        productId = trans.productId,
                        quantity = trans.quantity,
                        remark = trans.remark,
                        seniorPax = trans.seniorPax,
                        transRoomId = trans.reservationRoomLineId,
                        transHeaderId = trans.reservationHeaderId,
                        userId = trans.userId,
                        createdDate = trans.createdDate,
                        grossAmount = (trans.quantity * trans.product.sellingPrice),
                        netAmount = (trans.quantity * trans.product.sellingPrice) - trans.netDiscount
                    };

                    transLine.Add(x);
                }

                var createMdl = _map.Map<List<transCreateDto>, List<TransLine>>(transLine);

                await _tLine.createRange(createMdl);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        private async Task<bool> rollbackTransPayment()
        {
            try
            {
                var data = await _tPayment.GetPaymentByHeaderId(_headerId);
                if (data == null || data.Count == 0) return false;


                await _tPayment.deleteRange(data);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        private async Task<bool> rollbackTransLine()
        {
            try
            {
                var data = await _tLine.GetTransByHeaderId(_headerId);
                if (data == null || data.Count == 0) return false;


                await _tLine.deleteRange(data);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        private async Task<bool> rollbackTransRoom()
        {
            try
            {
                var data = await _tRoom.GetLineByHeaderId(_headerId);
                if (data == null || data.Count == 0) return false;


                await _tRoom.deleteRange(data);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        private async Task<bool> rollbackTransHeader()
        {
            try
            {
                var data = await _tHeader.FindById(_headerId);
                if (data == null) return false;


                await _tHeader.Delete(data);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        private async Task<bool> executeRollBack()
        {
            await rollbackTransPayment();
            await rollbackTransLine();
            await rollbackTransRoom();
            await rollbackTransHeader();

            return true;
        }

        private async Task<bool> executeDeleteReservation()
        {
            await deleteReservationPayment();
            await deleteReservationLine();
            await deleteReservationRoom();
            await deleteReservationHeader();

            return true;
        }

        private async Task<bool> deleteReservationPayment()
        {
            try
            {
                var data = await _paymentRepo.GetPaymentByHeaderId(_headerId);
                if (data == null || data.Count == 0) return false;


                await _paymentRepo.deleteRange(data);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        private async Task<bool> deleteReservationLine()
        {
            try
            {
                var data = await _transRepo.GetTransLineByHeaderId(_headerId);
                if (data == null || data.Count == 0) return false;


                await _transRepo.deleteRange(data);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        private async Task<bool> deleteReservationRoom()
        {
            try
            {
                var data = await _lineRepo.GetLineByHeaderId(_headerId);
                if (data == null || data.Count == 0) return false;


                await _lineRepo.deleteRange(data);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        private async Task<bool> deleteReservationHeader()
        {
            try
            {
                var data = await _repo.FindById(_headerId);
                if (data == null) return false;

                await _repo.Delete(data);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }



        private async Task<bool> postTransPayment(List<ReservationPayment> paymentData)
        {
            try
            {
                if (paymentData == null || paymentData.Count == 0) return true;
                var transLine = new List<transPaymentCreateDto>();

                foreach (var trans in paymentData)
                {
                    var x = new transPaymentCreateDto()
                    {
                        _id = trans._id,
                        amount = trans.amount,
                        paymentId = trans.paymentId,
                        paymentRefNum = trans.paymentRefNum,
                        transHeaderId = trans.reservationHeaderId,
                        type = trans.type,
                        userId = trans.userId,
                        createdDate = trans.createdDate
                    };

                    transLine.Add(x);
                }

                var createMdl = _map.Map<List<transPaymentCreateDto>, List<TransPayment>>(transLine);

                await _tPayment.createRange(createMdl);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }


        [HttpGet("CheckOut")]
        public async Task<ActionResult> PostCheckOutReservation(Guid id)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var reservationHeader = await _repo.FindById(id);
            if (reservationHeader == null)
                return NotFound("ReservationHeader Not found");

            var transHeader = await _tHeader.FindById(id);
            if (transHeader != null)
            {
                _headerId = transHeader._id;
                await executeRollBack();
            }

            _headerId = reservationHeader._id;

            var paymentData = await _paymentRepo.GetPaymentByHeaderId(_headerId);
            var linesData = await _transRepo.GetTransLineByHeaderId(_headerId);
            var roomData = await _lineRepo.GetLineByHeaderId(_headerId);

            reservationHeader.totalNumberOfTrans = linesData.Count;
            reservationHeader.totalNumberOfRooms = globalFunctionalityHelper.getTotalNumberOfRooms(roomData, reservationHeader.reservationType.name);
            reservationHeader.totalNumberOfGuest = globalFunctionalityHelper.getTotalNumberOfGuests(roomData);
            reservationHeader.netAmount = globalFunctionalityHelper.getNetAmount(roomData, linesData);
            reservationHeader.grossAmount = globalFunctionalityHelper.getGrossAmount(roomData, linesData);
            reservationHeader.netDiscount = globalFunctionalityHelper.getNetDiscount(roomData, linesData);

            if (!await postTransHeader(reservationHeader))
            {
                await executeRollBack();
                return NotFound("PostTransHeader");
            }

            if (!await postTransPayment(paymentData))
            {
                await executeRollBack();
                return NotFound("PostTransPayment");
            }

            if (!await postTransRooms(roomData))
            {
                await executeRollBack();
                return NotFound("postTransRooms");
            }

            if (!await postTransLines(linesData))
            {
                await executeRollBack();
                return NotFound("postTransLines");
            }

            await executeDeleteReservation();
            return Ok();
        }

    }
}