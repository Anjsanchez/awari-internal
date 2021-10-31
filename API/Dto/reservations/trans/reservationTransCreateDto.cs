using System;
using System.Collections.Generic;
using API.Models.functionality;
using static API.Models.Enum.EnumModels;

namespace API.Dto.reservations.trans
{
    public class reservationTransCreateDto
    {

        public Guid reservationHeaderId { get; set; }

        public Guid? reservationRoomLineId { get; set; }

        public Guid productId { get; set; }

        public Guid? discountId { get; set; }
        public Discount discount { get; set; }

        public Int32 quantity { get; set; }
        public Int32 seniorPax { get; set; }
        public float netDiscount { get; set; }

        public string remark { get; set; }

        public Guid userId { get; set; }

        public string roleName { get; set; }

        public DateTime createdDate { get; set; }

        public Status approvalStatus { get; set; } = 0;

        public bool isPrinted { get; set; }
    }
}