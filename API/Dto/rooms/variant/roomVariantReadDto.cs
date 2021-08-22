using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Models;

namespace API.Dto.rooms.variant
{
    public class roomVariantReadDto
    {
        [Key]
        [Required]
        public Guid _id { get; set; }

        [Required]
        [StringLength(100)]
        public string name { get; set; }


        [Required]
        public DateTime createdDate { get; set; }


        public bool isActive { get; set; }


        [Required]
        public Guid userId { get; set; }
        public User user { get; set; }
    }
}