using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace API.Models
{
    [Index(nameof(customerid), IsUnique = true)]
    public class Customer
    {
        [Key]
        [Required]
        public Guid _id { get; set; }


        [Required]
        public Int64 customerid { get; set; }


        [Required]
        [StringLength(50)]
        public string firstName { get; set; }


        [Required]
        [StringLength(50)]
        public string lastName { get; set; }


        [Required]
        public string address { get; set; }

        [Required]
        [StringLength(100)]
        public string emailAddress { get; set; }


        [Required]
        public Int64 mobile { get; set; }


        [Required]
        public DateTime birthday { get; set; }


        [Required]
        public float points { get; set; }


        [Required]
        public bool isActive { get; set; }


        [Required]
        public float cardAmount { get; set; }


        [Required]
        public DateTime createdDate { get; set; }


        [Required]
        [Column("createdBy")]
        public Guid userId { get; set; }


        public User user { get; set; }
    }
}