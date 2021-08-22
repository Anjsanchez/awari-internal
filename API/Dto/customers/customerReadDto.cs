using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Dto.Users;
using API.Models;

namespace API.Dto.customers
{
    public class customerReadDto
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
        [StringLength(100)]
        public string emailAddress { get; set; }


        [Required]
        public string address { get; set; }


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


        public userReadDto user { get; set; }
    }
}