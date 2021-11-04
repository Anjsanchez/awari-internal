using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Models;
using API.Models.reservation;
using static API.Models.Enum.EnumModels;

namespace API.Dto.reservations.header
{
    public class reservationHeaderReadDto
    {
        public Guid _id { get; set; }
        public Customer Customer { get; set; }
        public ReservationType reservationType { get; set; }
        public string voucher { get; set; }
        public string agency { get; set; }
        public User user { get; set; }
        public DateTime createdDate { get; set; }
        public int roomCount { get; set; }
        public bool isActive { get; set; }
        public Status approvalStatus { get; set; }
        public DateTime checkInDate { get; set; }
    }
}