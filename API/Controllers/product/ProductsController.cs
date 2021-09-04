using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.products;
using API.Data.ApiResponse;
using API.Dto.products.product;
using API.helpers.api;
using API.Migrations.Configurations;
using API.Models.products;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public class ProductsController : ControllerBase
    {

        private readonly IProductRepository _repo;
        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;
        public readonly IWebHostEnvironment _hostEnvironment;


        public ProductsController(IProductRepository repo, IMapper mapp, IOptionsMonitor<jwtConfig> optionsMonitor, IWebHostEnvironment hostEnvironment)
        {
            _hostEnvironment = hostEnvironment;
            _repo = repo;
            _map = mapp;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpGet]
        public async Task<ActionResult> GetProducts()
        {
            var products = await _repo.GetProductsWithImage(Request);
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
        public async Task<ActionResult> UpdateProduct(Guid id, [FromForm] productUpdateDto ProductUpdateDto)
        {
            var product = await _repo.FindById(id);
            if (product == null)
                return NotFound("Product not found in the database");

            if (ProductUpdateDto.ImageFile != null)
            {
                ProductUpdateDto.ImageName = await globalFunctionalityHelper.SaveImage(ProductUpdateDto.ImageFile, "Products", _hostEnvironment);
                globalFunctionalityHelper.DeleteImage(product.ImageName, "Products", _hostEnvironment);
            }

            _map.Map(ProductUpdateDto, product);


            await _repo.Update(product);
            await _repo.Save();

            var withUser = await _repo.GetProductsWithImage(Request);
            var filter = withUser.FirstOrDefault(n => n._id == product._id);
            var mappedCategory = _map.Map<Product, productReadDto>(filter);

            return Ok(new GenericResponse<productReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedCategory
            });
        }

        [HttpPost]
        public async Task<ActionResult> CreateProduct([FromForm] productCreateDto ProductCreateDto)
        {

            if (!ModelState.IsValid)
                return BadRequest();

            var product = await _repo.GetProductByName(ProductCreateDto.longName);

            if (product != null)
                return BadRequest("Product is already in use");

            var cmdMdl = _map.Map<productCreateDto, Product>(ProductCreateDto);
            cmdMdl.createdDate = DateTime.Now;
            cmdMdl.ImageName = await globalFunctionalityHelper.SaveImage(ProductCreateDto.ImageFile, "Products", _hostEnvironment);

            await _repo.Create(cmdMdl);
            await _repo.Save();

            var withUser = await _repo.GetProductsWithImage(Request);
            var filter = withUser.FirstOrDefault(n => n._id == cmdMdl._id);
            var mappedData = _map.Map<Product, productReadDto>(filter);

            return Ok(new GenericResponse<productReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedData
            });
        }

    }
}