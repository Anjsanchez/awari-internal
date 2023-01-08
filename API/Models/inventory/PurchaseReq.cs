using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static API.Models.Enum.EnumModels;

namespace API.Models.inventory
{
    public class PurchaseReq
    {
        [Key]
        public Guid _id { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PurchaseRequisitionNumber { get; set; }

        public PurchaseOrderStatus ApprovalStatus { get; set; }

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
