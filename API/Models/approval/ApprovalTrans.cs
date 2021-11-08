using System;
using System.ComponentModel.DataAnnotations;
using API.Models.functionality;
using API.Models.products;
using API.Models.rooms;

namespace API.Models.approval
{
    public class ApprovalTrans
    {
        [Key]
        public Guid _id { get; set; }

        public Guid transId { get; set; }
        public Guid reservationHeaderId { get; set; }

        public Guid? reservationRoomId { get; set; }
        public Room reservationRoom { get; set; }

        public Guid productId { get; set; }
        public Product product { get; set; }

        public Guid? discountId { get; set; }
        public Discount discount { get; set; }

        public Int32 quantity { get; set; }
        public Int32 seniorPax { get; set; }
        public float netDiscount { get; set; }
        public float netAmount { get; set; }
        public float grossAmount { get; set; }

        public string remark { get; set; }
    }
}