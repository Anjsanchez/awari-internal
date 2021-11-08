using System;
using System.ComponentModel.DataAnnotations;
using API.Models.functionality;
using API.Models.reservation;
using API.Models.rooms;

namespace API.Models.approval
{
    public class ApprovalRoom
    {
        [Key]
        [Required]
        public Guid _id { get; set; }

        public Guid transId { get; set; }

        public Guid? discountId { get; set; }
        public Discount discount { get; set; }

        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }

        public Guid reservationHeaderId { get; set; }

        public Guid reservationTypeId { get; set; }
        public ReservationType reservationType { get; set; }

        public Guid? roomId { get; set; }
        public Room room { get; set; }

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