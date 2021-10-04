using System;

namespace API.Models.reservation
{
    public class ReservationApproval
    {
        public Guid _id { get; set; }
        public Guid transId { get; set; }
        public string transType { get; set; }
    }
}