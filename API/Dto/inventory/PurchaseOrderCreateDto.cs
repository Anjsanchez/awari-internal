using API.Models;
using API.Models.inventory;
using System;
using System.Collections.Generic;

namespace API.Dto.inventory
{
    public class PurchaseOrderCreateDto
    {
        public PurchaseOrderHeaderCreateDto Header { get; set; }
        public List<PurchaseOrderLineCreateDto> Lines { get; set; }
    }

    public class PurchaseOrderReadDto
    {
        public PurchaseOrder Header { get; set; }
        public List<PurchaseOrderLinesReadDto> Lines { get; set; }
    }

    public class PurchaseOrderLinesReadDto {
        public Guid _id { get; set; }
        public Guid PurchaseOrderId { get; set; }
        public PurchaseOrder PurchaseOrder { get; set; }

        public string Note { get; set; }
        public float LineQuantity { get; set; }
        public float ReceivedQuantity { get; set; }
        public Guid ReceivedById { get; set; }
        public User ReceivedBy { get; set; }
        public DateTime ReceivedDate { get; set; }

        public string LineStatus { get; set; }
        public Guid InventoryMasterId { get; set; }
        public InventoryMaster InventoryMaster { get; set; }
    }

    public class PurchaseOrderHeaderCreateDto
    {
        public Guid? _id { get; set; }
        public string CreatedById { get; set; }
        public string RequestedById { get; set; }
        public string VendorId { get; set; }
    }
    public class PurchaseOrderLineCreateDto
    {
        public Guid? _id { get; set; }
        public string PurchaseOrderId { get; set; }
        public string InventoryMasterId { get; set; }
        public string LineQuantity { get; set; }
        public string Note { get; set; }
    }


}
