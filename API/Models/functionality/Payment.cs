using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models.functionality
{
    public class Payment
    {
        [Key]
        [Required]
        public Guid _id { get; set; }


        [Required]
        [StringLength(150)]
        public string name { get; set; }


        public bool isActive { get; set; }


        public bool isNeedRefNumber { get; set; }


        [Required]
        [Column("createdBy")]
        public Guid userId { get; set; }
        public User user { get; set; }


        public DateTime createdDate { get; set; }

    }
}