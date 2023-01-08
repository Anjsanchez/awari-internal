using API.Models.products;
using System;
using System.ComponentModel.DataAnnotations;
using static API.Models.Enum.EnumModels;

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
        public float ReceivedQuantity { get; set; }

        public Guid? ReceivedById { get; set; }
        public User ReceivedBy { get; set; }
        public DateTime ReceivedDate { get; set; }
        public RcvStatus LineStatus { get; set; }

        public Guid InventoryMasterId { get; set; }
        public InventoryMaster InventoryMaster { get; set; }
    }
}
