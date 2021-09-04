using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace API.Dto.products.product
{
    public class productUpdateDto
    {

        public string shortName { get; set; }


        public string longName { get; set; }


        public Guid productCategoryId { get; set; }


        public Int32 numberOfServing { get; set; }


        public float costPrice { get; set; }


        public float sellingPrice { get; set; }


        public string description { get; set; }


        public bool isActive { get; set; }


        public bool isActivityType { get; set; }


        public Guid productTypeId { get; set; }


        public string ImageName { get; set; }

        public IFormFile ImageFile { get; set; }

    }
}