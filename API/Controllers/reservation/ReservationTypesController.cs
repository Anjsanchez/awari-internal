using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.reservation;
using API.Data.ApiResponse;
using API.Dto.reservations.type;
using API.helpers.api;
using API.Migrations.Configurations;
using API.Models.reservation;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace API.Controllers.reservation
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ReservationTypesController : ControllerBase
    {

        private readonly IReservationTypeRepository _repo;
        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;

        public ReservationTypesController(IReservationTypeRepository repo, IMapper mapp, IOptionsMonitor<jwtConfig> optionsMonitor)
        {
            _repo = repo;
            _map = mapp;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpGet]
        public async Task<ActionResult> GetReservationTypes()
        {
            var payments = await _repo.FindAll();
            var mappedPayments = _map.Map<List<ReservationType>, List<reservationTypeReadDto>>(payments.ToList());

            return Ok(new GenericResponse<reservationTypeReadDto>()
            {
                listRecords = mappedPayments,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }
    }
}