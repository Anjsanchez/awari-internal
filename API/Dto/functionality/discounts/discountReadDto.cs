using System;
using System.ComponentModel.DataAnnotations;
using API.Models;

namespace API.Dto.functionality.discounts
{
    public class discountReadDto
    {
        public Guid _id { get; set; }


        public string name { get; set; }


        public bool isByPercentage { get; set; }
        public Int32 value { get; set; }
        public bool isRequiredCustomer { get; set; }
        public bool isActive { get; set; }
        public bool isRequiredId { get; set; }
        public bool isRequiredApproval { get; set; }


        public User user { get; set; }


        public DateTime createdDate { get; set; }
    }
}