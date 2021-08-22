using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Models;
using API.Models.rooms;

namespace API.Dto.rooms.pricing
{
    public class roomPricingCreateDto
    {


        public Guid roomId { get; set; }


        public Int32 capacity { get; set; }


        public Int32 sellingPrice { get; set; }


        public bool isActive { get; set; }


        public Guid userId { get; set; }

    }
}