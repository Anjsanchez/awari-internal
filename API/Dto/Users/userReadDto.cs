using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using API.Dto.Users.roles;
using API.Models;
using API.Models.employee;

namespace API.Dto.Users
{
    public class userReadDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string EmailAddress { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public byte isExportFlag { get; set; } = 0;
        public Role Role { get; set; }
        public bool isActive { get; set; }
        public List<employeeRoleReadDto> userRoles { get; set; }
        public Int64 SSS { get; set; }
        public Int64 mobile { get; set; }
        public Int64 philHealth { get; set; }
        public Int64 pagIbig { get; set; }
        public DateTime birthday { get; set; }
    }
}