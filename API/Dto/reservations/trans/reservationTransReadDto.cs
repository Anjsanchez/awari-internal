using System;
using API.Models;
using API.Models.functionality;
using API.Models.products;
using API.Models.reservation;
using static API.Models.Enum.EnumModels;

namespace API.Dto.reservations.trans
{
    public class reservationTransReadDto
    {

        public Guid _id { get; set; }

        public ReservationHeader reservationHeader { get; set; }

        public ReservationRoomLine reservationRoomLine { get; set; }

        public Product product { get; set; }

        public Discount discount { get; set; }

        public Int32 quantity { get; set; }
        public Int32 seniorPax { get; set; }
        public float netDiscount { get; set; }

        public string remark { get; set; }

        public User user { get; set; }

        public DateTime createdDate { get; set; }

        public Status approvalStatus { get; set; }
        public bool isPrinted { get; set; }
    }
}