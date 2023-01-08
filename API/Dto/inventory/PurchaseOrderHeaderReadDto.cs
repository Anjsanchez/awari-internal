using API.Models;
using API.Models.user_management;
using System;

namespace API.Dto.inventory
{
    public class PurchaseOrderHeaderReadDto
    {
        public Guid _id { get; set; }
        public int PurchaseOrderNumber { get; set; }

        public string VendorName { get; set; }
        public Guid VendorId { get; set; }
        public Vendor Vendor { get; set; }

        public string ApprovalStatus { get; set; }
        public string RcvStatus { get; set; }


        public Guid? ApprovedById { get; set; }
        public User ApprovedBy { get; set; }
        public DateTime? ApprovedDate { get; set; }


        public Guid RequestedById { get; set; }
        public User RequestedBy { get; set; }
        public DateTime? RequestDate { get; set; }


        public Guid CreatedById { get; set; }
        public User CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }

        public float TotalQuantity { get; set; }
    }
}
