using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models.products
{
    public class ProductType
    {
        [Key]
        public Guid _id { get; set; }
        public string name { get; set; }

        public bool isActive { get; set; }

        [Required]
        [Column("createdBy")]
        public Guid? userId { get; set; }
        public User user { get; set; }


        public DateTime createdDate { get; set; }
    }
}