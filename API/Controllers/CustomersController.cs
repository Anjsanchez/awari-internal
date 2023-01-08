using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages;
using API.Contracts.pages.products;
using API.Data.ApiResponse;
using API.Dto.customers;
using API.Dto.products;
using API.Dto.products.product;
using API.helpers.api;
using API.Migrations.Configurations;
using API.Models;
using API.Models.products;
using API.Models.user_management;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerRepository _repo;
        public readonly IProductCategoryRepository _prodCatRepo;
        public readonly IProductRepository _prodRepo;
        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;
        public readonly IWebHostEnvironment _hostEnvironment;

        public CustomersController(ICustomerRepository repo, IWebHostEnvironment hostEnvironment, IProductRepository prodRepo, IProductCategoryRepository prodCatRepo, IMapper mapp, IOptionsMonitor<jwtConfig> optionsMonitor)
        {
            _prodRepo = prodRepo;
            _prodCatRepo = prodCatRepo;
            _repo = repo;
            _map = mapp;
            _jwtConfig = optionsMonitor.CurrentValue;
            _hostEnvironment = hostEnvironment;
        }
        [HttpGet]
        public async Task<ActionResult> GetCustomers(bool isActiveOnly = false)
        {
            var customers = await _repo.FindAll();
            if (isActiveOnly)
                customers = customers.Where(n => n.isActive == true).ToList();

            var mappedCustomers = _map.Map<List<Customer>, List<customerReadDto>>(customers.ToList());

            return Ok(new GenericResponse<customerReadDto>()
            {
                listRecords = mappedCustomers,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpPut("UpsertVendors")]
        public async Task<ActionResult<int>> UpsertVendors(VendorDto dto)
        {

            var cmdMdl = _map.Map<VendorDto, Vendor>(dto);

            var result = await _repo.UpsertVendors(cmdMdl);

            if (result.result == Data.ApiResponse.result.error)
                return BadRequest(result.message);

            return Ok(new GenericResponse<VendorDto>()
            {
                singleRecord = null,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("GetVendors")]
        public async Task<ActionResult> GetVendors(bool isActiveOnly = false)
        {
            var data = await _repo.GetVendors(isActiveOnly);

            return Ok(new GenericResponse<Vendor>()
            {
                listRecords = data,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("GetCustomersWithActiveBooking")]
        public async Task<ActionResult> GetCustomersWithActiveBooking()
        {
            var customers = await _repo.GetCustomersWithActiveBooking();
            var prodCategory = await _prodCatRepo.FindAll(true);
            var products = await _prodRepo.FindAll(true);


            var mappedCategory = _map.Map<List<ProductCategory>, List<productCategoryReadDto>>(prodCategory.ToList());
            var mappedProducts = _map.Map<List<Product>, List<productReadDto>>(products.ToList());

            return Ok(new CustomerWithActiveBookingReadDtoResponse()
            {
                customers = customers,
                ProductCategories = mappedCategory,
                Products = mappedProducts
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetCustomerById(Guid id)
        {
            var customer = await _repo.GetCustomersWithImage(Request);

            var cust = customer.FirstOrDefault(n => n._id == id);
            if (cust == null)
                return NotFound("Customer Not found");

            var mappedCustomer = _map.Map<Customer, customerReadDto>(cust);

            return Ok(new GenericResponse<customerReadDto>()
            {
                singleRecord = mappedCustomer,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCustomer(Guid id, [FromForm] customerUpdateDto custUpdateDto)
        {
            var customer = await _repo.FindById(id);
            if (customer == null)
                return NotFound("Customer not found in the database");

            if (custUpdateDto.ImageFile != null)
            {
                custUpdateDto.ImageName = await globalFunctionalityHelper.SaveImage(custUpdateDto.ImageFile, "Customers", _hostEnvironment);

                if (customer.ImageName != null)
                    globalFunctionalityHelper.DeleteImage(customer.ImageName, "Customers", _hostEnvironment);
            }

            _map.Map(custUpdateDto, customer);


            await _repo.Update(customer);
            await _repo.Save();

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult> createCustomer([FromForm] customerCreateDto customerCreateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid model state");

            var customer = await _repo.getCustomerByCustomerId(customerCreateDto.customerid);
            if (customer != null)
                return BadRequest("Customer ID is already in use.");

            var cmdMdl = _map.Map<customerCreateDto, Customer>(customerCreateDto);
            cmdMdl.createdDate = DateTime.Now;
            cmdMdl._id = new Guid();
            cmdMdl.ImageName = await globalFunctionalityHelper.SaveImage(customerCreateDto.ImageFile, "Customers", _hostEnvironment);

            await _repo.Create(cmdMdl);
            await _repo.Save();

            var withUser = await _repo.GetCustomersWithImage(Request);
            var filter = withUser.FirstOrDefault(n => n._id == cmdMdl._id);
            var mappedData = _map.Map<Customer, customerCreateDto>(filter);

            return Ok(cmdMdl);
        }


    }
}