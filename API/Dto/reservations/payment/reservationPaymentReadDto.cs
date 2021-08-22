using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Models;
using API.Models.functionality;
using API.Models.reservation;

namespace API.Dto.reservations.payment
{
    public class reservationPaymentReadDto
    {

        public Guid _id { get; set; }
        public ReservationHeader reservationHeader { get; set; }
        public string type { get; set; }
        public float amount { get; set; }
        public Payment payment { get; set; }
        public Int32 paymentRefNum { get; set; }
        public User user { get; set; }
        public DateTime createdDate { get; set; }

    }
}