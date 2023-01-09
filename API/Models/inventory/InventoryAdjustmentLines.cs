using API.Models.products;
using System;
using System.ComponentModel.DataAnnotations;
using static API.Models.Enum.EnumModels;

namespace API.Models.inventory
{
    public class InventoryAdjustmentLines
    {
        [Key]
        public Guid _id { get; set; }

        public Guid InventoryAdjustmentId { get; set; }
        public InventoryAdjustment InventoryAdjustment { get; set; }

        public string Note { get; set; }
        public float Quantity { get; set; }

        public AdjustmentAction AdjustmentAction { get; set; }
        public InventoryLocation InventoryLocation { get; set; }

        public Guid InventoryMasterId { get; set; }
        public InventoryMaster InventoryMaster { get; set; }
    }
}
