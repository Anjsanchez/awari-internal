using System;

namespace API.Dto.reservations.trans
{
    public class reservationTransUpdateDto
    {
        public Guid reservationRoomLineId { get; set; }

        public Guid productId { get; set; }

        public Guid? discountId { get; set; }

        public Int32 quantity { get; set; }
        public Int32 seniorPax { get; set; }
        public float netDiscount { get; set; }

        public string remark { get; set; }

        public bool isPrinted { get; set; }
    }
}