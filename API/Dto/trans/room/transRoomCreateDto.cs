using System;

namespace API.Dto.trans.room
{
    public class transRoomCreateDto
    {
        public Guid _id { get; set; }
        public Guid transHeaderId { get; set; }

        public DateTime startDate { get; set; }

        public DateTime endDate { get; set; }

        public Guid roomId { get; set; }

        public Guid? discountId { get; set; }

        public float grossAmount { get; set; }
        public float totalDiscount { get; set; }
        public float totalAmount { get; set; }

        public Int32 mattress { get; set; }
        public string remark { get; set; }

        public Int32 adultPax { get; set; }
        public Int32 seniorPax { get; set; }
        public Int32 childrenPax { get; set; }

        public Guid userId { get; set; }
        public DateTime createdDate { get; set; }
    }
}