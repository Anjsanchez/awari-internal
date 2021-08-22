using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Models;

namespace API.Dto.rooms.variant
{
    public class roomVariantCreateDto
    {
        [Required]
        [StringLength(100)]
        public string name { get; set; }

        [Required]
        [Column("createdBy")]
        public Guid userId { get; set; }

        public bool isActive { get; set; }
    }
}