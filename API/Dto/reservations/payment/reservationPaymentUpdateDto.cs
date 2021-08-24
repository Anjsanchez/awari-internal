using System;
using System.ComponentModel.DataAnnotations;
using API.Models.functionality;

namespace API.Dto.reservations.payment
{
    public class reservationPaymentUpdateDto
    {

        public string type { get; set; }
        public float amount { get; set; }
        public Guid paymentId { get; set; }
        public string paymentRefNum { get; set; }

    }
}