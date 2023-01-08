using API.Models.products;
using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models.inventory
{
    public class PurchaseOrderLines
    {
        [Key]
        public Guid _id { get; set; }

        public Guid PurchaseOrderId { get; set; }
        public PurchaseOrder PurchaseOrder { get; set; }

        public string Note { get; set; }
        public float LineQuantity { get; set; }

        public Guid InventoryMasterId { get; set; }
        public InventoryMaster InventoryMaster { get; set; }
    }
}
