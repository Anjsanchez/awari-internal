using System;
using System.ComponentModel.DataAnnotations;
using API.Models;

namespace API.Dto.functionality.payments
{
    public class paymentReadDto
    {
        public Guid _id { get; set; }


        public string name { get; set; }


        public bool isActive { get; set; }


        public bool isNeedRefNumber { get; set; }


        public User user { get; set; }


        public DateTime createdDate { get; set; }
    }
}