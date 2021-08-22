using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Role
    {
        public Guid Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Rolename { get; set; }
    }
}