using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.trans;
using API.Data.ApiResponse;
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
    public class TransRoomsController : ControllerBase
    {

        private readonly ITransRoomRepository _repo;
        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;

        public TransRoomsController(ITransRoomRepository repo, IMapper mapp, IOptionsMonitor<jwtConfig> optionsMonitor)
        {
            _repo = repo;
            _map = mapp;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpGet]
        public async Task<ActionResult> GetTransRooms()
        {
            var TransRooms = await _repo.FindAll();

            var mappedTransRooms = _map.Map<List<TransRoom>, List<transRoomReadDto>>(TransRooms.ToList());

            return Ok(new GenericResponse<transRoomReadDto>()
            {
                listRecords = mappedTransRooms,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetTransRoomById(Guid id)
        {
            var TransRoom = await _repo.FindById(id);

            if (TransRoom == null)
                return NotFound("TransRoom Not found");

            var mappedTransRoom = _map.Map<TransRoom, transRoomReadDto>(TransRoom);

            return Ok(new GenericResponse<transRoomReadDto>()
            {
                singleRecord = mappedTransRoom,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("ByHeaderId")]
        public async Task<ActionResult> GetHeaderByCustomerId(Guid headerId)
        {
            var TransRooms = await _repo.GetLineByHeaderId(headerId);
            var mappedTransRooms = _map.Map<List<TransRoom>, List<transRoomReadDto>>(TransRooms.ToList());

            return Ok(new GenericResponse<transRoomReadDto>()
            {
                listRecords = mappedTransRooms,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }


        [HttpPost]
        public async Task<ActionResult> CreateTransRoom(transRoomCreateDto TransRoomCreateDto)
        {

            if (!ModelState.IsValid)
                return BadRequest();

            var cmdMdl = _map.Map<transRoomCreateDto, TransRoom>(TransRoomCreateDto);
            cmdMdl.createdDate = DateTime.Now;

            await _repo.Create(cmdMdl);
            await _repo.Save();

            var withUser = await _repo.FindById(cmdMdl._id);
            var mappedData = _map.Map<TransRoom, transRoomReadDto>(withUser);

            return Ok(new GenericResponse<transRoomReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedData
            });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTransLine(Guid id)
        {
            var TransLine = await _repo.FindById(id);
            if (TransLine == null)
                return NotFound("Trans line not found in the database");

            await _repo.Delete(TransLine);
            await _repo.Save();

            var mappedCategory = _map.Map<TransRoom, transRoomReadDto>(TransLine);

            return Ok(new GenericResponse<transRoomReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedCategory
            });
        }


    }
}