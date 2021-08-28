using System.Collections.Generic;
using API.Dto.reservations.line;
using API.Dto.rooms.room;
using API.Dto.rooms.variant;

namespace API.Data.ApiResponse
{
    public class RoomReservationCreation : AuthResult
    {
        public List<roomVariantReadDto> variants { get; set; }
        public List<roomReadDto> rooms { get; set; }
        public List<reservationRoomLineReadDto> lines { get; set; }
    }
}