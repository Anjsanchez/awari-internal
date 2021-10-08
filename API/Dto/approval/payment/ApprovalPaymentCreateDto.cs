using System;
using API.Models;

namespace API.Dto.approval
{
    public class ApprovalPaymentCreateDto
    {
        public string type { get; set; }
        public float amount { get; set; }
        public Guid paymentId { get; set; }
        public string paymentRefNum { get; set; }
        public Guid userId { get; set; }
        public DateTime createdDate { get; set; }
    }
}