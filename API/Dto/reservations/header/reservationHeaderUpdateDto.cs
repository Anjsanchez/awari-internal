using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Models;
using API.Models.reservation;

namespace API.Dto.reservations.header
{
    public class reservationHeaderUpdateDto
    {
        public Guid customerId { get; set; }
        public string voucher { get; set; }
        public Guid reservationTypeId { get; set; }
        public bool isActive { get; set; }
    }
}