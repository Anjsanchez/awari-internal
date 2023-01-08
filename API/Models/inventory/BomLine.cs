using API.Models.products;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models.inventory
{
    public class BomLine
    {
        [Key]
        public Guid _id { get; set; }

        public Guid HeaderId { get; set; }
        public Product Header { get; set; }

        public Guid LineId { get; set; }
        public InventoryMaster Line { get; set; }

        public float Quantity { get; set; }
    }
}
