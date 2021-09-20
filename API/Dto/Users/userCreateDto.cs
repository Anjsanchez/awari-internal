using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using API.Models;
using API.Models.employee;

namespace API.Dto.Users
{
    public class userCreateDto
    {


        [Required]
        [StringLength(50)]
        public string Username { get; set; }


        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }


        [Required]
        [StringLength(50)]
        public string LastName { get; set; }


        [Required]
        [StringLength(100)]
        public string EmailAddress { get; set; }


        [Required]
        public string Password { get; set; }


        public Guid RoleId { get; set; }

        public bool isActive { get; set; }

        public List<employeeRole> userRoles { get; set; }

    }
}