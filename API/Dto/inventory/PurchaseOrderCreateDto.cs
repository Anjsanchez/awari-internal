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
        public List<PurchaseOrderLines> Lines { get; set; }
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
