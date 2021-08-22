using System;
using System.ComponentModel.DataAnnotations;

namespace API.Dto.Users
{
    public class userLoginDto
    {
        [Required]
        [StringLength(50)]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}