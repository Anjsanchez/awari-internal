using System;
using API.Models;
using API.Models.functionality;
using API.Models.reservation;

namespace API.Dto.approval.payment
{
    public class ApprovalHeaderReadDto
    {
        public Guid _id { get; set; }

        public Guid transId { get; set; }

        public Customer Customer { get; set; }

        public string voucher { get; set; }

        public string? agency { get; set; }

        public ReservationType reservationType { get; set; }

        public User user { get; set; }

        public DateTime createdDate { get; set; }
    }
}