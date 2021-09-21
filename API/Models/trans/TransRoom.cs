using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Models.functionality;
using API.Models.rooms;

namespace API.Models.trans
{
    public class TransRoom
    {
        [Key]
        [Required]
        public Guid _id { get; set; }


        [Required]
        public Guid transHeaderId { get; set; }
        public TransHeader transHeader { get; set; }

        public Guid? discountId { get; set; }
        public Discount discount { get; set; }

        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }


        [Required]
        public Guid roomId { get; set; }
        public Room room { get; set; }

        public float grossAmount { get; set; }
        public float totalDiscount { get; set; }
        public float totalAmount { get; set; }

        public Int32 adultPax { get; set; }
        public Int32 seniorPax { get; set; }
        public Int32 childrenPax { get; set; }


        public Int32 mattress { get; set; }
        [StringLength(1000)]
        public string remark { get; set; }


        [Required]
        [Column("createdBy")]
        public Guid userId { get; set; }
        public User user { get; set; }


        public DateTime createdDate { get; set; }
    }
}