using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models.Others
{
    public class TravelAgency
    {
        [Key]
        public Guid _id { get; set; }
        [Required]
        [StringLength(50)]
        public string name { get; set; }
    }
}