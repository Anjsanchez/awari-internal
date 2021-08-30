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

        public Guid? discountId { get; set; }

        public float grossAmount { get; set; }
        public float totalDiscount { get; set; }
        public float totalAmount { get; set; }

        public Int32 mattress { get; set; }
        public string remark { get; set; }

        public Int32 adultPax { get; set; }
        public Int32 seniorPax { get; set; }
        public Int32 childrenPax { get; set; }
    }
}