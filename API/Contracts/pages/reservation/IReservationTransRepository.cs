using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models.reservation;

namespace API.Contracts.pages.reservation
{
    public interface IReservationTransRepository : IRepositoryBase<ReservationTransLine>
    {
        Task<bool> createRange(List<ReservationTransLine> lines);
        Task<List<ReservationTransLine>> GetPaymentByHeaderId(Guid headerId);
    }
}