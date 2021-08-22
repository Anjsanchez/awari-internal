using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.rooms;
using API.Data.ApiResponse;
using API.Dto.rooms.pricing;
using API.helpers.api;
using API.Migrations.Configurations;
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

    public class RoomPricingsController : ControllerBase
    {
        private readonly IRoomPricingRepository _repo;
        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;

        public RoomPricingsController(IRoomPricingRepository repo, IMapper mapp, IOptionsMonitor<jwtConfig> optionsMonitor)
        {
            _repo = repo;
            _map = mapp;
            _jwtConfig = optionsMonitor.CurrentValue;
        }


        [HttpGet]
        public async Task<ActionResult> GetRoomPricing()
        {
            var roomPricing = await _repo.FindAll();
            var mappedPricing = _map.Map<List<RoomPricing>, List<roomPricingReadDto>>(roomPricing.ToList());

            return Ok(new GenericResponse<roomPricingReadDto>()
            {
                listRecords = mappedPricing,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetRoomPricingById(Guid id)
        {
            var roomPricing = await _repo.FindById(id);

            if (roomPricing == null)
                return NotFound("Room Pricing Not found");

            var mappedRoom = _map.Map<RoomPricing, roomPricingReadDto>(roomPricing);

            return Ok(new GenericResponse<roomPricingReadDto>()
            {
                singleRecord = mappedRoom,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }


        [HttpGet("byRoomId")]
        public async Task<ActionResult> GetRoomPricingByRoomId(Guid roomId)
        {
            var roomPricing = await _repo.getPricingByRoomId(roomId);

            if (roomPricing == null || roomPricing.Count == 0)
                return NotFound("No pricing found for this room.");

            var mappedPricing = _map.Map<List<RoomPricing>, List<roomPricingReadDto>>(roomPricing);

            return Ok(new GenericResponse<roomPricingReadDto>()
            {
                listRecords = mappedPricing,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }


        [HttpGet("byRoomVariant")]
        public async Task<ActionResult> GetRoomPricingByRoomVariant(Guid variantId)
        {
            var roomPricing = await _repo.getPricingByRoomVariantId(variantId);

            if (roomPricing == null || roomPricing.Count == 0)
                return NotFound("No pricing found for this room variant.");

            var mappedPricing = _map.Map<List<RoomPricing>, List<roomPricingReadDto>>(roomPricing);

            return Ok(new GenericResponse<roomPricingReadDto>()
            {
                listRecords = mappedPricing,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePricing(Guid id, roomPricingUpdateDto pricingUpdateDto)
        {
            var room = await _repo.FindById(id);
            if (room == null)
                return NotFound("Pricing not found in the database");

            _map.Map(pricingUpdateDto, room);
            await _repo.Update(room);
            await _repo.Save();

            var withUser = await _repo.FindById(room._id);
            var mappedPricing = _map.Map<RoomPricing, roomPricingReadDto>(withUser);

            return Ok(new GenericResponse<roomPricingReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedPricing
            });
        }

        [HttpPost]
        public async Task<ActionResult> CreateRoom(roomPricingCreateDto roomPricingCreateDto)
        {

            if (!ModelState.IsValid)
                return BadRequest();

            var room = await _repo.getPricingByRoomId(roomPricingCreateDto.roomId);

            foreach (var item in room)
                if (item.capacity == roomPricingCreateDto.capacity)
                    return BadRequest("Room with capacity is already existing in the database.");

            if (room == null)
                return BadRequest("Room not found in the database.");

            var cmdMdl = _map.Map<roomPricingCreateDto, RoomPricing>(roomPricingCreateDto);
            cmdMdl.createdDate = DateTime.Now;

            await _repo.Create(cmdMdl);
            await _repo.Save();


            var withUser = await _repo.FindById(cmdMdl._id);
            var mappedVariants = _map.Map<RoomPricing, roomPricingReadDto>(withUser);

            return Ok(new GenericResponse<roomPricingReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedVariants
            });
        }



    }
}