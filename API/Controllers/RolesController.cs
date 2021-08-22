using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages;
using API.Dto.roles;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class RolesController : ControllerBase
    {

        private readonly IRoleRepository _repo;
        private readonly IMapper _map;
        public RolesController(IRoleRepository repository, IMapper map)
        {
            _repo = repository; _map = map;
        }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            var roles = await _repo.FindAll();
            var mappedRoles = _map.Map<List<Role>, List<roleReadDto>>(roles.ToList());
            return Ok(mappedRoles);
        }

    }
}