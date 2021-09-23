using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Models.functionality;
using API.Models.products;

namespace API.Models.reservation
{
    public class ReservationTransLine
    {
        [Key]
        [Required]
        public Guid _id { get; set; }

        [Required]
        public Guid reservationHeaderId { get; set; }
        public ReservationHeader reservationHeader { get; set; }

        public Guid? reservationRoomLineId { get; set; }
        public ReservationRoomLine reservationRoomLine { get; set; }

        [Required]
        public Guid productId { get; set; }
        public Product product { get; set; }

        public Guid? discountId { get; set; }
        public Discount discount { get; set; }

        public Int32 quantity { get; set; }
        public Int32 seniorPax { get; set; }
        public float netDiscount { get; set; }

        [StringLength(1000)]
        public string remark { get; set; }

        [Required]
        [Column("createdBy")]
        public Guid userId { get; set; }
        public User user { get; set; }

        public DateTime createdDate { get; set; }

        public bool isPrinted { get; set; }
    }
}