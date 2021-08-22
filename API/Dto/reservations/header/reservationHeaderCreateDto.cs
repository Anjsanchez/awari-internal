using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Models;
using API.Models.reservation;
namespace API.Dto.reservations.header
{
    public class reservationHeaderCreateDto
    {
        public Guid customerId { get; set; }

        public Guid reservationTypeId { get; set; }

        public string voucher { get; set; }

        public Guid userId { get; set; }
    }
}