using System;

namespace API.Dto.reservations.room
{
    public class reservationRoomLineWalkInUpdateDto
    {

        public Int32 adultPax { get; set; }
        public Int32 seniorPax { get; set; }
        public Int32 childrenPax { get; set; }
    }
}