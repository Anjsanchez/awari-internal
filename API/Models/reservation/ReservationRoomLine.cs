using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Models.rooms;

namespace API.Models.reservation
{
    public class ReservationRoomLine
    {
        [Key]
        [Required]
        public Guid _id { get; set; }


        [Required]
        public Guid reservationHeaderId { get; set; }
        public ReservationHeader reservationHeader { get; set; }


        public DateTime startDate { get; set; }


        public DateTime endDate { get; set; }


        [Required]
        public Guid roomId { get; set; }
        public Room room { get; set; }


        public float grossAmount { get; set; }
        public float totalDiscount { get; set; }
        public float totalAmount { get; set; }


        public Int32 adultPax { get; set; }
        public Int32 seniorPax { get; set; }
        public Int32 childrenPax { get; set; }


        [Required]
        [Column("createdBy")]
        public Guid userId { get; set; }
        public User user { get; set; }


        public DateTime createdDate { get; set; }
    }
}