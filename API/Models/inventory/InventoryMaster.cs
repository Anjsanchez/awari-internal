
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using API.Models.products;

namespace API.Models.inventory
{
    public class InventoryMaster
    {
        [Key]
        public Guid _id { get; set; }
        public string Name { get; set; }

        [Required]
        public Guid InventoryTypeId { get; set; }
        public InventoryType InventoryType { get; set; }

        [Required]
        public Guid ProductCategoryId { get; set; }
        public ProductCategory ProductCategory { get; set; }

        [Required]
        public Guid InventoryUnitId { get; set; }
        public InventoryUnit InventoryUnit { get; set; }

        public float QtyMainInventory { get; set; }

        public float QtyProductionInventory { get; set; }

        public bool IsActive { get; set; }

        [Required]
        [Column("createdBy")]
        public Guid? UserId { get; set; }
        public User User { get; set; }

        public DateTime CreatedDate { get; set; }

        public string Note { get; set; }

    }
}
