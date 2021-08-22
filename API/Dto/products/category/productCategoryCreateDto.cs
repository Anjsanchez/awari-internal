using System;

namespace API.Dto.products
{
    public class productCategoryCreateDto
    {

        public string name { get; set; }


        public bool isActive { get; set; }


        public Guid userId { get; set; }
    }
}