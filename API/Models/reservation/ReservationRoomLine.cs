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


        public Int32 pax { get; set; }


        [Required]
        [Column("createdBy")]
        public Guid userId { get; set; }
        public User user { get; set; }


        public DateTime createdDate { get; set; }
    }
}