using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.reservation;
using API.Contracts.pages.trans;
using API.Data.ApiResponse;
using API.Dto.reservations.trans;
using API.Dto.trans.line;
using API.helpers.api;
using API.Migrations.Configurations;
using API.Models.reservation;
using API.Models.trans;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace API.Controllers.reservation
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationTransController : ControllerBase
    {

        private readonly IReservationTransRepository _repo;
        private readonly ITransLineRepository _tRepo;
        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;

        public ReservationTransController(IReservationTransRepository repo, ITransLineRepository tRepo, IMapper mapp, IOptionsMonitor<jwtConfig> optionsMonitor)
        {
            _tRepo = tRepo;
            _repo = repo;
            _map = mapp;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpGet]
        public async Task<ActionResult> GetReservationTrans()
        {
            var reservationTrans = await _repo.FindAll();

            var mappedData = _map.Map<List<ReservationTransLine>, List<reservationTransReadDto>>(reservationTrans.ToList());

            return Ok(new GenericResponse<reservationTransReadDto>()
            {
                listRecords = mappedData,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("includesTransLines")]
        public async Task<ActionResult> IncludesTransLines()
        {
            var hTrans = await _repo.FindAll();
            var hTransDto = _map.Map<List<ReservationTransLine>, List<reservationTransReadDto>>(hTrans.ToList());

            var tTrans = await _tRepo.FindAll();
            var tTransDto = _map.Map<List<TransLine>, List<transReadDto>>(tTrans.ToList());

            return Ok(new HTransLineWithTrans()
            {
                rLines = tTransDto,
                hLines = hTransDto
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> getDataById(Guid id)
        {
            var data = await _repo.FindById(id);

            if (data == null)
                return NotFound("Reservation Trans Not found");

            var mappedReservationRoomLine = _map.Map<ReservationTransLine, reservationTransReadDto>(data);

            return Ok(new GenericResponse<reservationTransReadDto>()
            {
                singleRecord = mappedReservationRoomLine,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateData(Guid id, reservationTransUpdateDto updateDto)
        {
            var dataById = await _repo.FindById(id);
            if (dataById == null)
                return NotFound("Record not found in the database");

            _map.Map(updateDto, dataById);
            await _repo.Update(dataById);
            await _repo.Save();

            var withUser = await _repo.FindById(dataById._id);
            var mappedData = _map.Map<ReservationTransLine, reservationTransReadDto>(withUser);

            return Ok(new GenericResponse<reservationTransReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedData
            });
        }

        [HttpPost]
        public async Task<ActionResult> createRecord(List<reservationTransCreateDto> createDto)
        {

            if (!ModelState.IsValid)
                return BadRequest();

            var transLine = new List<reservationTransCreateDto>();

            foreach (var trans in createDto)
            {
                var x = new reservationTransCreateDto()
                {
                    createdDate = DateTime.Now,
                    discountId = trans.discountId,
                    netDiscount = trans.netDiscount,
                    productId = trans.productId,
                    quantity = trans.quantity,
                    remark = trans.remark,
                    reservationHeaderId = trans.reservationHeaderId,
                    reservationRoomLineId = trans.reservationRoomLineId,
                    seniorPax = trans.seniorPax,
                    userId = trans.userId,
                    isPrinted = trans.isPrinted
                };

                transLine.Add(x);
            }

            var createMdl = _map.Map<List<reservationTransCreateDto>, List<ReservationTransLine>>(transLine);

            await _repo.createRange(createMdl);
            await _repo.Save();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> deleteDate(Guid id)
        {
            var dataById = await _repo.FindById(id);
            if (dataById == null)
                return NotFound("Record not found in the database");

            await _repo.Delete(dataById);
            await _repo.Save();

            var mappedData = _map.Map<ReservationTransLine, reservationTransReadDto>(dataById);

            return Ok(new GenericResponse<reservationTransReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedData
            });
        }



    }
}