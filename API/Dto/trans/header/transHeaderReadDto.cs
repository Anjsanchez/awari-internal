using System;
using API.Models;
using API.Models.reservation;

namespace API.Dto.trans.header
{
    public class transHeaderReadDto
    {
        public Guid _id { get; set; }
        public Customer Customer { get; set; }
        public ReservationType reservationType { get; set; }
        public string voucher { get; set; }
        public User user { get; set; }
        public DateTime createdDate { get; set; }
        public DateTime checkOutDate { get; set; }
        public User userCheckOut { get; set; }
        public int roomCount { get; set; }
    }
}