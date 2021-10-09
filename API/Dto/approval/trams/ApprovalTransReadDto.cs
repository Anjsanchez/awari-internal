using System;
using API.Models.functionality;
using API.Models.products;
using API.Models.rooms;

namespace API.Dto.approval.trams
{
    public class ApprovalTransReadDto
    {
        public Guid _id { get; set; }
        public Guid transId { get; set; }
        public Room reservationRoom { get; set; }
        public Product product { get; set; }
        public Discount discount { get; set; }
        public Int32 quantity { get; set; }
        public Int32 seniorPax { get; set; }
        public float netDiscount { get; set; }
        public string remark { get; set; }
        public float netAmount { get; set; }
        public float grossAmount { get; set; }
    }
}