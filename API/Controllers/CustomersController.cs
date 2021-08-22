using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using API.Contracts.pages;
using API.Data.ApiResponse;
using API.Dto.customers;
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
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerRepository _repo;
        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;

        public CustomersController(ICustomerRepository repo, IMapper mapp, IOptionsMonitor<jwtConfig> optionsMonitor)
        {
            _repo = repo;
            _map = mapp;
            _jwtConfig = optionsMonitor.CurrentValue;
        }
        [HttpGet]
        public async Task<ActionResult> GetCustomers()
        {
            var customers = await _repo.FindAll();
            var mappedCustomers = _map.Map<List<Customer>, List<customerReadDto>>(customers.ToList());

            return Ok(new GenericResponse<customerReadDto>()
            {
                listRecords = mappedCustomers,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetCustomerById(Guid id)
        {
            var customer = await _repo.FindById(id);
            if (customer == null)
                return NotFound("Customer Not found");

            var mappedCustomer = _map.Map<Customer, customerReadDto>(customer);

            return Ok(new GenericResponse<customerReadDto>()
            {
                singleRecord = mappedCustomer,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCustomer(Guid id, customerUpdateDto custUpdateDto)
        {
            var customer = await _repo.FindById(id);
            if (customer == null)
                return NotFound("Customer not found in the database");

            _map.Map(custUpdateDto, customer);
            await _repo.Update(customer);
            await _repo.Save();

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult> createCustomer(customerCreateDto customerCreateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid modelstate");

            var customer = await _repo.getCustomerByCustomerId(customerCreateDto.customerid);
            if (customer != null)
                return BadRequest("Customer ID is already in use.");

            var cmdMdl = _map.Map<customerCreateDto, Customer>(customerCreateDto);
            cmdMdl.createdDate = DateTime.Now;
            cmdMdl._id = new Guid();

            await _repo.Create(cmdMdl);
            await _repo.Save();

            return Ok(cmdMdl);
        }


    }
}