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
using API.Dto.products.product;
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

    public class ProductsController : ControllerBase
    {

        private readonly IProductRepository _repo;
        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;

        public ProductsController(IProductRepository repo, IMapper mapp, IOptionsMonitor<jwtConfig> optionsMonitor)
        {
            _repo = repo;
            _map = mapp;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpGet]
        public async Task<ActionResult> GetProducts()
        {
            var products = await _repo.FindAll();
            var mappedProducts = _map.Map<List<Product>, List<productReadDto>>(products.ToList());

            return Ok(new GenericResponse<productReadDto>()
            {
                listRecords = mappedProducts,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetProductById(Guid id)
        {
            var product = await _repo.FindById(id);

            if (product == null)
                return NotFound("Product Not found");

            var mappedProduct = _map.Map<Product, productReadDto>(product);

            return Ok(new GenericResponse<productReadDto>()
            {
                singleRecord = mappedProduct,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProduct(Guid id, productUpdateDto ProductUpdateDto)
        {
            var product = await _repo.FindById(id);
            if (product == null)
                return NotFound("Product not found in the database");

            _map.Map(ProductUpdateDto, product);
            await _repo.Update(product);
            await _repo.Save();

            var withUser = await _repo.FindById(product._id);
            var mappedCategory = _map.Map<Product, productReadDto>(withUser);

            return Ok(new GenericResponse<productReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedCategory
            });
        }

        [HttpPost]
        public async Task<ActionResult> CreateProduct(productCreateDto ProductCreateDto)
        {

            if (!ModelState.IsValid)
                return BadRequest();

            var product = await _repo.GetProductByName(ProductCreateDto.longName);

            if (product != null)
                return BadRequest("Product is already in use");

            var cmdMdl = _map.Map<productCreateDto, Product>(ProductCreateDto);
            cmdMdl.createdDate = DateTime.Now;

            await _repo.Create(cmdMdl);
            await _repo.Save();

            var withUser = await _repo.FindById(cmdMdl._id);
            var mappedData = _map.Map<Product, productReadDto>(withUser);

            return Ok(new GenericResponse<productReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedData
            });
        }


    }
}