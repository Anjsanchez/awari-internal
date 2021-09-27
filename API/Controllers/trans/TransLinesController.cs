using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.trans;
using API.Data.ApiResponse;
using API.Dto.trans.line;
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
    public class TransLinesController : ControllerBase
    {
        private readonly ITransLineRepository _repo;
        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;

        public TransLinesController(ITransLineRepository tRepo, IMapper mapp, IOptionsMonitor<jwtConfig> optionsMonitor)
        {
            _repo = tRepo;
            _map = mapp;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpGet]
        public async Task<ActionResult> GetReservationTrans()
        {
            var reservationTrans = await _repo.FindAll();

            var mappedData = _map.Map<List<TransLine>, List<transReadDto>>(reservationTrans.ToList());

            return Ok(new GenericResponse<transReadDto>()
            {
                listRecords = mappedData,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> getDataById(Guid id)
        {
            var data = await _repo.FindById(id);

            if (data == null)
                return NotFound("Reservation Trans Not found");

            var mappedReservationRoomLine = _map.Map<TransLine, transReadDto>(data);

            return Ok(new GenericResponse<transReadDto>()
            {
                singleRecord = mappedReservationRoomLine,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }


    }
}