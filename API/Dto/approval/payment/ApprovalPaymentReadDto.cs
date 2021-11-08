using System;
using API.Models;
using API.Models.functionality;

namespace API.Dto.approval.payment
{
    public class ApprovalPaymentReadDto
    {
        public Guid _id { get; set; }

        public Guid transId { get; set; }

        public string type { get; set; }

        public float amount { get; set; }

        public Guid reservationHeaderId { get; set; }
        public Payment payment { get; set; }

        public string paymentRefNum { get; set; }

        public User user { get; set; }

        public DateTime createdDate { get; set; }
    }
}