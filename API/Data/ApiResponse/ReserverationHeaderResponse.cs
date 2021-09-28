using System.Collections.Generic;
using API.Dto.reservations.header;
using API.Dto.reservations.room;
using API.Dto.reservations.payment;
using API.Dto.reservations.trans;

namespace API.Data.ApiResponse
{
    public class ReserverationHeaderResponse : AuthResult
    {
        public reservationHeaderReadDto header { get; set; }
        public List<reservationRoomLineReadDto> rooms { get; set; }
        public List<reservationPaymentReadDto> payments { get; set; }
        public List<reservationTransReadDto> trans { get; set; }
        public bool isTrans { get; set; } = false;
    }
}