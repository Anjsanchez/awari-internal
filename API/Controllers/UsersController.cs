using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Contracts;
using API.Contracts.pages.Users;
using API.Data.ApiResponse;
using API.Dto.Users;
using API.Dto.Users.roles;
using API.helpers.api;
using API.Migrations.Configurations;
using API.Models;
using API.Models.employee;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using BC = BCrypt.Net.BCrypt;

namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _repo;
        private readonly IEmployeeRoleRepository _roleRepo;
        private readonly IMapper _map;
        private readonly jwtConfig _jwtConfig;
        public UsersController(
            IMapper mapper, IOptionsMonitor<jwtConfig> optionsMonitor, IEmployeeRoleRepository roleRepo, IUserRepository repo)
        {
            _roleRepo = roleRepo;
            _repo = repo;
            _map = mapper;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpGet]
        // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> getUsers(bool isActiveOnly = false)
        {
            var users = await _repo.FindAll();

            if (isActiveOnly)
                users = users.Where(n => n.isActive == true).ToList();

            var mappedUsers = _map.Map<List<User>, List<userReadDto>>(users.ToList());

            return Ok(new GenericResponse<userReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                listRecords = mappedUsers
            });
        }


        [HttpGet("{id}")]
        // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> getUserById(Guid id)
        {
            var users = await _repo.FindById(id);
            if (users == null)
                return NotFound("Username or Email not found");

            var mappedUsers = _map.Map<User, userReadDto>(users);

            var userRoles = await _roleRepo.GetRoleByUser(mappedUsers.Id);
            var mappedRoles = _map.Map<List<employeeRole>, List<employeeRoleReadDto>>(userRoles.ToList());

            mappedUsers.userRoles = mappedRoles;

            return Ok(new GenericResponse<userReadDto>()
            {
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                Success = true,
                singleRecord = mappedUsers
            });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> updateUser(Guid id, userUpdateDto usrUpdateDto)
        {

            var user = await _repo.FindById(id);
            if (user == null)
                return NotFound("Username or Email not found");

            _map.Map(usrUpdateDto, user);
            await _repo.Update(user);
            await _repo.Save();

            await _roleRepo.deleteRange(user.Id);
            await _roleRepo.createRange(usrUpdateDto.userRoles);
            return NoContent();
        }

        [HttpPut("updatePassword/{id}")]
        public async Task<ActionResult> updateUserPassword(Guid id, userPasswordUpdateDto usrUpdateDto)
        {

            var user = await _repo.FindById(id);
            if (user == null)
                return NotFound("Username or Email not found");

            user.Password = BC.HashPassword(usrUpdateDto.Password);
            await _repo.Update(user);
            await _repo.Save();

            return NoContent();
        }


        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult> loginUser(userLoginDto userDto)
        {
            var account = await _repo.getUserByUsernameOrEmail(userDto.Username, userDto.Username);

            if (account == null)
                return BadRequest("Username or Email not found");

            if (!BC.Verify(userDto.Password, account.Password))
                return BadRequest("Invalid username and password combination");

            var commandModel = _map.Map<userReadDto>(account);

            var userRoles = await _roleRepo.GetRoleByUser(commandModel.Id);
            var mappedRoles = _map.Map<List<employeeRole>, List<employeeRoleReadDto>>(userRoles.ToList());

            commandModel.userRoles = mappedRoles;

            return Ok(new GenericResponse<userReadDto>()
            {
                Success = true,
                Token = globalFunctionalityHelper.GenerateJwtToken(_jwtConfig.Secret),
                singleRecord = commandModel
            });
        }

        [HttpPost]
        public async Task<ActionResult> createUser(userCreateDto userCreateDto)
        {

            if (!ModelState.IsValid)
                return BadRequest();

            var user = await _repo.getUserByUsernameOrEmail(userCreateDto.Username, userCreateDto.EmailAddress);

            if (user != null)
                return BadRequest("Username or email is already in use");

            var cmdMdl = _map.Map<userCreateDto, User>(userCreateDto);

            cmdMdl.Password = BC.HashPassword(cmdMdl.Password);
            cmdMdl.isExportFlag = 0;

            await _repo.Create(cmdMdl);
            await _repo.Save();

            foreach (var item in userCreateDto.userRoles)
            {
                item.userId = cmdMdl.Id;
            }

            await _roleRepo.deleteRange(cmdMdl.Id);
            await _roleRepo.createRange(userCreateDto.userRoles);

            return Ok(cmdMdl);
        }
    }
}