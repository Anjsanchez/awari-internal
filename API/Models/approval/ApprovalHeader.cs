using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Models.reservation;

namespace API.Models.approval
{
    public class ApprovalHeader
    {
        [Key]
        [Required]
        public Guid _id { get; set; }

        public Guid transId { get; set; }

        public Guid customerId { get; set; }
        public Customer Customer { get; set; }

        public string voucher { get; set; }

        public string? agency { get; set; }

        public Guid reservationTypeId { get; set; }
        public ReservationType reservationType { get; set; }

        [Column("createdBy")]
        public Guid userId { get; set; }
        public User user { get; set; }

        public DateTime createdDate { get; set; }
    }
}