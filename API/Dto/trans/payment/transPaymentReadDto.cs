using System;
using API.Models;
using API.Models.functionality;
using API.Models.trans;

namespace API.Dto.trans.payment
{
    public class transPaymentReadDto
    {
        public Guid _id { get; set; }
        public TransHeader transHeader { get; set; }
        public string type { get; set; }
        public float amount { get; set; }
        public Payment payment { get; set; }
        public string paymentRefNum { get; set; }
        public User user { get; set; }
        public DateTime createdDate { get; set; }
    }
}