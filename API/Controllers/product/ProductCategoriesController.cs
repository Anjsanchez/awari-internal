using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using API.Contracts.pages;
using API.Contracts.pages.products;
using API.Contracts.pages.rooms;
using API.Data.ApiResponse;
using API.Dto.customers;
using API.Dto.products;
using API.Dto.rooms.pricing;
using API.Dto.rooms.room;
using API.helpers.api;
using API.Migrations.Configurations;
using API.Models;
using API.Models.products;
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
    public class ProductCategoriesController : ControllerBase
    {
        private readonly IProductCategoryRepository _repo;
        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;

        public ProductCategoriesController(IProductCategoryRepository repo, IMapper mapp, IOptionsMonitor<jwtConfig> optionsMonitor)
        {
            _repo = repo;
            _map = mapp;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpGet]
        public async Task<ActionResult> GetCategories()
        {
            var roomProductCategory = await _repo.FindAll();
            var mappedCategory = _map.Map<List<ProductCategory>, List<productCategoryReadDto>>(roomProductCategory.ToList());

            return Ok(new GenericResponse<productCategoryReadDto>()
            {
                listRecords = mappedCategory,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetCategoryById(Guid id)
        {
            var category = await _repo.FindById(id);

            if (category == null)
                return NotFound("Category Not found");

            var mappedRoom = _map.Map<ProductCategory, productCategoryReadDto>(category);

            return Ok(new GenericResponse<productCategoryReadDto>()
            {
                singleRecord = mappedRoom,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCategory(Guid id, productCategoryUpdateDto categoryUpdateDto)
        {
            var category = await _repo.FindById(id);
            if (category == null)
                return NotFound("Category not found in the database");

            _map.Map(categoryUpdateDto, category);
            await _repo.Update(category);
            await _repo.Save();

            var withUser = await _repo.FindById(category._id);
            var mappedCategory = _map.Map<ProductCategory, productCategoryReadDto>(withUser);

            return Ok(new GenericResponse<productCategoryReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedCategory
            });
        }

        [HttpPost]
        public async Task<ActionResult> CreateCategory(productCategoryCreateDto categoryCreateDto)
        {

            if (!ModelState.IsValid)
                return BadRequest();

            var room = await _repo.GetCategoryByName(categoryCreateDto.name);

            if (room != null)
                return BadRequest("Category is already in use");

            var cmdMdl = _map.Map<productCategoryCreateDto, ProductCategory>(categoryCreateDto);
            cmdMdl.createdDate = DateTime.Now;

            await _repo.Create(cmdMdl);
            await _repo.Save();

            var withUser = await _repo.FindById(cmdMdl._id);
            var mappedCategory = _map.Map<ProductCategory, productCategoryReadDto>(withUser);

            return Ok(new GenericResponse<productCategoryReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedCategory
            });
        }

    }
}