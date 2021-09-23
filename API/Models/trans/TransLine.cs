using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Models.functionality;
using API.Models.products;
using API.Models.reservation;

namespace API.Models.trans
{
    public class TransLine
    {
        [Key]
        [Required]
        public Guid _id { get; set; }

        [Required]
        public Guid transHeaderId { get; set; }
        public TransHeader transHeader { get; set; }

        public Guid? transRoomId { get; set; }
        public TransRoom transRoom { get; set; }

        [Required]
        public Guid productId { get; set; }
        public Product product { get; set; }

        public Guid? discountId { get; set; }
        public Discount discount { get; set; }

        public Int32 quantity { get; set; }
        public Int32 seniorPax { get; set; }

        public float netDiscount { get; set; }
        public float netAmount { get; set; }
        public float grossAmount { get; set; }

        [StringLength(1000)]
        public string remark { get; set; }

        [Required]
        [Column("createdBy")]
        public Guid userId { get; set; }
        public User user { get; set; }

        public DateTime createdDate { get; set; }
    }
}