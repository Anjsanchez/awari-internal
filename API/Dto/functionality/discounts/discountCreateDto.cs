using System;

namespace API.Dto.functionality.discounts
{
    public class discountCreateDto
    {
        public string name { get; set; }


        public bool isByPercentage { get; set; }
        public Int32 value { get; set; }
        public bool isRequiredCustomer { get; set; }
        public bool isActive { get; set; }
        public bool isRequiredId { get; set; }
        public bool isRequiredApproval { get; set; }


        public Guid userId { get; set; }

    }
}