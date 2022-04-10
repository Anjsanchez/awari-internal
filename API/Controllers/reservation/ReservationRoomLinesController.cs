using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.functionality;
using API.Contracts.pages.reservation;
using API.Data.ApiResponse;
using API.Dto.reservations.header;
using API.Dto.reservations.room;
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
using API.Dto.reservations;
using static API.Models.Enum.EnumModels;
using API.Dto.approval;
using API.Models.approval;
using API.Contracts.pages.approval;

namespace API.Controllers.reservation
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public class ReservationRoomLinesController : ControllerBase
    {
        private readonly IReservationApprovalRepository _aprRepo;
        private readonly IApprovalRoomRepository _tmpRepo;
        private readonly IReservationRoomLineRepository _repo;
        private readonly IReservationTransRepository _transRepo;
        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;

        public ReservationRoomLinesController(IReservationTransRepository transRepo, IReservationApprovalRepository aprRepo, IApprovalRoomRepository tmpRepo, IReservationRoomLineRepository repo, IMapper mapp, IOptionsMonitor<jwtConfig> optionsMonitor)
        {
            _transRepo = transRepo;
            _aprRepo = aprRepo;
            _tmpRepo = tmpRepo;
            _repo = repo;
            _map = mapp;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpGet]
        public async Task<ActionResult> GetReservationRoomLines(bool isActiveOnly = false)
        {
            var reservationRoomLines = await _repo.FindAll();
            if (isActiveOnly)
                reservationRoomLines = await _repo.GetLinesActiveHeader();

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

        [HttpGet("ByHeaderId")]
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

        [HttpPut("UpdateAdditionalRates/{id}")]
        public async Task<ActionResult> UpdateAdditionalRates(Guid id, reservationRoomLineAdditionalRoomDto lineDto)
        {
            var reservationRoomLine = await _repo.FindById(id);
            if (reservationRoomLine == null)
                return NotFound("ReservationRoomLine not found in the database");

            reservationRoomLine.lateCheckOutPenalty = lineDto.lateCheckOutPenalty;
            await _repo.Update(reservationRoomLine);
            await _repo.Save();

            return Ok();
        }

        [HttpPut("UpdateHeadsOnWalkIn/{id}")]
        public async Task<ActionResult> UpdateHeadsOnWalkIn(Guid id, reservationRoomLineWalkInUpdateDto lineDto)
        {
            var reservationRoomLine = await _repo.FindById(id);
            if (reservationRoomLine == null)
                return NotFound("ReservationRoomLine not found in the database");

            reservationRoomLine.adultPax = lineDto.adultPax;
            reservationRoomLine.childrenPax = lineDto.childrenPax;
            reservationRoomLine.seniorPax = lineDto.seniorPax;


            float grossAmount = 0;
            float childAmount = 0f;
            float discSeniorAmt = 0f;
            float netAmount = 0f;


            childAmount = 880 * lineDto.childrenPax;
            grossAmount = 1760 * (lineDto.adultPax + lineDto.seniorPax) + childAmount;

            //Calculate discount.
            //Una ang 12%, then 20%

            float discAmount12 = (1760 * lineDto.seniorPax) * (float)0.12;
            float discAmount20 = ((1760 * lineDto.seniorPax) - discAmount12) * (float)0.20;

            discSeniorAmt = discAmount20 + discAmount12;

            netAmount = grossAmount - discSeniorAmt;

            reservationRoomLine.grossAmount = grossAmount;
            reservationRoomLine.totalAmount = grossAmount - discSeniorAmt;
            reservationRoomLine.totalDiscount = discSeniorAmt;

            if (reservationRoomLine.reservationHeader.reservationType.name == "Restaurant")
            {
                reservationRoomLine.grossAmount = 0;
                reservationRoomLine.totalAmount = 0;
                reservationRoomLine.totalDiscount = 0;
            }

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

        [HttpPut("CreateRoomsApproval/{id}")]
        public async Task<ActionResult> CreateRoomsApproval(Guid id, RequestApprovalRoomCreateDto createDto)
        {

            var reservationRoom = await _repo.FindById(id);
            if (reservationRoom == null)
                return NotFound("ReservationPayment not found in the database");

            if (await IsRoomLineAlreadyHaveTransaction(id))
            {
                var action = globalFunctionalityHelper.GetApprovalAction(createDto.action);
                if (action == EAction.Delete)
                    return NotFound("This reservation already have a transaction.");
            }
            reservationRoom.approvalStatus = Status.Pending;
            await _repo.Update(reservationRoom);


            var apr = new ReservationApprovalCreateDto()
            {
                transId = createDto.transId,
                action = globalFunctionalityHelper.GetApprovalAction(createDto.action),
                approvalType = globalFunctionalityHelper.GetApprovalType(createDto.approvalType),
                requestedById = createDto.requestedById,
                remark = createDto.remark
            };

            var tmpMdl = new ApprovalRoom();

            tmpMdl.reservationTypeId = reservationRoom.reservationHeader.reservationTypeId;
            tmpMdl.startDate = createDto.approvalRoom.startDate;
            tmpMdl.endDate = createDto.approvalRoom.endDate;
            tmpMdl.discountId = createDto.approvalRoom.discountId;
            tmpMdl.roomId = createDto.approvalRoom.roomId;
            tmpMdl.grossAmount = createDto.approvalRoom.grossAmount;
            tmpMdl.totalDiscount = createDto.approvalRoom.totalDiscount;
            tmpMdl.totalAmount = createDto.approvalRoom.totalAmount;
            tmpMdl.adultPax = createDto.approvalRoom.adultPax;
            tmpMdl.seniorPax = createDto.approvalRoom.seniorPax;
            tmpMdl.childrenPax = createDto.approvalRoom.childrenPax;
            tmpMdl.mattress = createDto.approvalRoom.mattress;
            tmpMdl.remark = createDto.approvalRoom.remark;
            tmpMdl.reservationHeaderId = reservationRoom.reservationHeaderId;
            tmpMdl.roomPricingId = createDto.approvalRoom.roomPricingId;

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

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteReservationLine(Guid id)
        {
            var reservationLine = await _repo.FindById(id);
            if (reservationLine == null)
                return NotFound("Reservation line not found in the database");

            if (await IsRoomLineAlreadyHaveTransaction(id)) return NotFound("This reservation already have a transaction.");

            await _repo.Delete(reservationLine);
            await _repo.Save();

            var mappedCategory = _map.Map<ReservationRoomLine, reservationRoomLineReadDto>(reservationLine);

            return Ok(new GenericResponse<reservationRoomLineReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedCategory
            });
        }

        private async Task<bool> IsRoomLineAlreadyHaveTransaction(Guid id)
        {
            var transLineOfRoomData = await _transRepo.GetTransLineByRoomLineId(id);

            if (transLineOfRoomData.Count != 0)
                return true;

            return false;
        }


    }
}