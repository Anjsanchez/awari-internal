using System.Threading.Tasks;
using API.Contracts.pages.Others;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.other
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class TravelAgencyController : ControllerBase
    {
        private readonly ITravelAgencyRepository _repo;
        private readonly IMapper _map;
        public TravelAgencyController(ITravelAgencyRepository repository, IMapper map)
        {
            _repo = repository;
            _map = map;
        }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            var roles = await _repo.FindAll();
            return Ok(roles);
        }
    }
}