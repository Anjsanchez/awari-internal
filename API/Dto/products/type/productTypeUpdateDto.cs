using System;
using API.Models;

namespace API.Dto.products.type
{
    public class productTypeUpdateDto
    {
        public string name { get; set; }
        public bool isActive { get; set; }
    }
}