using System.Collections.Generic;
using API.Dto.reservations.header;
using API.Dto.reservations.line;
using API.Dto.reservations.payment;

namespace API.Data.ApiResponse
{
    public class ReserverationHeaderResponse : AuthResult
    {
        public reservationHeaderReadDto header { get; set; }
        public List<reservationRoomLineReadDto> rooms { get; set; }
        public List<reservationPaymentReadDto> payments { get; set; }
    }
}