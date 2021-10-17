using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using API.Dto.Users.roles;
using API.Models.employee;

namespace API.Dto.Users
{
    public class userUpdateDto
    {
        public string Username { get; set; }
        public Int64 mobile { get; set; }
        public Int64 SSS { get; set; }
        public Int64 philHealth { get; set; }
        public Int64 pagIbig { get; set; }
        public DateTime birthday { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public Guid RoleId { get; set; }
        public bool isActive { get; set; }
        public List<employeeRole> userRoles { get; set; }
    }
}