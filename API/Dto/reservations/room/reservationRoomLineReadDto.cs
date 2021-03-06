using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Models;
using API.Models.functionality;
using API.Models.reservation;
using API.Models.rooms;
using static API.Models.Enum.EnumModels;

namespace API.Dto.reservations.room
{
    public class reservationRoomLineReadDto
    {
        public Guid _id { get; set; }

        public ReservationHeader reservationHeader { get; set; }

        public DateTime startDate { get; set; }

        public DateTime endDate { get; set; }

        public Room room { get; set; }

        public RoomPricing roomPricing { get; set; }

        public Status approvalStatus { get; set; }

        public Int32 lateCheckOutPenalty { get; set; } = 0;

        public Discount discount { get; set; }

        public float grossAmount { get; set; }
        public float totalDiscount { get; set; }
        public float totalAmount { get; set; }

        public Int32 mattress { get; set; }
        public string remark { get; set; }

        public Int32 adultPax { get; set; }
        public Int32 seniorPax { get; set; }
        public Int32 childrenPax { get; set; }

        public User user { get; set; }

        public DateTime createdDate { get; set; }
    }
}