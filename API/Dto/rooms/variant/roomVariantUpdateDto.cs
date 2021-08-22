using System;
using System.ComponentModel.DataAnnotations;

namespace API.Dto.rooms.variant
{
    public class roomVariantUpdateDto
    {
        [Required]
        [StringLength(100)]
        public string name { get; set; }

        public bool isActive { get; set; }
    }
}