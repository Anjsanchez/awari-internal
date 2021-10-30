using System;
using API.Models;

namespace API.Dto.products.type
{
    public class productTypeCreateDto
    {
        public string name { get; set; }
        public bool isActive { get; set; }
        public Guid userId { get; set; }
    }
}