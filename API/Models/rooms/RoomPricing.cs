using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models.rooms
{
    public class RoomPricing
    {
        [Key]
        [Required]
        public Guid _id { get; set; }


        public Guid roomId { get; set; }
        public Room room { get; set; }


        public Int32 capacity { get; set; }


        public Int32 sellingPrice { get; set; }


        public bool isActive { get; set; }


        [Required]
        [Column("createdBy")]
        public Guid userId { get; set; }
        public User user { get; set; }


        public DateTime createdDate { get; set; }

    }
}