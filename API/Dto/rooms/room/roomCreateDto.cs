using System;
using System.ComponentModel.DataAnnotations;
using API.Models;

namespace API.Dto.rooms.room
{
    public class roomCreateDto
    {
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


        public bool isActive { get; set; }


        public bool isAllowExtraPax { get; set; }


        public bool isPerPaxRoomType { get; set; }


        public Guid RoomVariantId { get; set; }


        [Required]
        public Guid userId { get; set; }

    }
}