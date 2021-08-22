using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Dto.customers
{
    public class customerCreateDto
    {

        [Required]
        public Int64 customerid { get; set; }


        [Required]
        [StringLength(50)]
        public string firstName { get; set; }


        [Required]
        [StringLength(100)]
        public string emailAddress { get; set; }


        [Required]
        [StringLength(50)]
        public string lastName { get; set; }


        [Required]
        public string address { get; set; }


        [Required]
        public Int64 mobile { get; set; }


        [Required]
        public DateTime birthday { get; set; }


        [Required]
        public bool isActive { get; set; }

        [Required]
        [Column("createdBy")]
        public Guid userId { get; set; }
    }
}