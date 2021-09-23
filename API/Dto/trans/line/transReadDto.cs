using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Models;
using API.Models.functionality;
using API.Models.products;
using API.Models.trans;

namespace API.Dto.trans.line
{
    public class transReadDto
    {
        public Guid _id { get; set; }

        public TransHeader transHeader { get; set; }

        public TransRoom transRoom { get; set; }

        public Product product { get; set; }

        public Discount discount { get; set; }

        public Int32 quantity { get; set; }
        public Int32 seniorPax { get; set; }

        public float netDiscount { get; set; }
        public float netAmount { get; set; }
        public float grossAmount { get; set; }

        public string remark { get; set; }

        public User user { get; set; }

        public DateTime createdDate { get; set; }

    }
}