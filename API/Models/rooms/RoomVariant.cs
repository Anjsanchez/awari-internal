using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class RoomVariant
    {
        [Key]
        [Required]
        public Guid _id { get; set; }


        [Required]
        [StringLength(100)]
        public string name { get; set; }


        [Required]
        public DateTime createdDate { get; set; } = DateTime.Now;


        public bool isActive { get; set; }


        [Required]
        [Column("createdBy")]
        public Guid userId { get; set; }
        public User user { get; set; }
    }
}