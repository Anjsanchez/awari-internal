using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace API.Models.products
{
    public class Product
    {
        [Key]
        [Required]
        public Guid _id { get; set; }


        [Required]
        [StringLength(150)]
        public string shortName { get; set; }


        [Required]
        [StringLength(150)]
        public string longName { get; set; }


        [Required]
        public Guid productCategoryId { get; set; }
        public ProductCategory productCategory { get; set; }


        [Required]
        public Guid productTypeId { get; set; }
        public ProductType productType { get; set; }


        public Int32 numberOfServing { get; set; }


        public float costPrice { get; set; }


        public float sellingPrice { get; set; }


        public bool isActive { get; set; }


        public bool isActivityType { get; set; }


        public string description { get; set; }


        [Required]
        [Column("createdBy")]
        public Guid userId { get; set; }
        public User user { get; set; }


        public DateTime createdDate { get; set; }

#nullable enable
        public string? ImageName { get; set; }
#nullable disable
        [NotMapped]
        public IFormFile ImageFile { get; set; }

        [NotMapped]
        public string ImageSrc { get; set; }

    }
}