using System;

namespace API.Dto.inventory
{
    public class PurchaseOrderApprovalUpdateDto
    {
        public Guid _id { get; set; }
        public string ApprovalStatus { get; set; }
        public Guid ApprovedById { get; set; }
    }

    public class PurchaseReqApprovalUpdateDto
    {
        public Guid _id { get; set; }
        public string ApprovalStatus { get; set; }
        public Guid ApprovedById { get; set; }
    }
}
