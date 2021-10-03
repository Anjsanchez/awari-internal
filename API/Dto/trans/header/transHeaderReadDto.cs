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
        public string agency { get; set; }

        public float netAmount { get; set; }
        public float grossAmount { get; set; }
        public float netDiscount { get; set; }
        public int totalNumberOfGuest { get; set; }
        public int totalNumberOfRooms { get; set; }
        public int totalNumberOfTrans { get; set; }
    }
}