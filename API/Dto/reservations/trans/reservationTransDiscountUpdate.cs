using System;

namespace API.Dto.reservations.trans
{
    public class reservationTransDiscountUpdate
    {

        public Guid transId { get; set; }
        public Guid? discountId { get; set; }
        public Int32 seniorPax { get; set; }
        public float netDiscount { get; set; }
    }
}