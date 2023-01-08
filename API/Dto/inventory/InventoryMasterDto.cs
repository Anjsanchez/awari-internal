using System;

namespace API.Dto.inventory
{
    public class InventoryMasterDto
    {
        public Guid? _id { get; set; }
        public string Name { get; set; }

        public Guid InventoryTypeId { get; set; }
        public Guid ProductCategoryId { get; set; }
        public Guid InventoryUnitId { get; set; }
        public Guid userId { get; set; }
        public float QtyMainInventory { get; set; }
        public float QtyProductionInventory { get; set; }
        public bool IsActive { get; set; }
    }
}
