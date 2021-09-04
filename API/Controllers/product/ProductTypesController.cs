using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.products;
using API.Dto.products.type;
using API.Models.products;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.product
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ProductTypesController : ControllerBase
    {
        private readonly IProductTypeRepository _repo;
        private readonly IMapper _map;
        public ProductTypesController(IProductTypeRepository repository, IMapper map)
        {
            _repo = repository; _map = map;
        }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            var types = await _repo.FindAll();
            var mappedRoles = _map.Map<List<ProductType>, List<productTypeReadDto>>(types.ToList());
            return Ok(mappedRoles);
        }
    }
}