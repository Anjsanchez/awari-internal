using System;

namespace API.Dto.trans.line
{
    public class transCreateDto
    {
        public Guid _id { get; set; }
        public Guid transHeaderId { get; set; }


        public Guid transRoomId { get; set; }

        public Guid productId { get; set; }

        public Guid? discountId { get; set; }

        public Int32 quantity { get; set; }
        public Int32 seniorPax { get; set; }

        public float netDiscount { get; set; }
        public float netAmount { get; set; }
        public float grossAmount { get; set; }

        public string remark { get; set; }

        public Guid userId { get; set; }

        public DateTime createdDate { get; set; }
    }
}