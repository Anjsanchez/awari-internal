using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Models;
using API.Models.functionality;
using API.Models.reservation;

namespace API.Dto.reservations.payment
{
    public class reservationPaymentCreateDto
    {

        [Required]
        public Guid ReservationHeaderId { get; set; }

        [Required]
        [StringLength(50)]
        public string type { get; set; }


        public float amount { get; set; }


        [Required]
        public Guid paymentId { get; set; }


        public Int32 paymentRefNum { get; set; }


        [Required]
        [Column("createdBy")]
        public Guid userId { get; set; }

    }
}