using System;

namespace API.Dto.approval
{
    public class reservationApprovalUpdateDto
    {
        public Guid userId { get; set; }
        public string action { get; set; }
    }
}