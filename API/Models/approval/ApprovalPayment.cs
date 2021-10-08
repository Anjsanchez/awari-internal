using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Models.functionality;
using API.Models.reservation;

namespace API.Models.approval
{
    public class ApprovalPayment
    {
        [Key]
        [Required]
        public Guid _id { get; set; }

        public Guid transId { get; set; }

        [Required]
        [StringLength(50)]
        public string type { get; set; }

        public float amount { get; set; }

        public Guid paymentId { get; set; }
        public Payment payment { get; set; }

        [Required]
        [StringLength(100)]
        public string paymentRefNum { get; set; }

        [Required]
        [Column("createdBy")]
        public Guid userId { get; set; }
        public User user { get; set; }

        public DateTime createdDate { get; set; }
    }
}