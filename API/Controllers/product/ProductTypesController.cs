using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.products;
using API.Data.ApiResponse;
using API.Dto.products.type;
using API.helpers.api;
using API.Migrations.Configurations;
using API.Models.products;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace API.Controllers.product
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ProductTypesController : ControllerBase
    {
        private readonly IProductTypeRepository _repo;
        private readonly jwtConfig _jwtConfig;
        private readonly IMapper _map;


        public ProductTypesController(IOptionsMonitor<jwtConfig> optionsMonitor, IWebHostEnvironment webHostEnv, IProductTypeRepository repository, IMapper map)
        {

            _jwtConfig = optionsMonitor.CurrentValue;
            _repo = repository;
            _map = map;
        }

        [HttpGet]
        public async Task<ActionResult> Index(bool isActiveOnly = false)
        {
            var types = await _repo.FindAll();
            if (isActiveOnly)
                types = types.Where(n => n.isActive == true).ToList();

            var mappedRoles = _map.Map<List<ProductType>, List<productTypeReadDto>>(types.ToList());
            return Ok(mappedRoles);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(Guid id)
        {
            var data = await _repo.FindById(id);

            if (data == null)
                return NotFound("Classificatons Not found");

            var mappedRoom = _map.Map<ProductType, productTypeReadDto>(data);

            return Ok(new GenericResponse<productTypeReadDto>()
            {
                singleRecord = mappedRoom,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret)
            });
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateData(Guid id, productTypeUpdateDto updateDto)
        {
            var data = await _repo.FindById(id);
            if (data == null)
                return NotFound("Category not found in the database");

            _map.Map(updateDto, data);
            await _repo.Update(data);
            await _repo.Save();

            var withUser = await _repo.FindById(data._id);
            var mappedData = _map.Map<ProductType, productTypeReadDto>(withUser);

            return Ok(new GenericResponse<productTypeReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedData
            });
        }

        [HttpPost]
        public async Task<ActionResult> CreateData(productTypeCreateDto createDto)
        {

            if (!ModelState.IsValid)
                return BadRequest();

            var room = await _repo.getTypeByName(createDto.name);

            if (room != null)
                return BadRequest("Classification is already in use");

            var cmdMdl = _map.Map<productTypeCreateDto, ProductType>(createDto);
            cmdMdl.createdDate = DateTime.Now;

            await _repo.Create(cmdMdl);
            await _repo.Save();

            var withUser = await _repo.FindById(cmdMdl._id);
            var mappedCategory = _map.Map<ProductType, productTypeReadDto>(withUser);

            return Ok(new GenericResponse<productTypeReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedCategory
            });
        }

    }
}