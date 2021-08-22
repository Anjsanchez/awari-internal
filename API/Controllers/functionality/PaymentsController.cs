using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.functionality;
using API.Data.ApiResponse;
using API.Dto.functionality.payments;
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

    public class PaymentsController : ControllerBase
    {

        private readonly IPaymentRepository _repo;
        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;

        public PaymentsController(IPaymentRepository repo, IMapper mapp, IOptionsMonitor<jwtConfig> optionsMonitor)
        {
            _repo = repo;
            _map = mapp;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpGet]
        public async Task<ActionResult> GetPayments()
        {
            var payments = await _repo.FindAll();
            var mappedPayments = _map.Map<List<Payment>, List<paymentReadDto>>(payments.ToList());

            return Ok(new GenericResponse<paymentReadDto>()
            {
                listRecords = mappedPayments,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetPaymentById(Guid id)
        {
            var payment = await _repo.FindById(id);

            if (payment == null)
                return NotFound("Payment Not found");

            var mappedPayment = _map.Map<Payment, paymentReadDto>(payment);

            return Ok(new GenericResponse<paymentReadDto>()
            {
                singleRecord = mappedPayment,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePayment(Guid id, paymentUpdateDto PaymentUpdateDto)
        {
            var payment = await _repo.FindById(id);
            if (payment == null)
                return NotFound("Payment not found in the database");

            _map.Map(PaymentUpdateDto, payment);
            await _repo.Update(payment);
            await _repo.Save();

            var withUser = await _repo.FindById(payment._id);
            var mappedCategory = _map.Map<Payment, paymentReadDto>(withUser);

            return Ok(new GenericResponse<paymentReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedCategory
            });
        }

        [HttpPost]
        public async Task<ActionResult> CreatePayment(paymentCreateDto PaymentCreateDto)
        {

            if (!ModelState.IsValid)
                return BadRequest();

            var payment = await _repo.GetByName(PaymentCreateDto.name);

            if (payment != null)
                return BadRequest("Payment is already in use");

            var cmdMdl = _map.Map<paymentCreateDto, Payment>(PaymentCreateDto);
            cmdMdl.createdDate = DateTime.Now;

            await _repo.Create(cmdMdl);
            await _repo.Save();

            var withUser = await _repo.FindById(cmdMdl._id);
            var mappedData = _map.Map<Payment, paymentReadDto>(withUser);

            return Ok(new GenericResponse<paymentReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedData
            });
        }
    }
}