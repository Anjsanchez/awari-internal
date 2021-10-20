using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace API.Dto.customers
{
    public class customerCreateDto
    {

        public Int64 customerid { get; set; }
        public string firstName { get; set; }
        public string emailAddress { get; set; }
        public string lastName { get; set; }
        public string address { get; set; }
        public Int64 mobile { get; set; }
        public DateTime birthday { get; set; }
        public bool isActive { get; set; }

        [Required]
        [Column("createdBy")]
        public Guid userId { get; set; }

        public IFormFile ImageFile { get; set; }

        public string ImageName { get; set; }

        public string ImageSrc { get; set; }

    }
}