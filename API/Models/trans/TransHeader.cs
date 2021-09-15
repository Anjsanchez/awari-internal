using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Models.reservation;

namespace API.Models.trans
{
    public class TransHeader
    {
        [Key]
        [Required]
        public Guid _id { get; set; }


        [Required]
        public Guid customerId { get; set; }
        public Customer Customer { get; set; }


        [Required]
        [StringLength(100)]
        public string voucher { get; set; }


        [Required]
        public Guid reservationTypeId { get; set; }
        public ReservationType reservationType { get; set; }

        public virtual List<TransRoom> TransRoom { get; set; }

        [Required]
        [Column("createdBy")]
        public Guid userId { get; set; }
        public User user { get; set; }

        [Required]
        [Column("checkOutBy")]
        public Guid userCheckOutId { get; set; }
        public User userCheckOut { get; set; }

        public DateTime createdDate { get; set; }
        public DateTime checkOutDate { get; set; }
    }
}