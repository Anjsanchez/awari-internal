using API.Models;
using API.Models.inventory;
using System;
using System.Collections.Generic;

namespace API.Dto.inventory
{
    public class InvAdjApprovalUpdateDto
    {
        public Guid _id { get; set; }
        public string ApprovalStatus { get; set; }
        public Guid ApprovedById { get; set; }
    }
    public class InventoryAdjustmentHeaderReadDto
    {
        public Guid _id { get; set; }

        public int JournalNumber { get; set; }

        public string ApprovalStatus { get; set; }

        public string AdjustmentType { get; set; }
        public Guid? ApprovedById { get; set; }
        public User ApprovedBy { get; set; }
        public DateTime? ApprovedDate { get; set; }

        public Guid RequestedById { get; set; }
        public User RequestedBy { get; set; }
        public DateTime? RequestDate { get; set; }

        public Guid CreatedById { get; set; }
        public User CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }

        public string Reason { get; set; }
    }

    public class InvAdjustmentLinesReadDto
    {
        public Guid _id { get; set; }

        public Guid InventoryAdjustmentId { get; set; }
        public InventoryAdjustment InventoryAdjustment { get; set; }

        public string Note { get; set; }
        public float Quantity { get; set; }

        public string AdjustmentAction { get; set; }
        public string InventoryLocation { get; set; }

        public Guid InventoryMasterId { get; set; }
        public InventoryMaster InventoryMaster { get; set; }
    }

    public class InventoryAdjustmentReadDto
    {
        public InventoryAdjustmentHeaderReadDto Header { get; set; }
        public List<InvAdjustmentLinesReadDto> Lines { get; set; }
    }

    public class InvAdjCreateDto
    {
        public InvAdjHeaderCreateDto Header { get; set; }
        public List<InvAdjLineCreateDto> Lines { get; set; }
    }
    public class InvAdjHeaderCreateDto
    {
        public Guid? _id { get; set; }
        public string CreatedById { get; set; }
        public string RequestedById { get; set; }
        public string Reason { get; set; }
        public string AdjustmentType { get; set; }
    }
    public class InvAdjLineCreateDto
    {
        public Guid? _id { get; set; }
        public string InventoryAdjustmentId { get; set; }
        public string InventoryMasterId { get; set; }
        public string Quantity { get; set; }
        public string AdjustmentAction { get; set; }
        public string InventoryLocation { get; set; }
        public string Note { get; set; }
    }
}
