using System;

namespace API.Dto.approval.header
{
    public class ApprovalHeaderCreateDto
    {
        public Guid customerId { get; set; }
        public string voucher { get; set; }
        public string agency { get; set; }
        public Guid reservationTypeId { get; set; }
        public Guid userId { get; set; }
        public DateTime createdDate { get; set; }
    }
}