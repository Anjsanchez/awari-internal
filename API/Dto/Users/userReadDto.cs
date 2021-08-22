using System;
using System.ComponentModel.DataAnnotations;
using API.Models;

namespace API.Dto.Users
{
    public class userReadDto
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Username { get; set; }

        [Required]
        [StringLength(100)]
        public string EmailAddress { get; set; }


        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        public byte isExportFlag { get; set; } = 0;

        public Role Role { get; set; }
        public bool isActive { get; set; }

    }
}