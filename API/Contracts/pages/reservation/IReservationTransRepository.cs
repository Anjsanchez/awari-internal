using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models.reservation;

namespace API.Contracts.pages.reservation
{
    public interface IReservationTransRepository : IRepositoryBase<ReservationTransLine>
    {
        Task<bool> deleteRange(List<ReservationTransLine> lines);
        Task<bool> createRange(List<ReservationTransLine> lines);
        Task HandleProductWithBomLine(List<ReservationTransLine> lines, bool subtract = true);
        Task<List<ReservationTransLine>> GetTransLineByHeaderId(Guid headerId);
        Task<List<ReservationTransLine>> GetTransLineByRoomLineId(Guid roomHeaderId);
        Task<List<ReservationTransLine>> GetTransLineByUserId(Guid userId);
        Task<ICollection<ReservationTransLine>> FindAllTrans(bool isActiveOnly = false, bool filterTransTodayOnly = true);

    }
}