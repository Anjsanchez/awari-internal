
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace API.Models.inventory
{
    public class InventoryType
    {
        [Key]
        public Guid _id { get; set; }
        public string Name { get; set; }

        public bool IsActive { get; set; }

        [Required]
        [Column("createdBy")]
        public Guid? UserId { get; set; }
        public User User { get; set; }


        public DateTime CreatedDate { get; set; }
    }
}
