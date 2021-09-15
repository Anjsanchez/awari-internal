using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.trans;
using API.Data.ApiResponse;
using API.Dto.trans.payment;
using API.helpers.api;
using API.Migrations.Configurations;
using API.Models.trans;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace API.Controllers.trans
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransPaymentsController : ControllerBase
    {

        private readonly ITransPaymentRepository _repo;
        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;

        public TransPaymentsController(ITransPaymentRepository repo, IMapper mapp, IOptionsMonitor<jwtConfig> optionsMonitor)
        {
            _repo = repo;
            _map = mapp;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpGet]
        public async Task<ActionResult> GetTransPayments()
        {
            var TransPayments = await _repo.FindAll();

            var mappedTransPayments = _map.Map<List<TransPayment>, List<transPaymentReadDto>>(TransPayments.ToList());

            return Ok(new GenericResponse<transPaymentReadDto>()
            {
                listRecords = mappedTransPayments,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetTransPaymentById(Guid id)
        {
            var TransPayment = await _repo.FindById(id);

            if (TransPayment == null)
                return NotFound("TransPayment Not found");

            var mappedTransPayment = _map.Map<TransPayment, transPaymentReadDto>(TransPayment);

            return Ok(new GenericResponse<transPaymentReadDto>()
            {
                singleRecord = mappedTransPayment,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpGet("byHeaderId")]
        public async Task<ActionResult> GetPaymentByHeaderId(Guid headerId)
        {
            var TransPayments = await _repo.GetPaymentByHeaderId(headerId);

            var mappedTransPayments = _map.Map<List<TransPayment>, List<transPaymentReadDto>>(TransPayments.ToList());

            return Ok(new GenericResponse<transPaymentReadDto>()
            {
                listRecords = mappedTransPayments,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTransPayment(Guid id)
        {
            var TransPayment = await _repo.FindById(id);
            if (TransPayment == null)
                return NotFound("Trans Payment not found in the database");

            await _repo.Delete(TransPayment);
            await _repo.Save();

            var mappedCategory = _map.Map<TransPayment, transPaymentReadDto>(TransPayment);

            return Ok(new GenericResponse<transPaymentReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedCategory
            });
        }




        [HttpPost]
        public async Task<ActionResult> CreateTransPayment(transPaymentCreateDto TransPaymentCreateDto)
        {

            if (!ModelState.IsValid)
                return BadRequest();

            var cmdMdl = _map.Map<transPaymentCreateDto, TransPayment>(TransPaymentCreateDto);
            cmdMdl.createdDate = DateTime.Now;

            await _repo.Create(cmdMdl);
            await _repo.Save();

            var withUser = await _repo.FindById(cmdMdl._id);
            var mappedData = _map.Map<TransPayment, transPaymentReadDto>(withUser);

            return Ok(new GenericResponse<transPaymentReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedData
            });
        }
    }
}