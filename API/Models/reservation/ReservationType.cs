using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models.reservation
{
    public class ReservationType
    {
        [Key]
        public Guid _id { get; set; }


        [Required]
        [StringLength(50)]
        public string name { get; set; }
    }
}