using System;
namespace API.Dto.inventory
{
    public class InventoryUnitDto
    {
        public Guid? _id { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public Guid? UserId { get; set; }
    }
}
