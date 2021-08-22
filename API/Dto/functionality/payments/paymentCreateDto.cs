using System;

namespace API.Dto.functionality.payments
{
    public class paymentCreateDto
    {

        public string name { get; set; }


        public bool isActive { get; set; }


        public bool isNeedRefNumber { get; set; }


        public Guid userId { get; set; }


    }
}