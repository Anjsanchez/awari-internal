using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Models;
using API.Models.reservation;

namespace API.Dto.reservations.header
{
    public class reservationHeaderUpdateDto
    {
        public bool isActive { get; set; }
    }
}