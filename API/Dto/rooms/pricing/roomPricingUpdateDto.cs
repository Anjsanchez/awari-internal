using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Dto.rooms.pricing
{
    public class roomPricingUpdateDto
    {


        public Guid roomId { get; set; }


        public Int32 capacity { get; set; }


        public Int32 sellingPrice { get; set; }


        public bool isActive { get; set; }


        [Required]
        [Column("createdBy")]
        public Guid userId { get; set; }

    }
}