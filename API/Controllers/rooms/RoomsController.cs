using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using API.Contracts.pages;
using API.Contracts.pages.rooms;
using API.Data.ApiResponse;
using API.Dto.customers;
using API.Dto.rooms.pricing;
using API.Dto.rooms.room;
using API.helpers.api;
using API.Migrations.Configurations;
using API.Models;
using API.Models.rooms;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public class RoomsController : ControllerBase
    {
        private readonly IRoomRepository _repo;
        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;

        public RoomsController(IRoomRepository repo, IMapper mapp, IOptionsMonitor<jwtConfig> optionsMonitor)
        {
            _repo = repo;
            _map = mapp;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpGet]
        public async Task<ActionResult> GetRooms()
        {
            var rooms = await _repo.FindAll();
            var mappedRooms = _map.Map<List<Room>, List<roomReadDto>>(rooms.ToList());

            return Ok(new GenericResponse<roomReadDto>()
            {
                listRecords = mappedRooms,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetRoomById(Guid id)
        {
            var room = await _repo.FindById(id);
            if (room == null)
                return NotFound("Room Not found");

            var mappedRoom = _map.Map<Room, roomReadDto>(room);

            return Ok(new GenericResponse<roomReadDto>()
            {
                singleRecord = mappedRoom,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [Route("byPricingAvailable")]
        [HttpGet]
        public async Task<ActionResult> GetRoomWithPricing()
        {
            var rooms = await _repo.GetRoomWithPricing();
            var mappedRooms = _map.Map<List<Room>, List<roomReadDto>>(rooms.ToList());

            return Ok(new GenericResponse<roomReadDto>()
            {
                listRecords = mappedRooms,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateRoom(Guid id, roomUpdateDto roomUpdateDto)
        {
            var room = await _repo.FindById(id);
            if (room == null)
                return NotFound("Room not found in the database");

            _map.Map(roomUpdateDto, room);
            await _repo.Update(room);
            await _repo.Save();

            var withUser = await _repo.FindById(room._id);
            var mappedVariants = _map.Map<Room, roomReadDto>(withUser);

            return Ok(new GenericResponse<roomReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedVariants
            });
        }

        [HttpPost]
        public async Task<ActionResult> createRoom(roomCreateDto roomCreateDto)
        {

            if (!ModelState.IsValid)
                return BadRequest();

            var room = await _repo.GetRoomByName(roomCreateDto.roomLongName);

            if (room != null)
                return BadRequest("Room is already existing in the database.");

            var cmdMdl = _map.Map<roomCreateDto, Room>(roomCreateDto);
            cmdMdl.createdDate = DateTime.Now;

            await _repo.Create(cmdMdl);
            await _repo.Save();


            var withUser = await _repo.FindById(cmdMdl._id);
            var mappedVariants = _map.Map<Room, roomReadDto>(withUser);

            return Ok(new GenericResponse<roomReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedVariants
            });
        }

    }
}