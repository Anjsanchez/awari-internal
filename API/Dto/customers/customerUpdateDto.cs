using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace API.Dto.customers
{
    public class customerUpdateDto
    {

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

        public IFormFile ImageFile { get; set; }

        public string ImageName { get; set; }

    }
}