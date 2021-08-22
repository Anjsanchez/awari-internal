using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models.reservation;

namespace API.Contracts.pages.reservation
{
    public interface IReservationRoomLineRepository : IRepositoryBase<ReservationRoomLine>
    {
        Task<List<ReservationRoomLine>> GetLineByHeaderId(Guid headerId);
    }
}