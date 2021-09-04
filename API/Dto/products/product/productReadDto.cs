using System;
using System.ComponentModel.DataAnnotations;
using API.Models;
using API.Models.products;
using Microsoft.AspNetCore.Http;

namespace API.Dto.products.product
{
    public class productReadDto
    {

        public Guid _id { get; set; }


        public string shortName { get; set; }


        public string longName { get; set; }


        public ProductCategory productCategory { get; set; }


        public ProductType productType { get; set; }


        public Int32 numberOfServing { get; set; }


        public float costPrice { get; set; }


        public float sellingPrice { get; set; }


        public bool isActive { get; set; }


        public string description { get; set; }


        public bool isActivityType { get; set; }


        public User user { get; set; }


        public DateTime createdDate { get; set; }

        public string ImageName { get; set; }

        public IFormFile ImageFile { get; set; }

        public string ImageSrc { get; set; }
    }
}