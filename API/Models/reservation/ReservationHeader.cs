using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models.reservation
{
    public class ReservationHeader
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

        public virtual List<ReservationRoomLine> ReservationRoomLine { get; set; }

        [Required]
        [Column("createdBy")]
        public Guid userId { get; set; }
        public User user { get; set; }

        public bool isActive { get; set; }

        public DateTime createdDate { get; set; }
    }
}