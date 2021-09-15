using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Dto.trans.payment
{
    public class transPaymentCreateDto
    {
        [Key]
        [Required]
        public Guid _id { get; set; }

        [Required]
        public Guid transHeaderId { get; set; }

        [Required]
        [StringLength(50)]
        public string type { get; set; }


        public float amount { get; set; }


        [Required]
        public Guid paymentId { get; set; }


        public string paymentRefNum { get; set; }


        [Required]
        [Column("createdBy")]
        public Guid userId { get; set; }

        public DateTime createdDate { get; set; }
    }
}