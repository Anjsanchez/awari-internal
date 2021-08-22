using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using API.Contracts.pages.rooms;
using API.Data.ApiResponse;
using API.Dto.rooms.variant;
using API.helpers.api;
using API.Migrations.Configurations;
using API.Models;
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
    public class RoomVariantsController : ControllerBase
    {

        private readonly IRoomVariantRepository _repo;
        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;
        public RoomVariantsController(
            IMapper mapper, IOptionsMonitor<jwtConfig> optionsMonitor, IRoomVariantRepository repo)
        {
            _repo = repo;
            _map = mapper;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpGet]
        public async Task<ActionResult> getVariants()
        {
            var variants = await _repo.FindAll();
            var mappedVariants = _map.Map<List<RoomVariant>, List<roomVariantReadDto>>(variants.ToList());

            return Ok(new GenericResponse<roomVariantReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                listRecords = mappedVariants
            });
        }

        [HttpGet]
        [Route("active-variants")]
        public async Task<ActionResult> getActiveVariants()
        {
            var variants = await _repo.getActiveVariants();
            var mappedVariants = _map.Map<List<RoomVariant>, List<roomVariantReadDto>>(variants.ToList());

            return Ok(new GenericResponse<roomVariantReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                listRecords = mappedVariants
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> getVariantById(Guid id)
        {
            var variants = await _repo.FindById(id);
            if (variants == null)
                return NotFound("Room Variant not found");

            var mappedVariants = _map.Map<RoomVariant, roomVariantReadDto>(variants);

            return Ok(new GenericResponse<roomVariantReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedVariants
            });
        }

        [HttpPost]
        public async Task<ActionResult> createRoomVariant(roomVariantCreateDto variantCreateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var variant = await _repo.getVariantByName(variantCreateDto.name);

            if (variant != null)
                return BadRequest("Variant is already in use");

            var cmdMdl = _map.Map<roomVariantCreateDto, RoomVariant>(variantCreateDto);
            cmdMdl.createdDate = DateTime.Now;

            await _repo.Create(cmdMdl);
            await _repo.Save();

            var withUser = await _repo.FindById(cmdMdl._id);
            var mappedVariants = _map.Map<RoomVariant, roomVariantReadDto>(withUser);

            return Ok(new GenericResponse<roomVariantReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedVariants
            });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> updateRoomVariant(Guid id, roomVariantUpdateDto variantUpdateDto)
        {

            var variant = await _repo.FindById(id);
            if (variant == null)
                return NotFound("Variant not found");

            _map.Map(variantUpdateDto, variant);

            await _repo.Update(variant);
            await _repo.Save();

            var mappedVariants = _map.Map<RoomVariant, roomVariantReadDto>(variant);
            return Ok(new GenericResponse<roomVariantReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedVariants
            });
        }

    }
}