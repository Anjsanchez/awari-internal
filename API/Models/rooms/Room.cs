using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models.rooms
{
    public class Room
    {
        [Key]
        [Required]
        public Guid _id { get; set; }


        [Required]
        [StringLength(150)]
        public string searchName { get; set; }


        [Required]
        [StringLength(150)]
        public string roomLongName { get; set; }


        public float costPrice { get; set; }


        public Int32 numberOfRooms { get; set; }


        public Int32 minimumCapacity { get; set; }


        public Int32 maximumCapacity { get; set; }


        public bool isAllowExtraPax { get; set; }


        public bool isPerPaxRoomType { get; set; }


        public Guid RoomVariantId { get; set; }
        public RoomVariant RoomVariant { get; set; }


        public bool isActive { get; set; }


        [Required]
        [Column("createdBy")]
        public Guid userId { get; set; }
        public User user { get; set; }

        public DateTime createdDate { get; set; }

    }
}