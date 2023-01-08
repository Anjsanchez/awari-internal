using System;

namespace API.Dto.inventory
{
    public class PurchaseOrderApprovalUpdateDto
    {
        public Guid _id { get; set; }
        public string ApprovalStatus { get; set; }
        public Guid ApprovedById { get; set; } 
    }
    public class PurchaseOrderReceivedUpdateDto
    {
        public Guid _id { get; set; }
        public string InvoiceNumber { get; set; }
        public Guid ReceivedById { get; set; }
    }
    public class PurchaseOrderLineApprovalUpdateDto
    {
        public Guid _id { get; set; }
        public string ReceivedQuantity { get; set; }
        public Guid ReceivedById { get; set; }
    }

    public class PurchaseReqApprovalUpdateDto
    {
        public Guid _id { get; set; }
        public string ApprovalStatus { get; set; }
        public Guid ApprovedById { get; set; }
    }
}
