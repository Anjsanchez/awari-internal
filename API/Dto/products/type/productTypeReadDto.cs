using System;
using API.Models;

namespace API.Dto.products.type
{
    public class productTypeReadDto
    {
        public Guid _id { get; set; }
        public string name { get; set; }

        public bool isActive { get; set; }
        public User user { get; set; }
        public DateTime createdDate { get; set; }
    }
}