using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models.products
{
    public class ProductType
    {
        [Key]
        public Guid _id { get; set; }
        public string name { get; set; }

    }
}