using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models.employee
{
    public class employeeRole
    {
        [Key]
        public Guid _id { get; set; }

        [Required]
        public Guid userId { get; set; }
        public User user { get; set; }

        public int roleKey { get; set; }
    }
}