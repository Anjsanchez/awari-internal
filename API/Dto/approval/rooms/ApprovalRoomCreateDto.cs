using System;

namespace API.Dto.approval
{
    public class ApprovalRoomCreateDto
    {
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public Guid? discountId { get; set; }
        public Guid? roomPricingId { get; set; }
        public Guid roomId { get; set; }

        public float grossAmount { get; set; }
        public float totalDiscount { get; set; }
        public float totalAmount { get; set; }

        public Int32 adultPax { get; set; }
        public Int32 seniorPax { get; set; }
        public Int32 childrenPax { get; set; }

        public Int32 mattress { get; set; }
        public string remark { get; set; }
    }
}