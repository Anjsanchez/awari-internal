using System;

namespace API.Dto.approval
{
    public class ApprovalTransCreateDto
    {

        // public Guid reservationRoomId { get; set; }
        // public Guid productId { get; set; }
        public Guid? discountId { get; set; }
        // public Int32 quantity { get; set; }
        public Int32 seniorPax { get; set; }
        public float netDiscount { get; set; }
        // public string remark { get; set; }
        public float netAmount { get; set; }
        public float grossAmount { get; set; }
    }
}