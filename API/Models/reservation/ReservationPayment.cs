using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Models.functionality;
using static API.Models.Enum.EnumModels;

namespace API.Models.reservation
{
    public class ReservationPayment
    {
        [Key]
        [Required]
        public Guid _id { get; set; }


        [Required]
        public Guid reservationHeaderId { get; set; }
        public ReservationHeader reservationHeader { get; set; }


        [Required]
        [StringLength(50)]
        public string type { get; set; }


        public float amount { get; set; }


        [Required]
        public Guid paymentId { get; set; }
        public Payment payment { get; set; }


        [Required]
        [StringLength(100)]
        public string paymentRefNum { get; set; }

        public Status approvalStatus { get; set; } = 0;

        [Required]
        [Column("createdBy")]
        public Guid userId { get; set; }
        public User user { get; set; }


        public DateTime createdDate { get; set; }
    }
}