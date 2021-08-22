using System;
using System.ComponentModel.DataAnnotations;
using API.Models;
using API.Models.products;

namespace API.Dto.products.product
{
    public class productReadDto
    {

        [Required]
        public Guid _id { get; set; }


        [Required]
        [StringLength(150)]
        public string shortName { get; set; }


        [Required]
        [StringLength(150)]
        public string longName { get; set; }


        [Required]
        public ProductCategory productCategory { get; set; }


        public Int32 numberOfServing { get; set; }


        public float costPrice { get; set; }


        public float sellingPrice { get; set; }


        public bool isActive { get; set; }


        public bool isActivityType { get; set; }


        [Required]
        public User user { get; set; }


        public DateTime createdDate { get; set; }

    }
}