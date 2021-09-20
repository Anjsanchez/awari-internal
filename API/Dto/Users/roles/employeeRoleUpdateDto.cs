using System;
using System.ComponentModel.DataAnnotations;
using API.Models;

namespace API.Dto.Users.roles
{
    public class employeeRoleUpdateDto
    {
        [Required]
        public Guid userId { get; set; }
        public User user { get; set; }

        public int roleKey { get; set; }
    }
}