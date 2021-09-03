using System;

namespace API.Models.customer
{
    public class CustomerWithActiveBookingReadDto
    {
        public Customer Customer { get; set; }
        public Guid headerId { get; set; }
    }
}