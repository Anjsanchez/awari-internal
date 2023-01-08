using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models.inventory
{
    public class PurchaseReqLines
    {
        [Key]
        public Guid _id { get; set; }

        public Guid PurchaseReqId { get; set; }
        public PurchaseReq PurchaseReq { get; set; }

        public string Note { get; set; }
        public float LineQuantity { get; set; }

        public Guid InventoryMasterId { get; set; }
        public InventoryMaster InventoryMaster { get; set; }
    }
}
