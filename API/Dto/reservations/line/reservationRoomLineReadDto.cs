using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Models;
using API.Models.reservation;
using API.Models.rooms;

namespace API.Dto.reservations.line
{
    public class reservationRoomLineReadDto
    {
        public Guid _id { get; set; }

        public ReservationHeader reservationHeader { get; set; }

        public DateTime startDate { get; set; }

        public DateTime endDate { get; set; }

        public Room room { get; set; }

        public Int32 pax { get; set; }

        public User user { get; set; }

        public DateTime createdDate { get; set; }
    }
}