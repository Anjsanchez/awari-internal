using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models.reservation;

namespace API.Contracts.pages.reservation
{
    public interface IReservationRoomLineRepository : IRepositoryBase<ReservationRoomLine>
    {
        Task<bool> deleteRange(List<ReservationRoomLine> lines);
        Task<List<ReservationRoomLine>> GetLineByHeaderId(Guid headerId);
        Task<ICollection<ReservationRoomLine>> getLineByDates(DateTime fromDate, DateTime toDate);
        Task<ICollection<ReservationRoomLine>> GetLinesActiveHeader();
    }
}