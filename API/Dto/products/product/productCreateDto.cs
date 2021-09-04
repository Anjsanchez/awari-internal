using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace API.Dto.products.product
{
    public class productCreateDto
    {
        [Required]
        [StringLength(150)]
        public string shortName { get; set; }


        [Required]
        [StringLength(150)]
        public string longName { get; set; }


        [Required]
        public Guid productCategoryId { get; set; }

        public Guid productTypeId { get; set; }


        public Int32 numberOfServing { get; set; }


        public float costPrice { get; set; }


        public float sellingPrice { get; set; }


        public bool isActive { get; set; }


        public bool isActivityType { get; set; }


        public string description { get; set; }


        [Required]
        public Guid userId { get; set; }


        public IFormFile ImageFile { get; set; }

        public string ImageName { get; set; }

        public string ImageSrc { get; set; }
    }
}