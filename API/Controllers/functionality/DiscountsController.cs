using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.functionality;
using API.Data.ApiResponse;
using API.Dto.functionality.discounts;
using API.helpers.api;
using API.Migrations.Configurations;
using API.Models.functionality;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace API.Controllers.functionality
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public class DiscountsController : ControllerBase
    {

        private readonly IDiscountRepository _repo;
        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;

        public DiscountsController(IDiscountRepository repo, IMapper mapp, IOptionsMonitor<jwtConfig> optionsMonitor)
        {
            _repo = repo;
            _map = mapp;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpGet]
        public async Task<ActionResult> GetDiscounts()
        {
            var discounts = await _repo.FindAll();
            var mappedDiscounts = _map.Map<List<Discount>, List<discountReadDto>>(discounts.ToList());

            return Ok(new GenericResponse<discountReadDto>()
            {
                listRecords = mappedDiscounts,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetDiscountById(Guid id)
        {
            var discount = await _repo.FindById(id);

            if (discount == null)
                return NotFound("Discount Not found");

            var mappedDiscount = _map.Map<Discount, discountReadDto>(discount);

            return Ok(new GenericResponse<discountReadDto>()
            {
                singleRecord = mappedDiscount,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateDiscount(Guid id, discountUpdateDto DiscountUpdateDto)
        {
            var discount = await _repo.FindById(id);
            if (discount == null)
                return NotFound("Discount not found in the database");

            _map.Map(DiscountUpdateDto, discount);
            await _repo.Update(discount);
            await _repo.Save();

            var withUser = await _repo.FindById(discount._id);
            var mappedCategory = _map.Map<Discount, discountReadDto>(withUser);

            return Ok(new GenericResponse<discountReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedCategory
            });
        }

        [HttpPost]
        public async Task<ActionResult> CreateDiscount(discountCreateDto DiscountCreateDto)
        {

            if (!ModelState.IsValid)
                return BadRequest();

            var discount = await _repo.GetByName(DiscountCreateDto.name);

            if (discount != null)
                return BadRequest("Discount is already in use");

            var cmdMdl = _map.Map<discountCreateDto, Discount>(DiscountCreateDto);
            cmdMdl.createdDate = DateTime.Now;

            await _repo.Create(cmdMdl);
            await _repo.Save();

            var withUser = await _repo.FindById(cmdMdl._id);
            var mappedData = _map.Map<Discount, discountReadDto>(withUser);

            return Ok(new GenericResponse<discountReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedData
            });
        }
    }
}