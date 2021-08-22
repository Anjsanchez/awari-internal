using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Models;
using API.Models.reservation;
using API.Models.rooms;

namespace API.Dto.reservations.line
{
    public class reservationRoomLineUpdateDto
    {
        public Guid reservationHeaderId { get; set; }

        public DateTime startDate { get; set; }

        public DateTime endDate { get; set; }

        public Guid roomId { get; set; }

        public Int32 pax { get; set; }
    }
}