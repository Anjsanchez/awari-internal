using System;

namespace API.Dto.trans.header
{
    public class transHeaderCreateDto
    {
        public Guid _id { get; set; }
        public Guid customerId { get; set; }

        public Guid reservationTypeId { get; set; }

        public string voucher { get; set; }

        public Guid userId { get; set; }

        public Guid userCheckOutId { get; set; }

        public DateTime createdDate { get; set; }

        public float netAmount { get; set; }
        public float grossAmount { get; set; }
        public float netDiscount { get; set; }
        public int totalNumberOfGuest { get; set; }
        public int totalNumberOfRooms { get; set; }
        public int totalNumberOfTrans { get; set; }
    }
}